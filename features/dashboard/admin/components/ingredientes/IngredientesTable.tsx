"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function IngredientesTable( {resultados} : { resultados: { nombre: string, unidad: string }[] } ) {
    return (
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
                        resultados.map((ingrediente) => (
                            <TableRow key={ingrediente.nombre} className="hover:bg-muted/30">
                                <TableCell className="font-medium">{ingrediente.nombre}</TableCell>
                                <TableCell className="text-muted-foreground">{ingrediente.unidad}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </div>
    )
}