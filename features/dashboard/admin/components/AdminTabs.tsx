"use client";
import { Tabs, TabsContent, TabsList,TabsTrigger } from "@/components/ui/tabs"
import { BookOpenText, Carrot, UsersRound } from "lucide-react";
import IngredientesTab from "./ingredientes/IngredientesTab";

export default function AdminTabs() {
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
                <IngredientesTab />
            </TabsContent>

            <TabsContent value="usuarios">
                <p>Acá irá el panel de usuarios</p>
            </TabsContent>
        </Tabs>
    )
}