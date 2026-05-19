import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface IValue{
    value: number
    setValue: (e: number) => void
}

export default function TiempoDePreparacion({value, setValue}: IValue) {
    return (
        <>
            <Label htmlFor="tiempo">
                Tiempo de preparación <span className="text-red-500">*</span>
                <span className="text-slate-400 font-normal ml-1">(Minutos)</span>
            </Label>
            <Input
                id="tiempo"
                type="number"
                placeholder="30"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="h-12 rounded-xl"
            />
        </>
    )
}