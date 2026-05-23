import { validate } from "@/lib/utils/validate";
import { useState } from "react";
import { nombreRules } from "../validations/nombreRules";
import { unidadRules } from "../validations/unidadRules";

type IFormErrors = {
    nombre: string | null
    unidad: string | null
}

export function useIngredientValidation(nombre: string, unidad: string) {
    const [errors, setErrors] = useState<IFormErrors>({ nombre: null, unidad: null });

    const validateNombre = (value: string = nombre) => {
        setErrors((prev) => ({ ...prev, nombre: validate(value, nombreRules) }));
    };

    const validateUnidad = (value: string = unidad) => {
        setErrors((prev) => ({ ...prev, unidad: validate(value, unidadRules) }));
    };

    return { errors, validateNombre, validateUnidad };
}