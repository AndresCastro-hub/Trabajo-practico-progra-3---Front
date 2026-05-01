export type ValidationRule = {
    test: (value: string) => boolean;
    message: string;
};

export const validate = (value: string, rules: ValidationRule[]): string => {
    const failedRule = rules.find((rule) => rule.test(value));
    return failedRule?.message ?? "";
};