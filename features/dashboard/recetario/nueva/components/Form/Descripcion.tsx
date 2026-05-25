import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface IValue {
    value: string
    setValue: (e: string) => void
}

export default function Descripcion({ value, setValue }: IValue) {
    return (
        <>
            <Label htmlFor="descripcion">
                Descripción
            </Label>
            <Textarea
                id="descripcion"
                placeholder="Breve descripción de la receta..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                rows={3}
                className="resize-none rounded-xl"
            />
        </>
    )
}