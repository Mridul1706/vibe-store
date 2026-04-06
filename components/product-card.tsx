"use client"

import Image from "next/image"
import { Product } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { toast } from "sonner"

interface ProductCardProps {
  product: Product
  onViewDetails: (product: Product) => void
}

export function ProductCard({ product, onViewDetails }: ProductCardProps) {
  const { addItem } = useCart()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!product.inStock) return
    addItem(product, 1)
    toast.success(`${product.name} added to cart`)
  }

  return (
    <div
      className="group cursor-pointer rounded-xl border border-border bg-card transition-all hover:shadow-lg hover:border-primary/20"
      onClick={() => onViewDetails(product)}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <span className="rounded-full bg-muted px-3 py-1 text-sm font-medium text-muted-foreground">
              Out of Stock
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-medium text-foreground line-clamp-1 text-balance">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-lg font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button
            size="sm"
            variant={product.inStock ? "default" : "secondary"}
            disabled={!product.inStock}
            onClick={handleAddToCart}
            className="gap-1.5"
          >
            <ShoppingCart className="h-4 w-4" />
            Add
          </Button>
        </div>
      </div>
    </div>
  )
}
