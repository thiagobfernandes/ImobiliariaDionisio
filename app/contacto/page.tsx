"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
  ArrowLeft,
  Home as HomeIcon,
  Phone,
  Clock,
  MessageCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/Header"

// ===== i18n =====
const DICT = {
  pt: {
    back: "Voltar",
    brand: "Imobiliária Dionísio",
    nav: { home: "Início", properties: "Imóveis", about: "Sobre", contact: "Contacto" },
    whatsapp: "WhatsApp",
    heroTitle: "Entre em Contacto",
    heroSubtitle:
      "Estamos aqui para ajudá-lo a encontrar o imóvel perfeito. Fale connosco agora mesmo pelo WhatsApp!",
    contactInfoTitle: "Formas de Contacto",
    phone: "Telefone",
    address: "Morada",
    openingHours: "Horário",
    phoneDesc: "Ligue-nos durante o horário de funcionamento",
    addressDesc: "Visite o nosso escritório",
    hoursDesc: "Domingo: Fechado",
    quickWhats: "Contactar via WhatsApp",
    quickCall: "Ligar Agora",
    required: "*",
  },
  en: {
    back: "Back",
    brand: "Dionísio Real Estate",
    nav: { home: "Home", properties: "Properties", about: "About", contact: "Contact" },
    whatsapp: "WhatsApp",
    heroTitle: "Get in Touch",
    heroSubtitle:
      "We’re here to help you find the perfect property. Contact us now via WhatsApp!",
    contactInfoTitle: "Ways to Contact",
    phone: "Phone",
    address: "Address",
    openingHours: "Opening Hours",
    phoneDesc: "Call us during business hours",
    addressDesc: "Visit our office",
    hoursDesc: "Sunday: Closed",
    quickWhats: "Contact via WhatsApp",
    quickCall: "Call Now",
    required: "*",
  },
} as const

type Lang = keyof typeof DICT

// ===== utils =====
function getWhatsNumber() {
  return (process.env.NEXT_PUBLIC_WHATS_NUMBER || "244930145818").replace(/[^\d]/g, "")
}
function buildWhatsUrl(msg: string) {
  return `https://wa.me/${getWhatsNumber()}?text=${encodeURIComponent(msg)}`
}
function buildTelHref() {
  return `tel:+${getWhatsNumber()}`
}

export default function ContactPage() {
  const router = useRouter()
  const [language, setLanguage] = useState<Lang>("pt")
  const t = DICT[language]

  const contactInfo = useMemo(
    () => [
      {
        icon: <Phone className="w-6 h-6" />,
        title: t.phone,
        details: ["+244930145818"],
        description: t.phoneDesc,
      },
      {
        icon: <Clock className="w-6 h-6" />,
        title: t.openingHours,
        details:
          language === "pt"
            ? ["Segunda a Sexta: 9h - 19h", "Sábado: 9h - 17h"]
            : ["Mon–Fri: 9am – 7pm", "Sat: 9am – 5pm"],
        description: t.hoursDesc,
      },
    ],
    [t, language]
  )

  const handleWhatsApp = () => {
    const msg =
      language === "pt"
        ? "Olá! Gostaria de mais informações."
        : "Hello! I’d like more information."
    window.open(buildWhatsUrl(msg), "_blank")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-gray-700 text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">{t.heroTitle}</h1>
          <p className="text-xl text-gray-300">{t.heroSubtitle}</p>
          <Button
            size="lg"
            className="mt-8 bg-green-600 hover:bg-green-700 text-white"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            {t.quickWhats}
          </Button>
        </div>
      </section>

      {/* Contact Info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">{t.contactInfoTitle}</h2>
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <CardContent className="p-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-gray-100 rounded-full p-3 flex-shrink-0">{info.icon}</div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">{info.title}</h3>
                    {info.details.map((d, idx) => (
                      <p key={idx} className="text-gray-700 font-medium">{d}</p>
                    ))}
                    <p className="text-gray-600 text-sm mt-1">{info.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* More CTAs */}
        <div className="mt-10 space-y-4">
          <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={handleWhatsApp}>
            <MessageCircle className="w-5 h-5 mr-2" />
            {t.quickWhats}
          </Button>

        </div>
      </div>
    </div>
  )
}
