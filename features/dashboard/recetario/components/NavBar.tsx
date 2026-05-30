import { Activity, Search } from "lucide-react"
import { ActiveTab } from "../types/recetario.types"

interface INavBar {
    handleTabChange: (e: ActiveTab) => void
    activeTab: string
    onSearch: (value: string) => void
}

export default function NavBar({ activeTab, handleTabChange, onSearch }: INavBar) {

    const modoControl = false
    const onToggleModoControl = () => {
        //logica 
    }

    return (
        <nav className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between gap-4">
            <div className="relative w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                    type="text"
                    placeholder="Buscar recetas..."
                    className="w-full pl-9 pr-4 py-2 rounded-full border border-gray-200 bg-gray-50 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") onSearch(e.currentTarget.value)
                    }}
                />
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={onToggleModoControl}
                    className={`flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-full border transition-all ${
                        modoControl
                            ? "bg-green-50 border-green-200 text-green-700"
                            : "bg-gray-100 border-gray-200 text-gray-500"
                    }`}
                >
                    <Activity className={`w-4 h-4 ${modoControl ? "text-green-500" : "text-gray-400"}`} />
                    Modo control {modoControl ? "ON" : "OFF"}
                </button>

                <div className="flex items-center bg-gray-100 rounded-full p-1">
                    <button
                        onClick={() => handleTabChange("plataforma")}
                        className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all ${activeTab === "plataforma"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Plataforma
                    </button>
                    <button
                        onClick={() => handleTabChange("mis-recetas")}
                        className={`text-sm font-semibold px-4 py-1.5 rounded-full transition-all ${activeTab === "mis-recetas"
                            ? "bg-white text-gray-900 shadow-sm"
                            : "text-gray-500 hover:text-gray-700"
                        }`}
                    >
                        Mis Recetas
                    </button>
                </div>
            </div>
        </nav>
    )
}