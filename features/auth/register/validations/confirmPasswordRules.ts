export const confirmPasswordRules = (password: string) => [
    { test: (value: string) => value !== password, message: "El valor ingresado no coincide con la contraseña" },
];