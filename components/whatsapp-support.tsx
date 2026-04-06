"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const PHONE_NUMBER = "916353832647"
const DEFAULT_MESSAGE = "Hi! I need help with my order on VIBE Store. Can you assist me?"

export function WhatsAppSupport() {
  const handleClick = () => {
    const encodedMessage = encodeURIComponent(DEFAULT_MESSAGE)
    const whatsappUrl = `https://wa.me/${PHONE_NUMBER}?text=${encodedMessage}`
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }

  return (
    <Button
      onClick={handleClick}
      size="lg"
      className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] text-white shadow-lg hover:shadow-xl transition-all duration-200 p-0"
      aria-label="Contact support on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}
