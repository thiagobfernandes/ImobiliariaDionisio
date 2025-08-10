import Image from "next/image"

export function AboutSection() {
    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">A Nossa História</h2>
                    <div className="prose prose-lg text-gray-700 space-y-4">
                        <p>
                            Fundada em 2009, a ImóveisEU nasceu com a missão de revolucionar o mercado imobiliário português,
                            oferecendo um serviço personalizado e de excelência.
                        </p>
                        <p>
                            Construímos uma reputação sólida baseada na confiança, transparência e conhecimento profundo do mercado.
                        </p>
                        <p>
                            Hoje, somos uma das imobiliárias de referência em Portugal, com foco no atendimento a clientes europeus.
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <Image
                        src="/placeholder.svg?height=500&width=600&text=Escritório+ImóveisEU"
                        alt="Escritório ImóveisEU"
                        width={600}
                        height={500}
                        className="rounded-lg shadow-xl"
                    />
                </div>
            </div>
        </section>
    )
}
