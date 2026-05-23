"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { LIMITE_POR_PAGINA } from "../../hooks/useIngredientsSearch";

export default function IngredientesTable( {resultados, pagina, setPagina} : { resultados: { nombre: string, unidad: string }[], pagina: number, setPagina: (pagina: number) => void } ) {
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
                    página {pagina + 1} de {Math.ceil(resultados.length / LIMITE_POR_PAGINA)}
                </span>

                <button
                    className="px-3 py-1 rounded-md bg-primary text-white disabled:bg-muted disabled:text-muted-foreground hover:enabled:bg-primary/90"
                    onClick={() => setPagina(pagina + 1)}
                    disabled={resultados.length < LIMITE_POR_PAGINA}
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}