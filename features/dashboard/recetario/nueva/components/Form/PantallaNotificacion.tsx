import { CheckCircle2, X, XCircle } from "lucide-react"

interface IPantallaNotificacion{
    success: boolean
    successMessage: string
    error: string | null
    clearFeedback: () => void
}

export default function PantallaNotificacion({success, successMessage, error, clearFeedback}: IPantallaNotificacion){
    return(
        <>
        {(success || error) && (
                <div className="fixed bottom-5 left-5 z-50 animate-in slide-in-from-bottom-2 fade-in duration-300">
                    <div className={`flex items-start gap-3 px-4 py-3 rounded-2xl shadow-lg border text-sm max-w-sm
                        ${success
                            ? "bg-green-50 border-green-200 text-green-800"
                            : "bg-red-50 border-red-200 text-red-800"
                        }`}
                    >
                        {success
                            ? <CheckCircle2 size={18} className="text-green-500 mt-0.5 shrink-0" />
                            : <XCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                        }
                        <span className="flex-1">{success ? successMessage : error}</span>
                        <button onClick={clearFeedback} className="text-current opacity-50 hover:opacity-100 transition-opacity">
                            <X size={14} />
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}