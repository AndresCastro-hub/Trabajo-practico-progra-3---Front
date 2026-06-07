"use client";
import { useEffect, useState } from "react";
import { IFormEdicion, IngredienteRow } from "../../../nueva/types/receta.types";
import useRecetaDetail from "../../hooks/useRecetaDetail";

export default function useFormEdicionReceta(id: string){
    const [form, setForm] = useState<IFormEdicion>({
        tiempoDePreparacion: 0,
        descripcion: '',
        ingredientes: []
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
            }))
        })
    }, [receta])


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
        return{
            tiempoDePreparacion: form.tiempoDePreparacion,
            descripcion: form.descripcion,
            ingredientes: form.ingredientes
        }
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
        ingredientes
    }
}