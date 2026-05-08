export type ValidationRule = {
    test: (value: string) => boolean;
    message: string;
};

export const validate = (value: string, rules: ValidationRule[]): string => {
    const failedRule = rules.find((rule) => rule.test(value));
    return failedRule?.message ?? "";
};

export const contieneErrores = <T extends Record<string, string | null>>(errors: T): boolean => {
    return Object.values(errors).some((error) => error !== null && error !== "");
};


export const camposCompletos = (fields: Record<string, string>): boolean => {
    return Object.values(fields).every((value) => value.trim() !== "");
};