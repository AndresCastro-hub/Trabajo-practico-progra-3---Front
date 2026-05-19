import { useState } from "react"


//Sacar estas interface a un archivos de interface
interface IForm {
    nombre: string
    tiempoDePreparacion: number
    descripcion: string
    ingredientes: IngredienteRow[]
    imagen: File | null
}

interface Ingrediente {
    id: number
    nombre: string
    unidad: string
}

export interface IngredienteRow {
    ingrediente: Ingrediente | null
    cantidad: string
}

export default function useFormCreacionReceta() {

    const [form, setForm] = useState<IForm>({
        nombre: '',
        tiempoDePreparacion: 0,
        descripcion: '',
        ingredientes: [{ ingrediente: null, cantidad: "" }],
        imagen: null
    })

    const setTiempoDePreparacion = (tiempoDePreparacion: number) => {
        setForm((prev) => ({
            ...prev,
            tiempoDePreparacion
        }))
    }

    const setDescripcion = (descripcion: string) => {
        setForm((prev) => ({
            ...prev,
            descripcion
        }))
    }

    const setNombre = (nombre: string) => {
        setForm((prev) => ({
            ...prev,
            nombre
        }))
    }

    const setImagen = (imagen: File | null) => {
        setForm((prev) => ({
            ...prev,
            imagen
        }))
    }

    const agregarIngrediente = () => {
        setForm((prev) => ({
            ...prev,
            ingredientes: [
                ...prev.ingredientes,
                { ingrediente: null, cantidad: "" }
            ]
        }))
    }

    const eliminarIngrediente = (index: number) => {
        setForm((prev) => ({
            ...prev,
            ingredientes: prev.ingredientes.filter((_, i) => i !== index)
        }))
    }

    const actualizarIngrediente = <K extends keyof IngredienteRow>( index: number, field: K, value: IngredienteRow[K]) => {
        setForm((prev) => ({
            ...prev,
            ingredientes: prev.ingredientes.map((item, i) =>
                i === index
                    ? { ...item, [field]: value }
                    : item
            )
        }))
    }

    const handleSubmit = () => {
       
    }

    const puedeCrearReceta = () => {

        const nombreValido = nombre.trim().length > 0
        const tiempoValido = tiempoDePreparacion > 0
        const imagenValida = imagen !== null

        const ingredientesValidos =
            ingredientes.length > 0 &&
            ingredientes.every((i) =>
                i.ingrediente !== null &&
                i.cantidad.trim() !== "" &&
                Number(i.cantidad) > 0
            )

        return (nombreValido && tiempoValido && imagenValida && ingredientesValidos)
    }
    const { nombre, tiempoDePreparacion, descripcion, ingredientes, imagen } = form

    return {
        nombre,
        tiempoDePreparacion,
        descripcion,
        ingredientes,
        imagen,
        puedeCrearReceta,
        setImagen,
        agregarIngrediente,
        setDescripcion,
        setNombre,
        setTiempoDePreparacion,
        eliminarIngrediente,
        actualizarIngrediente,
        handleSubmit
    }
}