import { useState } from "react"
import { IForm, IngredienteRow } from "../types/receta.types"
import { CrearRecetaDTO } from "../types/receta.dto"
import { crearReceta, subirImagenReceta } from "../services/recetaService"
import { INestError } from "@/interface/apiResponse"

export default function useFormCreacionReceta() {

    const INITIAL_FORM: IForm = {
        nombre: '',
        tiempoDePreparacion: 0,
        descripcion: '',
        ingredientes: [{ ingrediente: null, cantidad: "" }],
        imagen: null
    }

    const [form, setForm] = useState<IForm>(INITIAL_FORM)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

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

    const actualizarIngrediente = <K extends keyof IngredienteRow>(index: number, field: K, value: IngredienteRow[K]) => {
        setForm((prev) => ({
            ...prev,
            ingredientes: prev.ingredientes.map((item, i) =>
                i === index
                    ? { ...item, [field]: value }
                    : item
            )
        }))
    }

    const resetForm = () => { setForm(INITIAL_FORM) }

    const handleSubmit = async () => {
        setLoading(true)
        setError(null)
        setSuccess(false)
        try {
            const payload = mapFormToRecetaDTO(form)
            const receta = await crearReceta(payload)
            if (imagen) {
                await subirImagenReceta(receta.id, imagen)
            }
            setSuccess(true)
            resetForm()
        } catch (e) {
            const apiError = e as INestError
            const mensaje = Array.isArray(apiError.message)
                ? apiError.message.join(", ")
                : apiError.message ?? "Error inesperado"
            setError(mensaje)
        }finally{
            setLoading(false)
        }
    }

    const mapFormToRecetaDTO = (form: IForm): CrearRecetaDTO => {
        return {
            nombre: form.nombre,
            descripcion: form.descripcion,
            tiempoPreparacion: form.tiempoDePreparacion,
            ingredientes: form.ingredientes.map((i) => ({
                ingrediente_id: i.ingrediente!.id,
                cantidad: Number(i.cantidad)
            }))
        }
    }

    const clearFeedback = () => {
        setError(null)
        setSuccess(false)
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
        error,
        success,
        loading,
        clearFeedback,
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