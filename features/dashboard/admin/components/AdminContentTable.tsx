"use client";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { ReactNode } from "react";

export interface IColumn<T> {
    header: string;
    render: (item: T) => ReactNode;
    className?: string;
}

interface IAdminContentTableProps<T> {
    tableContent: T[];
    columns: IColumn<T>[];
    getKey: (item: T) => string | number;
    onEdit?: (item: T) => void;
    onDelete?: (item: T) => void;
}

export default function AdminContentTable<T>({ tableContent, columns, getKey, onEdit, onDelete }: IAdminContentTableProps<T>) {
    return (
        <div className="m-4 rounded-xl border border-border overflow-hidden">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/40 hover:bg-muted/40">
                        {columns.map((col) => (
                            <TableHead key={col.header} className={`text-small font-semibold tracking-widest uppercase text-gray-700 ${col.className ?? ""}`}>
                                {col.header}
                            </TableHead>
                        ))}

                        {(onEdit || onDelete) && <TableHead />}
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {tableContent.map((item) => (
                        <TableRow key={getKey(item)} className="hover:bg-muted/30">
                            {columns.map((col) => (
                                <TableCell key={col.header} className={`text-gray-700  ${col.className ?? ""}`}>
                                    {col.render(item)}
                                </TableCell>
                            ))}

                            {(onEdit || onDelete) && (
                                <TableCell className="text-right">
                                    <div className="flex justify-end gap-2">
                                        {onEdit && (
                                            <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                                                <Pencil size={14} />
                                            </Button>
                                        )}

                                        {onDelete && (
                                            <Button variant="outline" size="sm" onClick={() => onDelete(item)}>
                                                <Trash2 size={14} />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}