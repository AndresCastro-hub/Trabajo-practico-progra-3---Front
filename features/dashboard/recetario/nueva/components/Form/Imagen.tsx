import { Upload } from "lucide-react"

interface IValue {
    value: File | null
    setValue: (imagen: File | null) => void
}

export default function Imagen({ value, setValue }: IValue) {
    return (
        <>
            <div>
                <h2 className="text-lg font-semibold text-slate-900">Imagen <span className="text-red-500">*</span></h2>
                <p className="text-sm text-slate-500">Subí una imagen de la receta.</p>
            </div>
            <label
                htmlFor="imagen"
                className="border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer flex flex-col items-center justify-center gap-3 py-14 px-6"
            >
                <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center">
                    <Upload className="text-slate-500" />
                </div>
                <div className="text-center">
                    <p className="font-medium text-slate-700">{value ? value.name : "Subir imagen"}</p>
                    <p className="text-sm text-slate-400 mt-1">JPG, PNG · máx. 5MB</p>
                </div>
                <input
                    id="imagen"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setValue(e.target.files?.[0] ?? null)}
                />
            </label>
        </>
    )
}