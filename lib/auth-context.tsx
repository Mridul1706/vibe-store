"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { createClient } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"
import { Order, CartItem, AppUser } from "./types"
import { CART_STORAGE_KEY, ORDERS_STORAGE_KEY } from "./constants"
import { 
  getCurrentUser, 
  createUser, 
  verifyCredentials, 
  setSession, 
  clearSession,
  LocalUser 
} from "./local-db"

interface AuthContextType {
  user: AppUser | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error: string | null }>
  signUp: (email: string, password: string) => Promise<{ error: string | null }>
  signOut: () => Promise<void>
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "createdAt" | "status">) => Order
  isSupabaseConfigured: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Helper to convert LocalUser to AppUser
function toAppUser(localUser: LocalUser): AppUser {
  return {
    id: localUser.id,
    email: localUser.email,
    createdAt: localUser.createdAt,
    name: localUser.name,
  }
}

// Helper to convert Supabase User to AppUser
function supabaseToAppUser(supabaseUser: User): AppUser {
  return {
    id: supabaseUser.id,
    email: supabaseUser.email || "",
    createdAt: supabaseUser.created_at,
    name: supabaseUser.user_metadata?.name,
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [orders, setOrders] = useState<Order[]>([])
  const [supabaseConfigured, setSupabaseConfigured] = useState(false)

  useEffect(() => {
    const url = process.env.NEXT_PUBLIC_SUPABASE_URL
    const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    setSupabaseConfigured(!!url && !!key)
  }, [])

  // Load orders from localStorage (filtered by user)
  useEffect(() => {
    if (!user) {
      setOrders([])
      return
    }
    
    const stored = localStorage.getItem(`${ORDERS_STORAGE_KEY}-${user.id}`)
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setOrders(parsed)
      } catch (error) {
        console.error("Failed to load orders from localStorage:", error)
        localStorage.removeItem(`${ORDERS_STORAGE_KEY}-${user.id}`)
      }
    }
  }, [user])

  // Save orders to localStorage
  useEffect(() => {
    if (user && orders.length > 0) {
      try {
        localStorage.setItem(`${ORDERS_STORAGE_KEY}-${user.id}`, JSON.stringify(orders))
      } catch (error) {
        console.error("Failed to save orders to localStorage:", error)
      }
    }
  }, [orders, user])

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      if (supabaseConfigured) {
        // Use Supabase auth
        const supabase = createClient()
        try {
          const { data: { user: supabaseUser } } = await supabase.auth.getUser()
          if (supabaseUser) {
            setUser(supabaseToAppUser(supabaseUser))
          }
        } catch (error) {
          console.error("Error getting Supabase user:", error)
        }

        // Listen for Supabase auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange(
          async (event, session) => {
            if (session?.user) {
              setUser(supabaseToAppUser(session.user))
            } else {
              setUser(null)
            }
            setIsLoading(false)
          }
        )

        setIsLoading(false)
        return () => {
          subscription.unsubscribe()
        }
      } else {
        // Use local auth
        const localUser = getCurrentUser()
        if (localUser) {
          setUser(toAppUser(localUser))
        }
        setIsLoading(false)
      }
    }

    initAuth()
  }, [supabaseConfigured])

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (supabaseConfigured) {
      const supabase = createClient()
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        return { error: error.message }
      }
      return { error: null }
    } else {
      // Local auth
      const { user: localUser, error } = await verifyCredentials(email, password)
      if (error || !localUser) {
        return { error: error || "Login failed" }
      }
      setSession(localUser.id)
      setUser(toAppUser(localUser))
      return { error: null }
    }
  }

  const signUp = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (supabaseConfigured) {
      const supabase = createClient()
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo:
            process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
            `${typeof window !== "undefined" ? window.location.origin : ""}/`,
        },
      })
      if (error) {
        return { error: error.message }
      }
      return { error: null }
    } else {
      // Local auth
      const { user: localUser, error } = await createUser(email, password)
      if (error || !localUser) {
        return { error: error || "Sign up failed" }
      }
      setSession(localUser.id)
      setUser(toAppUser(localUser))
      return { error: null }
    }
  }

  const signOut = async () => {
    if (supabaseConfigured) {
      const supabase = createClient()
      await supabase.auth.signOut()
    }
    clearSession()
    localStorage.removeItem(CART_STORAGE_KEY)
    setUser(null)
    setOrders([])
  }

  const addOrder = (orderData: Omit<Order, "id" | "createdAt" | "status">): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${Date.now().toString(36).toUpperCase()}`,
      status: "processing",
      createdAt: new Date().toISOString(),
    }
    setOrders((prev) => [newOrder, ...prev])
    return newOrder
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        signIn,
        signUp,
        signOut,
        orders,
        addOrder,
        isSupabaseConfigured: supabaseConfigured,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
