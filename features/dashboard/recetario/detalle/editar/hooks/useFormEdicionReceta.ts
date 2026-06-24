"use client";
import { useEffect, useRef, useState } from "react";
import { IFormEdicion, IngredienteRow } from "../../../nueva/types/receta.types";
import useRecetaDetail from "../../hooks/useRecetaDetail";
import { editarReceta } from "../services/EditRecipe";
import { INestError } from "@/interface/apiResponse";
import { useRouter } from "next/navigation";
import { TipoNotificacion, useNotificacion } from "@/context/NotificacionContext";

export default function useFormEdicionReceta(id: string) {

    const { mostrarNotificacion } = useNotificacion()

    const [form, setForm] = useState<IFormEdicion>({
        tiempoDePreparacion: 0,
        descripcion: '',
        ingredientes: [],
        ingredientesAgregados: [],
        ingredientesEliminados: []
    })

    const [puedeEditar, setPuedeEditar] = useState<boolean>()
    const [loading, setLoading] = useState<boolean>(false)
    const router = useRouter()

    const ingredientesIniciales = useRef<IngredienteRow[]>([])
    const { receta } = useRecetaDetail(id)

    useEffect(() => {
        if (!receta) return

        ingredientesIniciales.current = receta.ingredientes.map((i) => ({
            ingrediente: i.ingrediente,
            cantidad: i.cantidad
        }))

        setForm({
            tiempoDePreparacion: receta.tiempoPreparacion ?? 0,
            descripcion: receta.descripcion ?? '',
            ingredientes: receta.ingredientes.map((i) => ({
                ingrediente: i.ingrediente,
                cantidad: i.cantidad
            })),
            ingredientesAgregados: undefined,
            ingredientesEliminados: undefined,
            ingredientesActualizados: undefined
        })
    }, [receta])

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

    const mapFormToRecetaEditarDto = (form: IFormEdicion) => {
        const ingredientesNuevos = form.ingredientes
            .filter((i) =>
                i.ingrediente?.id && !ingredientesIniciales.current.some(
                    (inicial) => inicial.ingrediente?.id === i.ingrediente?.id
                )
            )
            .map((i) => ({
                ingrediente_id: i.ingrediente!.id,
                cantidad: Number(i.cantidad)
            }))

        const ingredientesActualizar = form.ingredientes
            .filter((i) => {
                const inicial = ingredientesIniciales.current.find(
                    (ini) => ini.ingrediente?.id === i.ingrediente?.id
                )
                return inicial && inicial.cantidad !== i.cantidad
            })
            .map((i) => ({
                ingrediente_id: i.ingrediente!.id,
                cantidad: Number(i.cantidad)
            }))

        const dto = {
            description: form.descripcion,
            prepTime: form.tiempoDePreparacion,
            deletedIngredientsId: form.ingredientesEliminados,
            addedIngredients: ingredientesNuevos,
            updatedIngredients: ingredientesActualizar
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
                    ? [...(prev.ingredientesEliminados ?? []), ingredienteAEliminar.ingrediente.id]
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

    const handleEdicion = async () => {
        setLoading(true)

        try {
            const data = mapFormToRecetaEditarDto(form)
            await editarReceta(id, data)
            mostrarNotificacion("Receta editada correctamente.", TipoNotificacion.SUCCESS)
        } catch (e) {
            const apiError = e as INestError
            const mensaje = Array.isArray(apiError.message)
                ? apiError.message.join(", ")
                : apiError.message ?? "Error inesperado"
            mostrarNotificacion(mensaje, TipoNotificacion.ERROR)

        } finally {
            setLoading(false)
            router.back()
        }
    }

    const { tiempoDePreparacion, descripcion, ingredientes } = form

    return {
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
    }
}