const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const emailRules = [
    { test: (value: string) => !value, message: "El email es requerido" },
    { test: (value: string) => !emailRegex.test(value), message: "El formato de email es inválido" },
];