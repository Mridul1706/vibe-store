export interface Product {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  inStock: boolean
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
}

export interface AppUser {
  id: string
  email: string
  createdAt: string
  name?: string
}

export interface Order {
  id: string
  items: CartItem[]
  totalPrice: number
  shipping: number
  tax: number
  grandTotal: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
  shippingInfo?: {
    firstName: string
    lastName: string
    email: string
    address: string
    city: string
    zip: string
  }
}
