
export function StatsSection() {
    const stats = [
        { number: "500+", label: "Imóveis Vendidos" },
        { number: "15", label: "Anos de Experiência" },
        { number: "98%", label: "Clientes Satisfeitos" },
        { number: "50+", label: "Cidades Cobertas" }
    ]

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                    <div key={index} className="text-center">
                        <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                            {stat.number}
                        </div>
                        <div className="text-gray-600 font-medium">
                            {stat.label}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
