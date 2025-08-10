import { CheckCircle, Users, Award, MapPin } from 'lucide-react'

export const teamMembers = [
    {
        name: "Ana Silva",
        role: "Diretora Geral",
        image: "/placeholder.svg?height=300&width=300&text=Ana+Silva",
        description: "15 anos de experiência no mercado imobiliário português"
    },
    {
        name: "João Santos",
        role: "Consultor Sénior",
        image: "/placeholder.svg?height=300&width=300&text=João+Santos",
        description: "Especialista em imóveis de luxo em Lisboa e Porto"
    },
    {
        name: "Maria Costa",
        role: "Consultora Internacional",
        image: "/placeholder.svg?height=300&width=300&text=Maria+Costa",
        description: "Focada no atendimento a clientes europeus"
    }
]


export const values = [
    {
        icon: <CheckCircle className="w-8 h-8 text-green-500" />,
        title: "Transparência",
        description: "Informações claras e honestas em todas as transações"
    },
    {
        icon: <Users className="w-8 h-8 text-blue-500" />,
        title: "Atendimento Personalizado",
        description: "Cada cliente recebe atenção individual e dedicada"
    },
    {
        icon: <Award className="w-8 h-8 text-yellow-500" />,
        title: "Excelência",
        description: "Compromisso com a qualidade em todos os serviços"
    },
    {
        icon: <MapPin className="w-8 h-8 text-red-500" />,
        title: "Conhecimento Local",
        description: "Expertise profunda do mercado imobiliário português"
    }
]
