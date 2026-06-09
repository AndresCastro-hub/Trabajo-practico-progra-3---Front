import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"

interface IValue{
    value: string
    setValue?: (e: string) => void,
    isDisabled?: boolean,
}

export default function Nombre({value, setValue, isDisabled}: IValue) {
    return (
        <>
            <Label htmlFor="nombre">Nombre <span className="text-red-500">*</span></Label>
            <Input
                id="nombre"
                placeholder="Ej: Milanesa napolitana"
                value={value}
                onChange={(e) => setValue && setValue(e.target.value)}
                disabled={isDisabled ? true : false}
                className="h-12 rounded-xl"
            />
        </>
    )
}