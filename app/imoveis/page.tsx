"use client"

import { useState } from "react"
import {
  Home as HomeIcon,
  Building,
  Warehouse,
  TreePine,
  MapPin,
  Bed,
  Bath,
  Globe,
  Phone,
  Search
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import Image from "next/image"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import Header from "@/components/Header"

// ======= Tradução base =======
const DICT = {
  pt: {
    home: "Início",
    properties: "Imóveis",
    aboutUs: "Sobre nós",
    contact: "Contacto",
    whatsapp: "WhatsApp",
    new: "NOVO",
    featured: "DESTAQUE",
    viewDetails: "Ver Detalhes",
    bedrooms: "quartos",
    bathrooms: "casas de banho",
    found: "imóveis encontrados",
    searchPlaceholder: "Pesquisar por título...",
    locationFilter: "Todas as localizações",
    prev: "Anterior",
    next: "Próximo"
  },
  en: {
    home: "Home",
    properties: "Properties",
    aboutUs: "About us",
    contact: "Contact",
    whatsapp: "WhatsApp",
    new: "NEW",
    featured: "FEATURED",
    viewDetails: "View Details",
    bedrooms: "bedrooms",
    bathrooms: "bathrooms",
    found: "properties found",
    searchPlaceholder: "Search by title...",
    locationFilter: "All locations",
    prev: "Previous",
    next: "Next"
  },
} as const

type Lang = keyof typeof DICT

// ======= Mock data =======
const mockProperties = [
  { id: 1, title: "Apartamento T2 Moderno - Príncipe Real", price: 450000, location: "Lisboa, Portugal", type: "apartment", bedrooms: 2, bathrooms: 2, area: 85, image: "/modern-lisbon-apartment.png", isNew: true, isFeatured: true },
  { id: 2, title: "Moradia V3 com Jardim - Matosinhos", price: 320000, location: "Porto, Portugal", type: "house", bedrooms: 3, bathrooms: 2, area: 150, image: "/porto-house-garden.png", isNew: false, isFeatured: true },
  { id: 3, title: "Apartamento T1 Vista Mar - Cascais", price: 380000, location: "Cascais, Portugal", type: "apartment", bedrooms: 1, bathrooms: 1, area: 65, image: "/cascais-sea-view-apartment.png", isNew: true, isFeatured: false },
  { id: 4, title: "Loja Comercial Centro Histórico", price: 180000, location: "Óbidos, Portugal", type: "commercial", bedrooms: 0, bathrooms: 1, area: 45, image: "/historic-center-commercial.png", isNew: false, isFeatured: true },
  { id: 5, title: "Terreno para Construção - Braga", price: 90000, location: "Braga, Portugal", type: "land", bedrooms: 0, bathrooms: 0, area: 300, image: "/land-braga.png", isNew: false, isFeatured: false },
  { id: 6, title: "Apartamento T3 Renovado - Faro", price: 270000, location: "Faro, Portugal", type: "apartment", bedrooms: 3, bathrooms: 2, area: 110, image: "/faro-apartment.png", isNew: true, isFeatured: false },
  { id: 7, title: "Moradia V4 Luxuosa - Sintra", price: 550000, location: "Sintra, Portugal", type: "house", bedrooms: 4, bathrooms: 3, area: 200, image: "/sintra-luxury-house.png", isNew: false, isFeatured: true }
]

// ======= Componente =======
export default function PropertiesPage() {
  const [language, setLanguage] = useState<Lang>("pt")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 3
  const t = DICT[language]

  const formatPrice = (price: number) =>
    new Intl.NumberFormat(language === "pt" ? "pt-PT" : "en-GB", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)

  const getPropertyTypeIcon = (type: string) => {
    switch (type) {
      case "apartment": return <Building className="w-4 h-4" />
      case "house": return <HomeIcon className="w-4 h-4" />
      case "commercial": return <Warehouse className="w-4 h-4" />
      case "land": return <TreePine className="w-4 h-4" />
      default: return <HomeIcon className="w-4 h-4" />
    }
  }

  // Filtro geral
  const filteredProperties = mockProperties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesLocation = selectedLocation === "all" || p.location === selectedLocation
    return matchesSearch && matchesLocation
  })

  // Paginação
  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const paginatedProperties = filteredProperties.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const uniqueLocations = ["all", ...new Set(mockProperties.map((p) => p.location))]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      {/* Filtros */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3.5 text-gray-400 w-5 h-5" />
          <Input type="text" placeholder={t.searchPlaceholder} value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }} className="pl-10" />
        </div>
        <Select value={selectedLocation} onValueChange={(value) => { setSelectedLocation(value); setCurrentPage(1) }}>
          <SelectTrigger className="w-full md:w-64">
            <SelectValue placeholder={t.locationFilter} />
          </SelectTrigger>
          <SelectContent>
            {uniqueLocations.map((loc) => (
              <SelectItem key={loc} value={loc}>
                {loc === "all" ? t.locationFilter : loc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cards */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {paginatedProperties.map((property) => (
            <Card key={property.id} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-1 cursor-pointer w-full max-w-sm">
              <div className="relative overflow-hidden rounded-t-lg h-64">
                <Image src={property.image || "/placeholder.svg"} alt={property.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-3 left-3 flex gap-2">
                  {property.isNew && <Badge className="bg-green-500 hover:bg-green-600 text-white">{t.new}</Badge>}
                  {property.isFeatured && <Badge className="bg-gray-900 hover:bg-gray-800 text-white">{t.featured}</Badge>}
                </div>
                <div className="absolute top-3 right-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">{getPropertyTypeIcon(property.type)}</div>
                </div>
              </div>
              <CardContent className="p-6 space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{property.title}</h3>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-1" /> {property.location}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">{formatPrice(property.price)}</span>
                  <span className="text-sm text-gray-600">{property.area}m²</span>
                </div>
                {property.bedrooms > 0 && (
                  <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                    <Bed className="w-4 h-4 mr-2" /> {property.bedrooms} {t.bedrooms}
                    <span className="mx-2">•</span>
                    <Bath className="w-4 h-4 mr-2" /> {property.bathrooms} {t.bathrooms}
                  </div>
                )}
                <Link href={`/imovel/${property.id}`}>
                  <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white">{t.viewDetails}</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Paginação */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-8">
            <Button variant="outline" onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))} disabled={currentPage === 1}>
              {t.prev}
            </Button>
            <span className="text-gray-700">{currentPage} / {totalPages}</span>
            <Button variant="outline" onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
              {t.next}
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
