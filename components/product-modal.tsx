"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, ShoppingCart } from "lucide-react"
import { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { toast } from "sonner"

interface ProductModalProps {
  product: Product | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ProductModal({ product, open, onOpenChange }: ProductModalProps) {
  const [quantity, setQuantity] = useState(1)
  const { addItem } = useCart()

  if (!product) return null

  const handleAddToCart = () => {
    if (!product.inStock) return
    addItem(product, quantity)
    toast.success(`${quantity} x ${product.name} added to cart`)
    setQuantity(1)
    onOpenChange(false)
  }

  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity(quantity - 1)
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl overflow-hidden p-0">
        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
            />
            {!product.inStock && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80">
                <span className="rounded-full bg-muted px-4 py-2 text-sm font-medium text-muted-foreground">
                  Out of Stock
                </span>
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col p-6">
            <DialogHeader className="text-left">
              <DialogTitle className="text-2xl font-bold text-balance">
                {product.name}
              </DialogTitle>
            </DialogHeader>

            <div className="mt-4 flex-1">
              <p className="text-3xl font-bold text-primary">
                ${product.price.toFixed(2)}
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                {product.description}
              </p>

              <div className="mt-6 flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">Category:</span>
                <span className="rounded-full bg-secondary px-3 py-1 text-sm text-secondary-foreground capitalize">
                  {product.category.replace("-", " & ")}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Quantity:</span>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center text-lg font-semibold">
                  {quantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={increaseQuantity}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="mt-6 w-full gap-2"
              size="lg"
              disabled={!product.inStock}
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-5 w-5" />
              {product.inStock ? `Add to Cart - $${(product.price * quantity).toFixed(2)}` : "Out of Stock"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
