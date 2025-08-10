import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export function CTASection() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Pronto para Começar?</h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Entre em contacto connosco hoje mesmo e descubra como podemos ajudá-lo a encontrar o imóvel perfeito.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        size="lg"
                        className="bg-white text-gray-900 hover:bg-gray-100"
                        onClick={() => window.location.href = '/contacto'}
                    >
                        <Mail className="w-5 h-5 mr-2" />
                        Contactar-nos
                    </Button>
                    <Button
                        size="lg"
                        variant="outline"
                        className="border-white text-white hover:bg-white hover:text-gray-900"
                        onClick={() => window.location.href = '/imoveis'}
                    >
                        Ver Imóveis
                    </Button>
                </div>
            </div>
        </section>
    )
}
