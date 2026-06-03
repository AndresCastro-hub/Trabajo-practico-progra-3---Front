import { Pencil, Trash2 } from "lucide-react"

interface IRecetaActionsProps{
    onEditar: () => void
    onEliminar: () => void
}

export default function RecetaActions({onEditar, onEliminar}: IRecetaActionsProps) {
    return (
        <div className="flex items-center gap-2">
            <button
                onClick={onEditar}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors shadow-sm"
            >
                <Pencil className="w-4 h-4" />
            </button>
            <button
                onClick={onEliminar}
                onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#b91c1c')}
                onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#d51010')}
                style={{ backgroundColor: '#d51010' }}
                className="w-10 h-10 flex items-center justify-center rounded-full transition-colors shadow-sm"
            >
                <Trash2 className="w-4 h-4 text-white" />
            </button>
        </div>
    )
}