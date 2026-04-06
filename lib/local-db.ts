"use client"

import bcrypt from "bcryptjs"

export interface LocalUser {
  id: string
  email: string
  passwordHash: string
  createdAt: string
  name?: string
}

const USERS_STORAGE_KEY = "ecommerce-users"
const SESSION_STORAGE_KEY = "ecommerce-session"

// Get all users from localStorage
export function getUsers(): LocalUser[] {
  if (typeof window === "undefined") return []
  
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  if (!stored) return []
  
  try {
    return JSON.parse(stored)
  } catch {
    return []
  }
}

// Save users to localStorage
function saveUsers(users: LocalUser[]): void {
  localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users))
}

// Find user by email
export function findUserByEmail(email: string): LocalUser | null {
  const users = getUsers()
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null
}

// Find user by ID
export function findUserById(id: string): LocalUser | null {
  const users = getUsers()
  return users.find((u) => u.id === id) || null
}

// Create a new user
export async function createUser(email: string, password: string, name?: string): Promise<{ user: LocalUser | null; error: string | null }> {
  // Check if user already exists
  if (findUserByEmail(email)) {
    return { user: null, error: "A user with this email already exists" }
  }

  // Validate password
  if (password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters" }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 10)

  const newUser: LocalUser = {
    id: `user_${Date.now().toString(36)}_${Math.random().toString(36).substr(2, 9)}`,
    email: email.toLowerCase(),
    passwordHash,
    createdAt: new Date().toISOString(),
    name,
  }

  const users = getUsers()
  users.push(newUser)
  saveUsers(users)

  return { user: newUser, error: null }
}

// Verify user credentials
export async function verifyCredentials(email: string, password: string): Promise<{ user: LocalUser | null; error: string | null }> {
  const user = findUserByEmail(email)
  
  if (!user) {
    return { user: null, error: "Invalid email or password" }
  }

  const isValid = await bcrypt.compare(password, user.passwordHash)
  
  if (!isValid) {
    return { user: null, error: "Invalid email or password" }
  }

  return { user, error: null }
}

// Session management
export function setSession(userId: string): void {
  localStorage.setItem(SESSION_STORAGE_KEY, userId)
}

export function getSession(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem(SESSION_STORAGE_KEY)
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY)
}

// Get current logged-in user
export function getCurrentUser(): LocalUser | null {
  const sessionUserId = getSession()
  if (!sessionUserId) return null
  return findUserById(sessionUserId)
}
