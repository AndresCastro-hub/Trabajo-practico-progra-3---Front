"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from 'lucide-react';
import { IReceta } from "@/features/dashboard/recetario/types/recetario.types";

export default function RecetasTable( {recetas} : { recetas: IReceta[] } ) {
    return (
        <div className="m-4 rounded-xl border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground w-1/5">
                            Nombre
                        </TableHead>
                        <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-center">
                            Calorias
                        </TableHead>
                        <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-center">
                            Tiempo de Cocción
                        </TableHead>
                        <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground text-center">
                            Ingredientes
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        recetas.map((receta) => (
                            <TableRow key={receta.nombre} className="hover:bg-muted/30">
                                <TableCell className="font-medium">{receta.nombre}</TableCell>
                                <TableCell className="text-sm font-semibold text-gray-800 text-center">{receta.calorias} kcal</TableCell>
                                <TableCell className="text-sm font-semibold text-gray-800 text-center">{receta.tiempoPreparacion} min</TableCell>
                                <TableCell className="text-sm font-semibold text-gray-800 text-center">{8 /* cantidad ingredientes */}</TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm">
                                        <Pencil />
                                    </Button>
                                </TableCell>
                                <TableCell >
                                    <Button variant="outline" size="sm">
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}
