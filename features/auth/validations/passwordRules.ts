export const passwordRules = [
    { test: (value: string) => !value, message: "La contraseña es requerida" },
    { test: (value: string) => value.length < 8, message: 'La contraseña debe tener al menos 8 caracteres' },
];