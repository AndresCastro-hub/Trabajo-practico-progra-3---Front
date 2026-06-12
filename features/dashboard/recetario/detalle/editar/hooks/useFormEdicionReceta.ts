"use client";
import { useEffect, useState } from "react";
import { IFormEdicion, IngredienteRow } from "../../../nueva/types/receta.types";
import useRecetaDetail from "../../hooks/useRecetaDetail";
import { editarReceta } from "../services/EditRecipe";

export default function useFormEdicionReceta(id: string){
    const [form, setForm] = useState<IFormEdicion>({
        tiempoDePreparacion: 0,
        descripcion: '',
        ingredientes: [],
        ingredientesAgregados: [],
        ingredientesEliminados: []
    })

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
    }

    const setDescripcion = (descripcion: string) => {
        setForm((prev) => ({
            ...prev,
            descripcion
        }))
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
                { ingrediente: null, cantidad: "" }
            ],
        }))
    }

    const eliminarIngrediente = (index: number) => {
        setForm((prev) => {
        const ingredienteAEliminar = prev.ingredientes[index]

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
                    ? { ...item, [field]: value }
                    : item
            )
        }))
    }

    const handleEdicion = async () =>{
        const data = mapFormToRecetaEditarDto(form)
        await editarReceta(id, data)
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
        handleEdicion
    }
}