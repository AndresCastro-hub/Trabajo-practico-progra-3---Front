"use client";
import { Tabs, TabsContent, TabsList,TabsTrigger } from "@/components/ui/tabs"
import { BookOpenText, Carrot, UsersRound } from "lucide-react";
import IngredientesTab from "./ingredientes/IngredientesTab";
import { useIngredientsSearch } from "../hooks/useIngredientsSearch";

export default function AdminTabs() {
    const { busqueda, setBusqueda, pagina, setPagina, resultados } = useIngredientsSearch();
    return (
        <Tabs defaultValue="recetas-globales" className="w-full">
            <TabsList className="h-11 py-5 rounded-xl ml-4">
                <TabsTrigger value="recetas-globales" className="px-6 py-4 text-base rounded-xl">{<BookOpenText/>}Recetas Globales</TabsTrigger>
                <TabsTrigger value="ingredientes" className="px-6 py-4 text-base rounded-xl">{<Carrot/>}Ingredientes</TabsTrigger>
                <TabsTrigger value="usuarios" className="px-6 py-4 text-base rounded-xl">{<UsersRound/>}Usuarios</TabsTrigger>
            </TabsList>

            <TabsContent value="recetas-globales">
                <p>Acá irá el panel de recetas globales</p>
            </TabsContent>

            <TabsContent value="ingredientes">
                <IngredientesTab 
                    busqueda={busqueda}
                    setBusqueda={setBusqueda}
                    pagina={pagina}
                    setPagina={setPagina}
                    resultados={resultados}
                />
            </TabsContent>

            <TabsContent value="usuarios">
                <p>Acá irá el panel de usuarios</p>
            </TabsContent>
        </Tabs>
    )
}