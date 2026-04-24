import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/theme-provider'
import { CartProvider } from '@/lib/cart-context'
import { AuthProvider } from '@/lib/auth-context'
import { Header } from '@/components/header'
import { WhatsAppSupport } from '@/components/whatsapp-support'
import { Toaster } from 'sonner'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'VIBE Store | Modern Ecommerce',
  description: 'Discover curated products across electronics, fashion, home & accessories',
  generator: 'v0.app',
  openGraph: {
    title: 'VIBE Store | Modern Ecommerce',
    description: 'Discover curated products across electronics, fashion, home & accessories',
    type: 'website',
    siteName: 'VIBE Store',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'VIBE Store | Modern Ecommerce',
    description: 'Discover curated products across electronics, fashion, home & accessories',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased min-h-screen bg-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <CartProvider>
              <Header />
              <main>{children}</main>
              <WhatsAppSupport />
              <Toaster position="bottom-right" />
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
