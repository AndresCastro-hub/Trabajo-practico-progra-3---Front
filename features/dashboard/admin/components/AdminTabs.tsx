"use client";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import InputField  from "@/components/InputField";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { Carrot } from 'lucide-react';
import { BookOpenText } from 'lucide-react';
import { UsersRound } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


export default function AdminTabs() {
    const ingredientes = [
        { nombre: "Tomate", unidad: "U" },
        { nombre: "Leche", unidad: "mL" },
        { nombre: "Queso", unidad: "Gr" },
    ];

    const { busqueda, setBusqueda } = useSearch();

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
                <div className="flex flex-row justify-between items-end gap-4 px-4">
                    <InputField
                        autoComplete="búsqueda"
                        id="buscadorIngredientes"
                        label=""
                        type="text"
                        placeholder="Buscar por nombre"
                        value={busqueda}
                        onChange={setBusqueda}
                        validate={() => {
                            // Aquí podrías agregar lógica para validar la búsqueda si es necesario
                            return null; // Retorna null si no hay errores, o un mensaje de error si lo hay
                        }}
                        error={null} // Aquí podrías pasar un mensaje de error si la validación falla
                        icon={<Search size={16} />}
                    />
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="h-[50px] px-6 shrink-0">
                                + Nuevo Ingrediente
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Nuevo Ingrediente</DialogTitle>
                            </DialogHeader>
                            <p className="text-muted-foreground text-sm">Acá va el form</p>
                        </DialogContent>
                    </Dialog>
                </div>
                
                <div className="m-4 rounded-xl border border-border overflow-hidden">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                                    Nombre
                                </TableHead>
                                <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                                    Unidad
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {
                                ingredientes.map((ingrediente) => (
                                    <TableRow key={ingrediente.nombre} className="hover:bg-muted/30">
                                        <TableCell className="font-medium">{ingrediente.nombre}</TableCell>
                                        <TableCell className="text-muted-foreground">{ingrediente.unidad}</TableCell>
                                    </TableRow>
                                ))
                            }
                        </TableBody>
                    </Table>
                </div>
            </TabsContent>

            <TabsContent value="usuarios">
                <p>Acá irá el panel de usuarios</p>
            </TabsContent>
        </Tabs>
    )
}