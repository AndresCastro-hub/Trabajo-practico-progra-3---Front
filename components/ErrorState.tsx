import { ArrowLeft } from "lucide-react"

interface ErrorStateProps {
    message: string
    onBack?: () => void
}

export default function ErrorState({ message, onBack }: ErrorStateProps) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
            <p className="text-2xl font-semibold text-gray-700">Algo salió mal</p>
            <p className="text-gray-400 mt-2">{message}</p>
            { onBack &&
                <button onClick={onBack} className="mt-6 flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors">
                    <ArrowLeft className="w-4 h-4" />
                    <span className="text-sm font-medium">Volver</span>
                </button>
            }
        </div>
    )
}