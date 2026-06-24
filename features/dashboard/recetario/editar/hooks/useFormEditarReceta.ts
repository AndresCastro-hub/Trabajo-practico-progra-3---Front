import { useCallback, useEffect, useRef, useState } from "react"
import { IEditarRecetaDTO, IForm, IngredientDto, IngredienteRow } from "../types/editar.types"
import { INestError } from "@/interface/apiResponse"
import { initialFetch } from "../service/initialFetch"
import { editarReceta } from "../service/editarRecetaService"
import { TipoNotificacion, useNotificacion } from "@/context/NotificacionContext"

export default function useFormEditarReceta(id: string) {
    const INITIAL_FORM: IForm = {
        nombre: '',
        tiempoPreparacion: 0,
        descripcion: '',
        ingredientes: [{ ingrediente: null, cantidad: "" }],
        imagen_url: ''
    };
    const { mostrarNotificacion } = useNotificacion()


    const recetaOriginal = useRef<IForm>(INITIAL_FORM);

    const [form, setForm] = useState<IForm>(INITIAL_FORM);
    const [loading, setLoading] = useState<boolean>(false);

    const fetchReceta = useCallback(async () => {
        setLoading(true);
        try {
            const data = await initialFetch(id);
            setForm(data);
            recetaOriginal.current = data;
        } catch (err: unknown) {
            const mensaje = err instanceof Error ? err.message : "Error al cargar la receta"
            mostrarNotificacion(mensaje, TipoNotificacion.ERROR)

        } finally {
            setLoading(false);
        }
    }, [id, mostrarNotificacion]);

    useEffect(() => {
        fetchReceta();
    }, [fetchReceta]);

    const setTiempoDePreparacion = (tiempoPreparacion: number) => {
        setForm((prev) => ({
            ...prev,
            tiempoPreparacion
        }));
    }

    const setDescripcion = (descripcion: string) => {
        setForm((prev) => ({
            ...prev,
            descripcion
        }));
    }

    const agregarIngrediente = () => {
        setForm((prev) => ({
            ...prev,
            ingredientes: [
                { ingrediente: null, cantidad: "" },
                ...prev.ingredientes,
            ]
        }));
    }

    const eliminarIngrediente = (index: number) => {
        setForm((prev) => ({
            ...prev,
            ingredientes: prev.ingredientes.filter((_, i) => i !== index)
        }));
    }

    const actualizarIngrediente = <K extends keyof IngredienteRow>(index: number, field: K, value: IngredienteRow[K]) => {
        setForm((prev) => ({
            ...prev,
            ingredientes: prev.ingredientes.map((item, i) =>
                i === index
                    ? { ...item, [field]: value }
                    : item
            )
        }));
    }

    const mapDatosFormToEditarRecetaDTO = (form: IForm): IEditarRecetaDTO => {
        const idsIngredientesEliminados: number[] = recetaOriginal.current.ingredientes.filter((ingredienteOriginal) => {
            if (!ingredienteOriginal.ingrediente) return false;
            return !form.ingredientes.some((i) => (i.ingrediente?.id === ingredienteOriginal.ingrediente!.id));
        })
            .map((ingredienteEliminado) => ingredienteEliminado.ingrediente!.id);

        const ingredientesNuevos: IngredientDto[] = form.ingredientes.filter((ingredienteDelForm) => {
            if (!ingredienteDelForm.ingrediente) return false;
            return !recetaOriginal.current.ingredientes.some((ingredienteOriginal) => ingredienteOriginal.ingrediente?.id === ingredienteDelForm.ingrediente?.id);
        })
            .map((ingredienteNuevo) => ({
                ingrediente_id: ingredienteNuevo.ingrediente!.id,
                cantidad: Number(ingredienteNuevo.cantidad)
            }));

        const ingredientesActualizar: IngredientDto[] = form.ingredientes.filter((ingredienteDelForm) => {
            if (!ingredienteDelForm.ingrediente) return false;
            return recetaOriginal.current.ingredientes.some((ingredienteOriginal) => {
                return (
                    ingredienteOriginal.ingrediente?.id === ingredienteDelForm.ingrediente?.id
                    && Number(ingredienteOriginal.cantidad) !== Number(ingredienteDelForm.cantidad)
                );
            });
        })
            .map((ingredientesAActualizar) => ({
                ingrediente_id: ingredientesAActualizar.ingrediente!.id,
                cantidad: Number(ingredientesAActualizar.cantidad)
            }))

        return {
            description: form.descripcion,
            prepTime: form.tiempoPreparacion,
            deletedIngredientsId: idsIngredientesEliminados,
            addedIngredients: ingredientesNuevos,
            updatedIngredients: ingredientesActualizar
        };
    }

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const payload = mapDatosFormToEditarRecetaDTO(form);
            await editarReceta(payload, id);
            mostrarNotificacion("Receta editada correctamente.", TipoNotificacion.SUCCESS)

        } catch (e) {
            const apiError = e as INestError;
            const mensaje = Array.isArray(apiError.message)
                ? apiError.message.join(", ")
                : apiError.message ?? "Error inesperado"
            mostrarNotificacion(mensaje, TipoNotificacion.ERROR)

        } finally {
            setLoading(false);
        }
    }

    const { nombre, tiempoPreparacion, descripcion, ingredientes, imagen_url } = form;

    const puedeEditarReceta = () => {

        const nombreValido = nombre.trim().length > 0;
        const tiempoValido = tiempoPreparacion > 0;
        const imagenValida = imagen_url !== '';

        const ingredientesValidos =
            ingredientes.length > 0 &&
            ingredientes.every((i) =>
                i.ingrediente !== null &&
                i.cantidad.trim() !== "" &&
                Number(i.cantidad) > 0
            );

        return (nombreValido && tiempoValido && imagenValida && ingredientesValidos);
    }

    return {
        nombre,
        tiempoPreparacion,
        descripcion,
        ingredientes,
        imagen_url,
        loading,
        puedeEditarReceta,
        agregarIngrediente,
        setDescripcion,
        setTiempoDePreparacion,
        eliminarIngrediente,
        actualizarIngrediente,
        handleSubmit
    };
}