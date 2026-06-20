import { Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import { EditarRecetaForm } from "./editarRecetaForm";

interface IDialog{
    tipoComida: string;
    fecha: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function EditarDialog({ tipoComida, fecha, open, onOpenChange }: IDialog){
    return(
        
         <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className='text-center text-gray-600 text-lg'> Asignar nueva receta</DialogTitle>
                    <hr />
                </DialogHeader>

                <EditarRecetaForm fecha={fecha} tipoComida={tipoComida} />
            </DialogContent>
        </Dialog>
        
    )
}