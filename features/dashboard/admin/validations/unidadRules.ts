const unidadesValidas = [
    "g",
    "ml",
    "unidades"
]

export const unidadRules = [
    { test: (value: string) => !value, message: "La unidad es obligatoria" },
    { test: (value: string) => !unidadesValidas.includes(value), message: "La unidad no es válida" }
];