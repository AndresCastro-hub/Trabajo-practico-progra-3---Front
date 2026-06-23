import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { EditarRecetaForm } from "./EditarRecetaForm";
import { Utensils } from "lucide-react";

interface IDialog {
    tipoComida: string;
    fecha: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditarDialog({ tipoComida, fecha, open, onOpenChange }: IDialog) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md p-0 rounded-2xl">
                <DialogHeader className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="bg-white/20 p-2 rounded-xl">
                            <Utensils className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <DialogTitle className="text-white text-lg font-bold">
                                Editar receta asignada
                            </DialogTitle>
                            <DialogDescription className="text-green-100 text-xs mt-0.5">
                                {tipoComida} · {fecha}
                            </ DialogDescription>
                        </div>
                    </div>
                </DialogHeader>

                <div className="px-6 py-4">
                    <EditarRecetaForm fecha={fecha} tipoComida={tipoComida} />
                </div>
            </DialogContent>
        </Dialog>
    )
}