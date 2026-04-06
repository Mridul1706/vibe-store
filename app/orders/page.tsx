"use client"

import { useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Package, ShoppingBag, Clock, Truck, CheckCircle } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"

const statusConfig = {
  pending: {
    label: "Pending",
    icon: Clock,
    variant: "secondary" as const,
  },
  processing: {
    label: "Processing",
    icon: Package,
    variant: "default" as const,
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    variant: "default" as const,
  },
  delivered: {
    label: "Delivered",
    icon: CheckCircle,
    variant: "default" as const,
  },
}

export default function OrdersPage() {
  const router = useRouter()
  const { user, isLoading, orders } = useAuth()

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/auth/login")
    }
  }, [user, isLoading, router])

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex min-h-[80vh] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  // Don't render if not authenticated
  if (!user) {
    return null
  }

  if (orders.length === 0) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Store
        </Link>

        <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <ShoppingBag className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">No orders yet</h1>
          <p className="mt-4 text-muted-foreground">
            Once you place an order, it will appear here.
          </p>
          <Link href="/">
            <Button className="mt-6" size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Store
      </Link>

      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">My Orders</h1>
        <span className="text-sm text-muted-foreground">
          {orders.length} order{orders.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        {orders.map((order) => {
          const status = statusConfig[order.status]
          const StatusIcon = status.icon
          const orderDate = new Date(order.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })

          return (
            <div
              key={order.id}
              className="rounded-xl border border-border bg-card overflow-hidden"
            >
              {/* Order Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border bg-muted/30 px-6 py-4">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{order.id}</span>
                    <Badge variant={status.variant} className="gap-1">
                      <StatusIcon className="h-3 w-3" />
                      {status.label}
                    </Badge>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Placed on {orderDate}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-primary">
                    ${order.grandTotal.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)} items
                  </p>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-6">
                <div className="flex flex-col gap-4">
                  {order.items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-muted">
                        <Image
                          src={item.product.image}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center">
                        <h3 className="font-medium text-foreground">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Qty: {item.quantity} x ${item.product.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="font-medium text-foreground">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                {/* Order Summary */}
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="text-foreground">${order.totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="text-foreground">
                      {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span className="text-foreground">${order.tax.toFixed(2)}</span>
                  </div>
                </div>

                {/* Shipping Info */}
                {order.shippingInfo && (
                  <>
                    <Separator className="my-4" />
                    <div className="text-sm">
                      <p className="font-medium text-foreground mb-2">Shipping Address</p>
                      <p className="text-muted-foreground">
                        {order.shippingInfo.firstName} {order.shippingInfo.lastName}
                      </p>
                      {order.shippingInfo.address && (
                        <p className="text-muted-foreground">{order.shippingInfo.address}</p>
                      )}
                      {(order.shippingInfo.city || order.shippingInfo.zip) && (
                        <p className="text-muted-foreground">
                          {order.shippingInfo.city}{order.shippingInfo.city && order.shippingInfo.zip ? ", " : ""}{order.shippingInfo.zip}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
