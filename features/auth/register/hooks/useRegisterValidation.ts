import { validate } from "@/lib/utils/validate";
import { useState } from "react";
import { emailRules } from "../../validations/emailRules";
import { passwordRules } from "../../validations/passwordRules";
import { nombreRules } from "../validations/nombreRules";
import { confirmPasswordRules } from "../validations/confirmPasswordRules";

type IFormErros = {
    name: string | null
    email: string | null
    password: string | null
    confirmPassword: string | null
}

export function useRegisterValidation(email: string, password: string, name: string, confirmPassword: string) {
    const [errors, setErrors] = useState<IFormErros>({ email: null, password: null, name: null, confirmPassword: null });

    const validateEmail = (value: string = email) => {
        setErrors((prev) => ({ ...prev, email: validate(value, emailRules) }));
    };

    const validatePassword = (value: string = password) => {
        setErrors((prev) => ({ ...prev, password: validate(value, passwordRules) }));
    };

    const validateNombre = (value: string = name) => {
        setErrors((prev) => ({ ...prev, name: validate(value, nombreRules) }));
    };

    const validateConfirmPassword = (value: string = confirmPassword) => {
        setErrors((prev) => ({ ...prev, confirmPassword: validate(value, confirmPasswordRules(password)) }));
    };

    return { errors, validateEmail, validatePassword, validateNombre, validateConfirmPassword };
}