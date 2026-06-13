"use client";
import { useEffect, useState } from "react";
import { IFormEdicion, IngredienteRow } from "../../../nueva/types/receta.types";
import useRecetaDetail from "../../hooks/useRecetaDetail";
import { editarReceta } from "../services/EditRecipe";
import { INestError } from "@/interface/apiResponse";
import { useRouter } from "next/navigation";

export default function useFormEdicionReceta(id: string){
    const [form, setForm] = useState<IFormEdicion>({
        tiempoDePreparacion: 0,
        descripcion: '',
        ingredientes: [],
        ingredientesAgregados: [],
        ingredientesEliminados: []
    })

    const[puedeEditar, setPuedeEditar] = useState<boolean>()
    const[loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)
    const router = useRouter()

    const { receta } = useRecetaDetail(id)

    useEffect(() => {
        if (!receta) return

        setForm({
            tiempoDePreparacion: receta.tiempoPreparacion ?? 0,
            descripcion: receta.descripcion ?? '',
            ingredientes: receta.ingredientes.map((i) => ({
                ingrediente: i.ingrediente,
                cantidad: i.cantidad
            })),
            ingredientesAgregados: [],
            ingredientesEliminados: []
        })
    }, [receta])

    function setIngredientesIniciales(){
        if(!receta) return

        return receta.ingredientes.map((i) => ({
            ingrediente: i.ingrediente,
            cantidad: i.cantidad
        }))
    }

    const ingredientesIniciales = setIngredientesIniciales()

    const setTiempoDePreparacion = (tiempoDePreparacion: number) => {
        setForm((prev) => ({
            ...prev,
            tiempoDePreparacion
        }))
        setPuedeEditar(true)
    }

    const setDescripcion = (descripcion: string) => {
        setForm((prev) => ({
            ...prev,
            descripcion
        }))
        setPuedeEditar(true)
    }

    const mapFormToRecetaEditarDto = (form: IFormEdicion) =>{
        const ingredientesNuevos = form.ingredientes
        .filter((i) =>
            i.ingrediente?.id &&
            !ingredientesIniciales?.some(
                (inicial) => inicial.ingrediente.id === i.ingrediente?.id
            )
        )
        .map((i) => ({
            ingrediente_id: i.ingrediente!.id,
            cantidad: Number(i.cantidad)
        }))

        const dto = {
            description: form.descripcion,
            prepTime: form.tiempoDePreparacion,
            deletedIngredientsId: form.ingredientesEliminados,
            addedIngredients: ingredientesNuevos,
        }
        return dto
    }

    const agregarIngrediente = () => {
        setForm((prev) => ({
            ...prev,
            ingredientes: [
                ...prev.ingredientes,
                { ingrediente: null, cantidad: "" },
            ],
        }))
    }

    const eliminarIngrediente = (index: number) => {
        setForm((prev) => {
        const ingredienteAEliminar = prev.ingredientes[index]
        setPuedeEditar(true)
        return {
            ...prev,
            ingredientes: prev.ingredientes.filter((_, i) => i !== index),
            ingredientesEliminados: ingredienteAEliminar.ingrediente?.id
                ? [...prev.ingredientesEliminados, ingredienteAEliminar.ingrediente.id]
                : prev.ingredientesEliminados
        }
    })
    }

    const actualizarIngrediente = <K extends keyof IngredienteRow>(index: number, field: K, value: IngredienteRow[K]) => {
        setForm((prev) => ({
            ...prev,
            ingredientes: prev.ingredientes.map((item, i) =>
                i === index
                    ? (setPuedeEditar(true), { ...item, [field]: value })
                    : item
            )
        }))
    }

    const handleEdicion = async () =>{
        setLoading(true)
        setSuccess(false)
        setError(null)

        try{
            const data = mapFormToRecetaEditarDto(form)
            await editarReceta(id, data)
            setSuccess(true)
        }catch(e){
            const apiError = e as INestError
            const mensaje = Array.isArray(apiError.message)
                ? apiError.message.join(", ")
                : apiError.message ?? "Error inesperado"
            setError(mensaje)
        }finally{
            setLoading(false)
            router.back()
        }
    }

    const clearFeedback = () => {
        setError(null)
        setSuccess(false)
    }

    const {tiempoDePreparacion, descripcion, ingredientes} = form

    return{
        tiempoDePreparacion,
        descripcion,
        setDescripcion,
        setTiempoDePreparacion,
        agregarIngrediente,
        eliminarIngrediente,
        actualizarIngrediente,
        mapFormToRecetaEditarDto,
        ingredientes,
        handleEdicion,
        puedeEditar,
        loading,
        error,
        success,
        clearFeedback
    }
}