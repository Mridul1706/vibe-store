import { Product, Category } from "./types"

export const categories: Category[] = [
  {
    id: "1",
    name: "Electronics",
    slug: "electronics",
    description: "Latest gadgets and tech essentials",
  },
  {
    id: "2",
    name: "Clothing",
    slug: "clothing",
    description: "Trendy fashion for everyone",
  },
  {
    id: "3",
    name: "Home & Living",
    slug: "home-living",
    description: "Beautiful items for your space",
  },
  {
    id: "4",
    name: "Accessories",
    slug: "accessories",
    description: "Complete your look",
  },
]

export const products: Product[] = [
  // Electronics
  {
    id: "e1",
    name: "Wireless Earbuds Pro",
    description: "Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear audio quality. Perfect for music lovers and professionals.",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    category: "electronics",
    inStock: true,
  },
  {
    id: "e2",
    name: "Smart Watch Series X",
    description: "Advanced smartwatch with health monitoring, GPS, and seamless smartphone integration. Water-resistant and stylish design.",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    category: "electronics",
    inStock: true,
  },
  {
    id: "e3",
    name: "Portable Bluetooth Speaker",
    description: "Compact speaker with powerful bass and 360-degree sound. Waterproof and perfect for outdoor adventures.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    category: "electronics",
    inStock: true,
  },
  {
    id: "e4",
    name: "Wireless Charging Pad",
    description: "Fast wireless charging pad compatible with all Qi-enabled devices. Sleek minimalist design.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1586816879360-004f5b0c51e3?w=400&h=400&fit=crop",
    category: "electronics",
    inStock: false,
  },
  // Clothing
  {
    id: "c1",
    name: "Classic Denim Jacket",
    description: "Timeless denim jacket with modern fit. Versatile piece that pairs perfectly with any outfit.",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400&h=400&fit=crop",
    category: "clothing",
    inStock: true,
  },
  {
    id: "c2",
    name: "Organic Cotton T-Shirt",
    description: "Soft, sustainable t-shirt made from 100% organic cotton. Available in multiple colors.",
    price: 34.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    category: "clothing",
    inStock: true,
  },
  {
    id: "c3",
    name: "Slim Fit Chinos",
    description: "Comfortable stretch chinos with a modern slim fit. Perfect for casual or smart-casual occasions.",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=400&h=400&fit=crop",
    category: "clothing",
    inStock: true,
  },
  {
    id: "c4",
    name: "Wool Blend Sweater",
    description: "Luxurious wool blend sweater for cozy comfort. Lightweight yet warm.",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
    category: "clothing",
    inStock: true,
  },
  // Home & Living
  {
    id: "h1",
    name: "Ceramic Plant Pot Set",
    description: "Set of 3 minimalist ceramic pots in varying sizes. Perfect for succulents and small plants.",
    price: 44.99,
    image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=400&h=400&fit=crop",
    category: "home-living",
    inStock: true,
  },
  {
    id: "h2",
    name: "Scented Soy Candle",
    description: "Hand-poured soy candle with notes of lavender and vanilla. Burns for up to 50 hours.",
    price: 28.99,
    image: "https://images.unsplash.com/photo-1602028915047-37269d1a73f7?w=400&h=400&fit=crop",
    category: "home-living",
    inStock: true,
  },
  {
    id: "h3",
    name: "Linen Throw Blanket",
    description: "Soft linen throw blanket in a neutral tone. Adds texture and comfort to any room.",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    category: "home-living",
    inStock: true,
  },
  {
    id: "h4",
    name: "Minimalist Wall Clock",
    description: "Silent sweep wall clock with clean Scandinavian design. Battery operated.",
    price: 54.99,
    image: "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400&h=400&fit=crop",
    category: "home-living",
    inStock: false,
  },
  // Accessories
  {
    id: "a1",
    name: "Leather Wallet",
    description: "Genuine leather bifold wallet with RFID protection. Holds up to 8 cards plus cash.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop",
    category: "accessories",
    inStock: true,
  },
  {
    id: "a2",
    name: "Polarized Sunglasses",
    description: "UV400 polarized sunglasses with lightweight titanium frame. Classic aviator style.",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    category: "accessories",
    inStock: true,
  },
  {
    id: "a3",
    name: "Canvas Tote Bag",
    description: "Durable canvas tote with reinforced handles. Spacious interior with inner pocket.",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?w=400&h=400&fit=crop",
    category: "accessories",
    inStock: true,
  },
  {
    id: "a4",
    name: "Minimalist Watch",
    description: "Elegant analog watch with genuine leather strap. Japanese quartz movement.",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=400&h=400&fit=crop",
    category: "accessories",
    inStock: true,
  },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug)
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug)
}
