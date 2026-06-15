import { ActiveTab } from "../../recetario/types/recetario.types";

interface AsignarRecetaTabsProps {
    activeTab: ActiveTab;
    handleTabChange: (tab: ActiveTab) => void;
}

export function AsignarRecetaTabs({ activeTab, handleTabChange }: AsignarRecetaTabsProps) {
    return(
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
    )
}