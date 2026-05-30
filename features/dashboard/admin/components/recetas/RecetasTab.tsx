import RecetasTable from "./RecetasTable"
import RecetasHeader from "./RecetasHeader"

export default function RecetasTab() {
    const recetas=[
        {
            nombre: "Pollo al horno",
            calorias: 300,
            tiempo: 120,
            ingredientes: [
                {
                    nombre:"pollo",
                    unidad:"g"
                },
                {
                    nombre: "papas",
                    unidad: "g"
                }
            ]
        },
        {
            nombre: "Milanesa",
            calorias: 500,
            tiempo: 60,
            ingredientes: [
                {
                    nombre:"carne",
                    unidad:"g"
                },
                {
                    nombre: "pan",
                    unidad: "g"
                }
            ]
        }
    ]

    return (
        <>
            <RecetasHeader busqueda="" setBusqueda={() => {}} />
            <RecetasTable recetas={recetas} />
        </>
    )
}