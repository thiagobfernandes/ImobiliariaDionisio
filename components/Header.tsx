"use client"

import { useState, useMemo, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { Home as HomeIcon, Menu, X, Globe, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

type Lang = "pt" | "en"

const DICT = {
    pt: { home: "Início", properties: "Imóveis", about: "Sobre", contact: "Contacto", whatsapp: "WhatsApp" },
    en: { home: "Home", properties: "Properties", about: "About", contact: "Contact", whatsapp: "WhatsApp" },
} as const

function getWhatsNumber() {
    return (process.env.NEXT_PUBLIC_WHATS_NUMBER || "244930145818").replace(/[^\d]/g, "")
}
function buildWhatsUrl(msg: string, lang: Lang) {
    const text = msg ?? (lang === "pt" ? "Olá! Gostaria de mais informações." : "Hello! I’d like more information.")
    return `https://wa.me/${getWhatsNumber()}?text=${encodeURIComponent(text)}`
}

export type SiteHeaderProps = {
    language?: Lang
    onLanguageChange?: (lang: Lang) => void
    brand?: string
    nav?: Array<{ href: string; key: "home" | "properties" | "about" | "contact" }>
    className?: string
}

export default function SiteHeader({
    language = "pt",
    onLanguageChange,
    brand = "Imobiliária Dionísio",
    nav = [
        { href: "/", key: "home" },
        { href: "/imoveis", key: "properties" },
        { href: "/contacto", key: "contact" },
    ],
    className,
}: SiteHeaderProps) {
    const t = DICT[language]
    const pathname = usePathname()
    const router = useRouter()
    const [open, setOpen] = useState(false)

    // Fechar o menu ao trocar de rota
    useEffect(() => { setOpen(false) }, [pathname])

    const items = useMemo(() => nav.map(n => ({ ...n, label: t[n.key] })), [nav, t])

    const toggleLang = () => onLanguageChange?.(language === "pt" ? "en" as Lang : "pt")

    return (
        <header className={`bg-white/90 backdrop-blur border-b border-gray-200 sticky top-0 z-50 ${className ?? ""}`}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Brand */}
                    <button
                        onClick={() => router.push("/")}
                        className="flex items-center gap-3 focus:outline-none"
                        aria-label="Go to home"
                    >
                        <div className="size-10 rounded-lg bg-gradient-to-br from-gray-800 to-gray-600 shadow-lg grid place-items-center">
                            <HomeIcon className="size-6 text-white" />
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                            {brand.split(" ").slice(0, -1).join(" ") || "Imobiliária"}{" "}
                            <span className="text-gray-600">{brand.split(" ").slice(-1)[0] || "Dionísio"}</span>
                        </div>
                    </button>

                    {/* Desktop nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {items.map(({ href, label }) => {
                            const active = pathname === href || (href !== "/" && pathname?.startsWith(href))
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`font-medium transition-colors ${active ? "text-gray-900" : "text-gray-700 hover:text-gray-900"
                                        }`}
                                >
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Actions */}
                    <div className="hidden md:flex items-center gap-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={toggleLang}
                            className="flex items-center gap-1 hover:bg-gray-100"
                        >
                            <Globe className="size-4" />
                            <span className="text-sm font-medium">{language.toUpperCase()}</span>
                        </Button>
                        <Button
                            className="bg-green-600 hover:bg-green-700 text-white shadow-lg"
                            onClick={() => window.open(buildWhatsUrl("", language), "_blank")}
                        >
                            <Phone className="size-4 mr-2" />
                            {t.whatsapp}
                        </Button>
                    </div>

                    {/* Mobile: hamburger */}
                    <button
                        className="md:hidden rounded-md p-2 hover:bg-gray-100"
                        onClick={() => setOpen(s => !s)}
                        aria-label="Open menu"
                        aria-expanded={open}
                    >
                        {open ? <X className="size-6" /> : <Menu className="size-6" />}
                    </button>
                </div>
            </div>

            {/* Mobile dropdown */}
            <div
                className={`md:hidden border-t border-gray-200 bg-white transition-[max-height] duration-300 overflow-hidden ${open ? "max-h-96" : "max-h-0"
                    }`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
                    <nav className="flex flex-col">
                        {items.map(({ href, label }) => {
                            const active = pathname === href || (href !== "/" && pathname?.startsWith(href))
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={`py-3 border-b last:border-b-0 transition-colors ${active ? "text-gray-900 font-semibold" : "text-gray-700 hover:text-gray-900"
                                        }`}
                                >
                                    {label}
                                </Link>
                            )
                        })}
                    </nav>

                    <div className="flex items-center justify-between gap-3 pt-4">
                        <button
                            onClick={toggleLang}
                            className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm hover:bg-gray-50"
                            aria-label="Toggle language"
                        >
                            <Globe className="size-4" />
                            <span>{language.toUpperCase()}</span>
                        </button>

                        <Button
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => window.open(buildWhatsUrl("", language), "_blank")}
                        >
                            <Phone className="size-4 mr-2" />
                            {t.whatsapp}
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    )
}
