"use client"

import { JSX, useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Home as HomeIcon,
  Building,
  Warehouse,
  TreePine,
  Share2,
  Heart,
  Phone,
  ChevronLeft,
  ChevronRight,
  X,
  Ruler,
  Bed,
  Bath,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import Header from "@/components/Header"

// ===== i18n =================================================================

const DICT = {
  pt: {
    newProperty: "NOVO",
    featured: "DESTAQUE",
    pricePerM2: "€/m²",
    notFoundTitle: "Imóvel não encontrado",
    backToList: "Voltar aos Imóveis",
    back: "Voltar",
    home: "Início",
    location: "Localização",
    detailsTitle: "Detalhes do Imóvel",
    area: "m²",
    bedrooms: "Quartos",
    bathrooms: "Casas de Banho",
    energyCert: "Cert. Energético",
    techInfo: "Informações Técnicas",
    yearBuilt: "Ano de construção",
    renovationYear: "Ano de renovação",
    floor: "Andar",
    totalFloors: "Total de andares",
    garageSpaces: "Lugares de garagem",
    furnished: "Mobilado",
    expenses: "Despesas de condomínio",
    energyClass: "Classe",
    description: "Descrição",
    mapInteractive: "Mapa interativo",
    coords: "Coordenadas",
    share: "Partilhar",
    favorite: "Favorito",
    whatsapp: "WhatsApp",
    contactCardTitle: "Entre em contacto",
    contactCardCta: "Contactar via WhatsApp",
    summaryTitle: "Resumo do Imóvel",
    price: "Preço",
    priceM2: "Preço por m²",
    floorShort: "Andar",
    apartment: "Apartamento",
    house: "Moradia",
    commercial: "Comercial",
    land: "Terreno",
    viewAllPhotos: "Ver todas as fotos",
  },
  en: {
    newProperty: "NEW",
    featured: "FEATURED",
    pricePerM2: "€/m²",
    notFoundTitle: "Property not found",
    backToList: "Back to Properties",
    back: "Back",
    home: "Home",
    location: "Location",
    detailsTitle: "Property Details",
    area: "sqm",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    energyCert: "Energy Cert.",
    techInfo: "Technical Information",
    yearBuilt: "Year built",
    renovationYear: "Renovation year",
    floor: "Floor",
    totalFloors: "Total floors",
    garageSpaces: "Garage spaces",
    furnished: "Furnished",
    expenses: "Condo fees",
    energyClass: "Class",
    description: "Description",
    mapInteractive: "Interactive map",
    coords: "Coordinates",
    share: "Share",
    favorite: "Favorite",
    whatsapp: "WhatsApp",
    contactCardTitle: "Get in touch",
    contactCardCta: "Contact via WhatsApp",
    summaryTitle: "Property Summary",
    price: "Price",
    priceM2: "Price per sqm",
    floorShort: "Floor",
    apartment: "Apartment",
    house: "House",
    commercial: "Commercial",
    land: "Land",
    viewAllPhotos: "View all photos",
  },
} as const

type Lang = keyof typeof DICT

// ===== Mock e Tipos =========================================================

type PropertyType = "apartment" | "house" | "commercial" | "land"

type PropertyDetails = {
  year_built: number
  renovation_year?: number
  floor: number
  total_floors: number
  energy_certificate: string
  garage_spaces?: number
  furnished: string
  expenses: string
}

type PropertyModel = {
  id: number
  title: string
  price: number
  location: string
  type: PropertyType
  area: number
  images: string[]
  isNew?: boolean
  isFeatured?: boolean
  description: string
  details: PropertyDetails
  coordinates: { lat: number; lng: number }
}

const MOCK: Record<string, PropertyModel> = {
  "1": {
    id: 1,
    title: "Apartamento T0",
    price: 400,
    location: " Portugal",
    type: "apartment",
    area: 85,
    images: [
      "/img0-1.jpeg",
      "/img-0-2.jpeg",
      "/img-0-3.jpeg",
      "/img-0-4.jpeg",
    ],
    isNew: true,
    isFeatured: true,
    description:
      `Magnífico apartamento T2 completamente renovado no coração do Príncipe Real, uma das zonas mais prestigiadas de Lisboa. Este imóvel combina o charme histórico da arquitetura lisboeta com acabamentos modernos de alta qualidade.\n\nO apartamento situa-se num edifício clássico com elevador e encontra-se no 3º andar, oferecendo excelente luminosidade natural e vistas desafogadas sobre a cidade.\n\nA localização é verdadeiramente privilegiada, encontrando-se a poucos metros do Jardim do Príncipe Real, com fácil acesso a transportes públicos, restaurantes de renome, boutiques exclusivas e todos os serviços necessários para o dia a dia.`,
    details: {
      year_built: 1950,
      renovation_year: 2023,
      floor: 3,
      total_floors: 5,
      energy_certificate: "B",
      garage_spaces: 0,
      furnished: "Não mobilado",
      expenses: "€85/mês",
    },
    coordinates: { lat: 38.7139, lng: -9.1439 },
  },
  "2": {
    id: 2,
    title: "Apartamento: T1  ",
    price: 600,
    location: "Portugal",
    type: "apartment",
    area: 150,
    images: [
      "/imh-1-1.jpeg",
      "/img-1-2.jpeg?height=600&width=800&text=Sala+de+Estar",
      "/img-1-3.jpeg?height=600&width=800&text=Cozinha",
      "/img-1-4.jpeg?height=600&width=800&text=Quarto+Principal",
      "/img-1-5.jpeg?height=600&width=800&text=Jardim",
    ],
    isNew: false,
    isFeatured: true,
    description:
      `Encantadora moradia V3 com jardim privativo em Matosinhos, ideal para famílias que procuram qualidade de vida junto ao mar. Esta propriedade oferece o equilíbrio perfeito entre conforto residencial e proximidade à praia.\n\nA moradia distribui-se por dois pisos, com áreas generosas e boa exposição solar. O jardim privativo é perfeito para momentos de lazer em família e possui espaço para estacionamento.\n\nLocalizada numa zona residencial tranquila, mas com fácil acesso ao centro do Porto e às praias de Matosinhos, esta propriedade representa uma excelente oportunidade de investimento.`,
    details: {
      year_built: 1985,
      renovation_year: 2020,
      floor: 0,
      total_floors: 2,
      energy_certificate: "C",
      garage_spaces: 1,
      furnished: "Não mobilado",
      expenses: "N/A",
    },
    coordinates: { lat: 41.1796, lng: -8.6958 },
  },
  "3": {
    id: 3,
    title: "Apartamento: T2  ",
    price: 750,
    location: "Portugal",
    type: "apartment",
    area: 150,
    images: [
      "/img-2-1.jpeg",
      "/img-2-2.jpeg?height=600&width=800&text=Sala+de+Estar",
      "/img-2-3.jpeg?height=600&width=800&text=Cozinha",
      "/img-2-4.jpeg?height=600&width=800&text=Quarto+Principal",
      "/img-2-5.jpeg?height=600&width=800&text=Jardim",
      "/img-2-6.jpeg?height=600&width=800&text=Jardim",
      "/img-2-7.jpeg?height=600&width=800&text=Jardim",
      "/img-2-8.jpeg?height=600&width=800&text=Jardim",
      "/img-2-9.jpeg?height=600&width=800&text=Jardim",
      "/img-2-10.jpeg?height=600&width=800&text=Jardim",
      "/img-2-11.jpeg?height=600&width=800&text=Jardim",
      "/img-2-12.jpeg?height=600&width=800&text=Jardim",
      "/img-2-13.jpeg?height=600&width=800&text=Jardim",
      "/img-2-14.jpeg?height=600&width=800&text=Jardim",

    ],
    isNew: false,
    isFeatured: true,
    description:
      `Encantadora moradia V3 com jardim privativo em Matosinhos, ideal para famílias que procuram qualidade de vida junto ao mar. Esta propriedade oferece o equilíbrio perfeito entre conforto residencial e proximidade à praia.\n\nA moradia distribui-se por dois pisos, com áreas generosas e boa exposição solar. O jardim privativo é perfeito para momentos de lazer em família e possui espaço para estacionamento.\n\nLocalizada numa zona residencial tranquila, mas com fácil acesso ao centro do Porto e às praias de Matosinhos, esta propriedade representa uma excelente oportunidade de investimento.`,
    details: {
      year_built: 1985,
      renovation_year: 2020,
      floor: 0,
      total_floors: 2,
      energy_certificate: "C",
      garage_spaces: 1,
      furnished: "Não mobilado",
      expenses: "N/A",
    },
    coordinates: { lat: 41.1796, lng: -8.6958 },
  }
}

// ===== Helpers ==============================================================

const typeIcon: Record<PropertyType, JSX.Element> = {
  apartment: <Building className="w-5 h-5" />,
  house: <HomeIcon className="w-5 h-5" />,
  commercial: <Warehouse className="w-5 h-5" />,
  land: <TreePine className="w-5 h-5" />,
}

function formatPrice(price: number, lang: Lang) {
  return new Intl.NumberFormat(lang === "pt" ? "pt-PT" : "en-GB", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}


// ===== Page =================================================================

export default function PropertyDetailPage() {
  const params = useParams()
  const router = useRouter()
  const propertyId = String(params.id ?? "")
  const [language, setLanguage] = useState<Lang>("pt")
  const t = DICT[language]

  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isGalleryOpen, setIsGalleryOpen] = useState(false)

  const property = useMemo(() => MOCK[propertyId], [propertyId])
  const pricePerM2 = useMemo(
    () => (property ? Math.round(property.price / Math.max(1, property.area)) : 0),
    [property]
  )

  useEffect(() => {
    if (!property) router.push("/imoveis")
  }, [property, router])

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{t.notFoundTitle}</h1>
          <Button onClick={() => router.push("/imoveis")}>{t.backToList}</Button>
        </div>
      </div>
    )
  }

  const images = property.images?.length ? property.images : ["/placeholder.svg"]
  const currentImage = images[currentImageIndex] ?? images[0]

  const handleWhatsApp = () => {
    const msg = `Olá! Tenho interesse no imóvel: ${property.title} - ${formatPrice(property.price, language)}`
    const url = `https://wa.me/244930145818?text=${encodeURIComponent(msg)}`
    window.open(url, "_blank")
  }

  const labelByType: Partial<Record<PropertyType, string>> = {
    apartment: t.apartment,
    house: t.house,
    commercial: t.commercial,
    land: t.land,
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                {typeIcon[property.type]}
                <div className="flex gap-2">
                  {property.isNew && (
                    <Badge className="bg-green-600 hover:bg-green-700 text-white">
                      {t.newProperty}
                    </Badge>
                  )}
                  {property.isFeatured && (
                    <Badge className="bg-gray-900 hover:bg-gray-800 text-white">
                      {t.featured}
                    </Badge>
                  )}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {labelByType[property.type] ?? ""}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mr-2" />
                {property.location}
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {formatPrice(property.price, language)}
              </div>
              <div className="text-gray-600">
                {pricePerM2} {t.pricePerM2}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <div className="relative">
              <div className="relative h-96 lg:h-[500px] rounded-xl overflow-hidden">
                <Image
                  src={currentImage}
                  alt={`${property.title} - ${currentImageIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  priority
                />
                <div className="absolute inset-0 bg-black/20" />

                {/* Navigation */}
                <button
                  onClick={() =>
                    setCurrentImageIndex((i) => (i - 1 + images.length) % images.length)
                  }
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6 text-gray-800" />
                </button>
                <button
                  onClick={() => setCurrentImageIndex((i) => (i + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6 text-gray-800" />
                </button>

                {/* Counter */}
                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>

                {/* View All */}
                <Dialog open={isGalleryOpen} onOpenChange={setIsGalleryOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="secondary"
                      className="absolute bottom-4 left-4 bg-white/90 hover:bg-white text-gray-900"
                    >
                      {t.viewAllPhotos} ({images.length})
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl w-full h-[80vh]">
                    <div className="relative h-full">
                      <button
                        onClick={() => setIsGalleryOpen(false)}
                        className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        aria-label="Close gallery"
                      >
                        <X className="w-6 h-6" />
                      </button>
                      <Image
                        src={currentImage}
                        alt={`${property.title} - ${currentImageIndex + 1}`}
                        fill
                        className="object-contain"
                        sizes="90vw"
                      />
                      <button
                        onClick={() =>
                          setCurrentImageIndex((i) => (i - 1 + images.length) % images.length)
                        }
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((i) => (i + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2"
                        aria-label="Next image"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              {/* Thumbs */}
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2">
                {images.map((src, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-colors ${idx === currentImageIndex ? "border-gray-900" : "border-gray-200"
                      }`}
                    aria-label={`Go to image ${idx + 1}`}
                  >
                    <Image src={src} alt={`Thumb ${idx + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Property Details */}



            {/* Map */}

          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact CTA (substitui o form “Interessado” e remove “Características”) */}
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">{t.contactCardTitle}</h3>
                <Button
                  className="w-full mb-4 bg-green-600 hover:bg-green-700 text-white"
                  onClick={handleWhatsApp}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {t.contactCardCta}
                </Button>

                {/* Resumo */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="text-lg font-bold text-gray-900 mb-4">Valores</h4>
                  <div className="space-y-3 text-sm">
                    <SummaryRow
                      label={t.price}
                      value={formatPrice(property.price, language)}
                      bold
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  )
}


function InfoRow({ label, value }: { label: string; value?: string | number | null }) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className="font-medium">{value ?? "-"}</span>
    </div>
  )
}

function SummaryRow({
  label,
  value,
  bold = false,
}: {
  label: string
  value: string | number
  bold?: boolean
}) {
  return (
    <div className="flex justify-between">
      <span className="text-gray-600">{label}:</span>
      <span className={bold ? "font-bold text-gray-900" : "font-medium"}>{value}</span>
    </div>
  )
}
