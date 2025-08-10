"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, MapPin, Home as HomeIcon, Building, Warehouse, TreePine, Phone, Mail, Globe, Star, Users, Award, TrendingUp, Bed, Bath } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Header from "@/components/Header"
import { mockProperties } from "@/components/apartamentos"
import { PropertyCard } from "@/components/PropertyCard"

// i18n básico
const DICT = {
  pt: {
    title: "Encontre o seu imóvel ideal em Portugal",
    subtitle: "Descubra as melhores oportunidades imobiliárias em todo o país",
    searchPlaceholder: "Procure por cidade ou região…",
    propertyType: "Tipo de imóvel",
    priceRange: "Faixa de preço",
    searchButton: "Procurar imóveis",
    featuredProperties: "Imóveis em destaque",
    newProperty: "NOVO",
    featured: "DESTAQUE",
    bedrooms: "quartos",
    bathrooms: "casas de banho",
    viewDetails: "Ver detalhes",
    whatsappContact: "Contactar via WhatsApp",
    aboutUs: "Sobre nós",
    contact: "Contacto",
    properties: "Imóveis",
    apartment: "Apartamento",
    house: "Moradia",
    commercial: "Comercial",
    land: "Terreno",
    allTypes: "Todos os tipos",
    upTo: "Até",
    above: "Acima de",
    phone: "Telefone",
    email: "E-mail",
    address: "Morada",
    statsTitle: "Números que falam por si",
    statsSubtitle: "A confiança dos nossos clientes é o nosso maior orgulho",
    whyTitle: "Por que escolher a Imobiliária Dionísio?",
    whySubtitle: "Somos mais do que uma imobiliária; somos o seu parceiro de confiança",
    contactCta: "Pronto para encontrar o seu imóvel ideal?",
    contactCtaSub: "Fale connosco e deixe-nos ajudá-lo a encontrar a propriedade perfeita em Portugal.",
    start: "Começar",
    learnMore: "Saber mais",
    home: "Início",
  },
  en: {
    title: "Find your ideal property in Portugal",
    subtitle: "Discover the best real estate opportunities across the country",
    searchPlaceholder: "Search by city or region…",
    propertyType: "Property type",
    priceRange: "Price range",
    searchButton: "Search properties",
    featuredProperties: "Featured properties",
    newProperty: "NEW",
    featured: "FEATURED",
    bedrooms: "bedrooms",
    bathrooms: "bathrooms",
    viewDetails: "View details",
    whatsappContact: "Contact via WhatsApp",
    aboutUs: "About us",
    contact: "Contact",
    properties: "Properties",
    apartment: "Apartment",
    house: "House",
    commercial: "Commercial",
    land: "Land",
    allTypes: "All types",
    upTo: "Up to",
    above: "Above",
    phone: "Phone",
    email: "Email",
    address: "Address",
    statsTitle: "Numbers that speak for themselves",
    statsSubtitle: "Our clients' trust is our greatest pride",
    whyTitle: "Why choose Dionísio Real Estate?",
    whySubtitle: "More than an agency; we are your trusted partner",
    contactCta: "Ready to find your ideal property?",
    contactCtaSub: "Contact us and let’s help you find the perfect property in Portugal.",
    start: "Get started",
    learnMore: "Learn more",
    home: "Home",
  },
} as const

type Lang = keyof typeof DICT



const stats = [
  { icon: <HomeIcon className="w-8 h-8 text-gray-600" />, number: "500+", label: { pt: "Imóveis vendidos", en: "Properties sold" } },
  { icon: <Users className="w-8 h-8 text-gray-600" />, number: "1000+", label: { pt: "Clientes satisfeitos", en: "Happy clients" } },
  { icon: <Award className="w-8 h-8 text-gray-600" />, number: "15", label: { pt: "Anos de experiência", en: "Years of experience" } },
  { icon: <TrendingUp className="w-8 h-8 text-gray-600" />, number: "98%", label: { pt: "Taxa de sucesso", en: "Success rate" } },
]

export default function HomePage() {
  const [language, setLanguage] = useState<Lang>('pt')
  const [searchQuery, setSearchQuery] = useState('')
  const [propertyType, setPropertyType] = useState('all')
  const [priceRange, setPriceRange] = useState('all')
  const router = useRouter()
  const t = DICT[language]

  const formatPrice = (price: number) => new Intl.NumberFormat(language === 'pt' ? 'pt-PT' : 'en-GB', {
    style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(price)

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case 'apartment': return <Building className="w-5 h-5" />
      case 'house': return <HomeIcon className="w-5 h-5" />
      case 'commercial': return <Warehouse className="w-5 h-5" />
      case 'land': return <TreePine className="w-5 h-5" />
      default: return <HomeIcon className="w-5 h-5" />
    }
  }



  const statsLocalized = useMemo(() => stats.map((s) => ({ ...s, label: s.label[language] })), [language])

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Hero */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] grid place-items-center overflow-hidden">
        <Image
          src="/hero-real-estate-background.png"
          alt="Skyline de cidades portuguesas"
          fill
          priority
          className="object-cover z-0" // <- sem negativo
          sizes="(max-width: 768px) 100vw, 1920px"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />

        <div className="relative z-20 w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-white font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">{t.title}</h1>
          <p className="mt-4 md:mt-6 text-gray-200 text-lg sm:text-xl md:text-2xl mx-auto max-w-4xl">{t.subtitle}</p>
        </div>
      </section>

      {/* --- substitua a sua seção por esta --- */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">
              {t.featuredProperties}
            </h2>
            <div className="w-24 md:w-32 h-1 bg-gradient-to-r from-gray-800 to-gray-600 mx-auto mb-4 md:mb-6" />
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Temos Apartamentos disponíveis para arrendar, com as condições de uma renda e uma caução.
              Mobiliado e não mobiliado, com as despesas mensais incluídas: Água, Luz, Gás e Internet.
              Aceitamos casal com crianças e animais de estimação.
            </p>
          </div>

          <div
            className="
    grid justify-center
    gap-6 md:gap-8
    [grid-template-columns:repeat(auto-fit,minmax(260px,320px))]
  "
          >
            {mockProperties.map((property, index) => (
              <PropertyCard
                key={property.id}
                property={property}
                index={index}
                t={t}
                formatPrice={formatPrice}
                getPropertyTypeIcon={getPropertyTypeIcon}
              />
            ))}
          </div>

        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-gradient-to-br from-gray-50 to-gray-100 py-16 md:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 md:mb-6">{t.whyTitle}</h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t.whySubtitle}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[{ icon: Star, title: { pt: "Excelência no atendimento", en: "Excellent service" }, desc: { pt: "Cada cliente recebe atenção personalizada para encontrar o imóvel perfeito.", en: "Every client receives personalized attention to find the perfect property." } },
            { icon: Award, title: { pt: "5 anos de experiência", en: "15 years of experience" }, desc: { pt: "Conhecimento profundo do mercado imobiliário português.", en: "Deep knowledge of the Portuguese real estate market." } },
            { icon: TrendingUp, title: { pt: "Resultados garantidos", en: "Proven results" }, desc: { pt: "98% de taxa de sucesso nas transações.", en: "98% success rate in transactions." } }].map((f, i) => (
              <Card key={i} className="border-0 bg-white p-8 text-center shadow-lg transition hover:shadow-xl">
                <CardContent className="p-0">
                  <div className="mb-6 grid place-items-center">
                    <div className="grid size-20 place-items-center rounded-full bg-gray-100">
                      <f.icon className="size-10 text-gray-600" />
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">{f.title[language]}</h3>
                  <p className="leading-relaxed text-gray-600">{f.desc[language]}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-gray-900 py-16 md:py-20 px-4 sm:px-6 lg:px-8 text-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-2">
            <div>
              <h2 className="mb-4 text-3xl md:text-5xl font-bold">{t.contactCta}</h2>
              <p className="mb-8 text-lg md:text-xl text-gray-300">{t.contactCtaSub}</p>
              <div className="flex flex-col gap-3 text-lg">
                <div className="flex items-center"><Phone className="mr-3 size-6 text-gray-400" /><span>+244930145818</span></div>
                <div className="flex items-center"><MapPin className="mr-3 size-6 text-gray-400" /><span>Lisboa, Portugal</span></div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="flex-1 py-4 text-lg font-semibold shadow-xl bg-green-600 hover:bg-green-700" onClick={() => window.open('https://wa.me/244930145818', '_blank')}>
                <Phone className="mr-3 size-6" /> WhatsApp
              </Button>
              <Link href="/contacto" className="flex-1">

              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="mb-6 flex items-center gap-3">
                <div className="grid size-10 place-items-center rounded-lg bg-gradient-to-br from-gray-600 to-gray-800"><HomeIcon className="size-6 text-white" /></div>
                <div className="text-xl font-bold">Imobiliária <span className="text-gray-400">Dionísio</span></div>
              </div>
              <p className="text-gray-400">A sua imobiliária de confiança para encontrar o imóvel perfeito em Portugal.</p>
            </div>
            <div>
              <h3 className="mb-6 text-lg font-semibold">{t.properties}</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/imoveis?type=apartment" className="transition-colors hover:text-white">{t.apartment}s</Link></li>
                <li><Link href="/imoveis?type=house" className="transition-colors hover:text-white">{t.house}s</Link></li>
                <li><Link href="/imoveis?type=commercial" className="transition-colors hover:text-white">{t.commercial}s</Link></li>
                <li><Link href="/imoveis?type=land" className="transition-colors hover:text-white">{t.land}s</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-lg font-semibold">Empresa</h3>
              <ul className="space-y-3 text-gray-400">
                <li><Link href="/contacto" className="transition-colors hover:text-white">{t.contact}</Link></li>
                <li><Link href="/privacidade" className="transition-colors hover:text-white">Privacidade</Link></li>
                <li><Link href="/termos" className="transition-colors hover:text-white">Termos</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="mb-6 text-lg font-semibold">{t.contact}</h3>
              <ul className="space-y-3 text-gray-400">
                <li>+244930145818</li>
                <li>Portugal</li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-700 pt-8 text-center text-gray-400">© 2024 Imobiliária Dionísio. Todos os direitos reservados.</div>
        </div>
      </footer>
    </div>
  )
}
