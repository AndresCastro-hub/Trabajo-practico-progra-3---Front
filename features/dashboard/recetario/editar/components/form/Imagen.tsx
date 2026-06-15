import Image from "next/image";

export default function Imagen({ value }: { value: string }) {
    return (
        <div className="flex flex-col gap-2">
            <h2 className="text-lg font-semibold text-slate-900">Imagen</h2>
            <p className="text-sm text-slate-500">Imagen de la receta.</p>
            <div className="relative h-72 w-full rounded-2xl overflow-hidden">
                <Image
                    src={value}
                    alt="Imagen de la receta"
                    fill
                    className="object-cover"
                />
            </div>
        </div>
    )
}