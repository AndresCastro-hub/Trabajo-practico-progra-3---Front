"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Pencil, Trash2 } from 'lucide-react';

interface ingrediente{
    nombre:string;
    unidad:string;
}

export default function RecetasTable( {recetas} : { recetas: { nombre: string, calorias: number, tiempo: number, ingredientes: Array<ingrediente> }[] } ) {
    return (
        <div className="m-4 rounded-xl border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                        <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                            Nombre
                        </TableHead>
                        <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                            Calorias
                        </TableHead>
                        <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                            Tiempo de Cocción
                        </TableHead>
                        <TableHead className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
                            Ingredientes
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        recetas.map((receta) => (
                            <TableRow key={receta.nombre} className="hover:bg-muted/30">
                                <TableCell className="font-medium">{receta.nombre}</TableCell>
                                <TableCell className="text-muted-foreground">{receta.calorias}</TableCell>
                                <TableCell className="font-medium">{receta.tiempo}</TableCell>
                                <TableCell className="text-muted-foreground">{receta.ingredientes.length}</TableCell>
                                <TableCell className="text-muted-foreground">
                                    <Button variant="outline" size="sm">
                                        <Pencil />
                                    </Button>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    <Button variant="outline" size="sm">
                                        <Trash2 />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
            {/*
            <hr className="border-border" />
            <div className="flex flex-row justify-around items-center gap-2 p-4">
                <button
                    className="px-3 py-1 rounded-md bg-primary text-white disabled:bg-muted disabled:text-muted-foreground hover:enabled:bg-primary/90"
                    onClick={() => setPagina(pagina - 1)}
                    disabled={pagina === 0}
                >
                    Anterior
                </button>

                <span className="text-sm text-muted-foreground">
                    página {pagina + 1} de {Math.ceil(recetas.length / LIMITE_POR_PAGINA)}
                </span>

                <button
                    className="px-3 py-1 rounded-md bg-primary text-white disabled:bg-muted disabled:text-muted-foreground hover:enabled:bg-primary/90"
                    onClick={() => setPagina(pagina + 1)}
                    disabled={recetas.length < LIMITE_POR_PAGINA}
                >
                    Siguiente
                </button>
            </div>
            */}
        </div>
    )
}
