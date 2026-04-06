"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, totalPrice, clearCart, totalItems } = useCart()
  const { user, addOrder } = useAuth()
  const [isOrdering, setIsOrdering] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderId, setOrderId] = useState("")
  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zip: "",
  })

  const shipping = totalPrice > 100 ? 0 : 9.99
  const tax = totalPrice * 0.08
  const grandTotal = totalPrice + shipping + tax

  const handlePlaceOrder = async () => {
    setIsOrdering(true)
    // Simulate order processing
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // Save order if user is logged in
    if (user) {
      const newOrder = addOrder({
        items: [...items],
        totalPrice,
        shipping,
        tax,
        grandTotal,
        shippingInfo,
      })
      setOrderId(newOrder.id)
    } else {
      const newOrderId = `ORD-${Date.now().toString(36).toUpperCase()}`
      setOrderId(newOrderId)
    }
    
    setOrderPlaced(true)
    clearCart()
    setIsOrdering(false)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/20">
            <CheckCircle2 className="h-10 w-10 text-accent" />
          </div>
          <h1 className="text-3xl font-bold text-foreground">Order Placed!</h1>
          <p className="mt-4 text-muted-foreground">
            Thank you for your order. Your order number is{" "}
            <span className="font-semibold text-foreground">{orderId}</span>
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            You will receive a confirmation email shortly.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" onClick={() => router.push("/")}>
              Continue Shopping
            </Button>
            {user && (
              <Button variant="outline" size="lg" onClick={() => router.push("/orders")}>
                View My Orders
              </Button>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-foreground">Your cart is empty</h1>
          <p className="mt-4 text-muted-foreground">
            Add some items to your cart to proceed with checkout.
          </p>
          <Link href="/">
            <Button className="mt-6" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Continue Shopping
      </Link>

      <h1 className="text-3xl font-bold text-foreground">Checkout</h1>

      <div className="mt-8 grid gap-8 lg:grid-cols-3">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Cart Items ({totalItems})
            </h2>
            <Separator className="my-4" />

            <div className="flex flex-col gap-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-lg border border-border p-4"
                >
                  <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          ${item.product.price.toFixed(2)} each
                        </p>
                      </div>
                      <p className="font-semibold text-foreground">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-10 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-destructive"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Shipping Info (Fake) */}
          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Shipping Information
            </h2>
            <Separator className="my-4" />
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input 
                  id="firstName" 
                  placeholder="John" 
                  value={shippingInfo.firstName}
                  onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input 
                  id="lastName" 
                  placeholder="Doe" 
                  value={shippingInfo.lastName}
                  onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="john@example.com" 
                  value={shippingInfo.email}
                  onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                />
              </div>
              <div className="sm:col-span-2 space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input 
                  id="address" 
                  placeholder="123 Main Street" 
                  value={shippingInfo.address}
                  onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input 
                  id="city" 
                  placeholder="New York" 
                  value={shippingInfo.city}
                  onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="zip">ZIP Code</Label>
                <Input 
                  id="zip" 
                  placeholder="10001" 
                  value={shippingInfo.zip}
                  onChange={(e) => setShippingInfo({...shippingInfo, zip: e.target.value})}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-6">
            <h2 className="text-lg font-semibold text-foreground">
              Order Summary
            </h2>
            <Separator className="my-4" />

            <div className="flex flex-col gap-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium text-foreground">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-medium text-foreground">
                  {shipping === 0 ? (
                    <span className="text-accent">Free</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium text-foreground">
                  ${tax.toFixed(2)}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="text-lg font-semibold text-foreground">Total</span>
                <span className="text-lg font-bold text-primary">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>

            {shipping === 0 && (
              <p className="mt-4 text-xs text-accent text-center">
                You qualify for free shipping!
              </p>
            )}

            <Button
              className="mt-6 w-full"
              size="lg"
              onClick={handlePlaceOrder}
              disabled={isOrdering}
            >
              {isOrdering ? "Processing..." : "Place Order"}
            </Button>

            <p className="mt-4 text-xs text-center text-muted-foreground">
              This is a demo checkout. No real payment will be processed.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
