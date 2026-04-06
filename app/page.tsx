"use client"

import { useState } from "react"
import { categories, getProductsByCategory } from "@/lib/data"
import { Product } from "@/lib/types"
import { CategorySection } from "@/components/category-section"
import { ProductModal } from "@/components/product-modal"

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-accent/10 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl text-balance">
              Curated for your
              <span className="block text-primary">lifestyle</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground text-pretty">
              Discover premium products across electronics, fashion, home decor, and accessories. 
              Quality meets style in every item.
            </p>
          </div>
        </div>
        {/* Decorative element */}
        <div className="absolute -bottom-24 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      </section>

      {/* Categories */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="flex flex-col gap-16">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              category={category}
              products={getProductsByCategory(category.slug)}
              onViewProduct={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal
        product={selectedProduct}
        open={!!selectedProduct}
        onOpenChange={(open) => !open && setSelectedProduct(null)}
      />
    </div>
  )
}
