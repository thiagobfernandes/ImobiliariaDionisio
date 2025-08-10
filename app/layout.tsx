import type { Metadata } from "next"
import { Inter } from 'next/font/google'
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "ImobiliarioDionisio - Encontre o Seu Imóvel Ideal em Portugal",
  description: "Descubra as melhores oportunidades imobiliárias em Portugal. Apartamentos, moradias, terrenos e imóveis comerciais.",
  keywords: "imóveis, Portugal, apartamentos, moradias, venda, arrendamento, Lisboa, Porto",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
