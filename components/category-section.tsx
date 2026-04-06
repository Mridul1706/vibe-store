"use client"

import { Category, Product } from "@/lib/types"
import { ProductCard } from "./product-card"

interface CategorySectionProps {
  category: Category
  products: Product[]
  onViewProduct: (product: Product) => void
}

export function CategorySection({ category, products, onViewProduct }: CategorySectionProps) {
  if (products.length === 0) return null

  return (
    <section id={category.slug} className="scroll-mt-20">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">{category.name}</h2>
        <p className="mt-1 text-muted-foreground">{category.description}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={onViewProduct}
          />
        ))}
      </div>
    </section>
  )
}
