import { validate } from "@/lib/utils/validate";
import { useState } from "react";
import { emailRules } from "../../validations/emailRules";
import { passwordRules } from "../../validations/passwordRules";

type IFormErros = {
    email: string | null
    password: string |  null
}

export function useLoginValidation(email: string, password: string) {
    const [errors, setErrors] = useState<IFormErros>({ email: null, password: null });

    const validateEmail = (value: string = email) => {
        setErrors((prev) => ({ ...prev, email: validate(value, emailRules) }));
    };

    const validatePassword = (value: string = password) => {
        setErrors((prev) => ({ ...prev, password: validate(value, passwordRules) }));
    };

    return { errors, validateEmail, validatePassword };
}