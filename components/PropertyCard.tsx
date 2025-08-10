// imports corretos
import NextImage from "next/image"
import Link from "next/link"
import { MapPin } from "lucide-react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"


// --- adicione perto do topo do arquivo ---
export function PropertyCard({
    property,
    t,
    index,
    formatPrice,
    getPropertyTypeIcon,
}: {
    property: any
    t: any
    index: number
    formatPrice: (n: number) => string
    getPropertyTypeIcon: (type: string) => React.ReactNode
}) {
    return (
        <Card
            key={property.id}
            className="group cursor-pointer overflow-hidden border-0 bg-white shadow-lg transition will-change-transform hover:-translate-y-1 hover:shadow-2xl"
            style={{ animationDelay: `${index * 80}ms` }}
        >
            <div className="relative">
                {/* wrapper com aspect para evitar jump */}
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                    <NextImage
                        src={property.image || "/placeholder.svg"}
                        alt={property.title}
                        fill
                        className="object-cover transition duration-300 group-hover:scale-105"
                        sizes="(max-width:640px) 100vw, (max-width:1280px) 50vw, 25vw"
                        priority={index < 4}
                    />

                </div>

                <div className="absolute top-3 left-3 flex gap-2">
                    {property.isNew && (
                        <Badge className="bg-green-600 text-white px-2.5 py-1 text-xs md:text-sm font-semibold">
                            {t.newProperty}
                        </Badge>
                    )}
                    {property.isFeatured && (
                        <Badge className="bg-gray-900 text-white px-2.5 py-1 text-xs md:text-sm font-semibold">
                            {t.featured}
                        </Badge>
                    )}
                </div>

                <div className="absolute top-3 right-3">
                    <div
                        className="rounded-full bg-white/90 backdrop-blur p-2 md:p-3 shadow-lg"
                        aria-label={property.type}
                        title={property.type}
                    >
                        {getPropertyTypeIcon(property.type)}
                    </div>
                </div>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </div>

            <CardContent className="p-5 md:p-6">
                <div className="mb-3 md:mb-4">
                    <h3 className="line-clamp-2 text-lg font-bold text-gray-900 md:text-xl">
                        {property.title}
                    </h3>
                    <div className="mt-1 flex items-center text-sm text-gray-600">
                        <MapPin className="mr-2 size-4" aria-hidden /> {property.location}
                    </div>
                </div>

                <div className="mb-4 flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">
                        {formatPrice(property.price)}
                    </span>
                </div>

                <Button asChild className="w-full bg-gray-900 text-white hover:bg-gray-800">
                    <Link href={`/imovel/${property.id}`} aria-label={`Ver detalhes de ${property.title}`}>
                        {t.viewDetails}
                    </Link>
                </Button>
            </CardContent>
        </Card>
    )
}
