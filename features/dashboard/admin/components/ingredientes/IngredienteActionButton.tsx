import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import IngredientesForm from "./IngredientesForm";

export default function IngredienteActionButton() {
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-[50px] px-6 shrink-0">
                + Nuevo Ingrediente
                </Button>
            </DialogTrigger>
            
            <DialogContent className="bg-white border border-border rounded-xl">
                <DialogHeader>
                    <DialogTitle>Nuevo Ingrediente</DialogTitle>
                </DialogHeader>
                
                <IngredientesForm />
            </DialogContent>
        </Dialog>
    )
}