import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "@/features/auth/login/components/LoginForm";
import { useLoginForm } from "@/features/auth/login/hooks/useLoginForms";
import { useLoginValidation } from "@/features/auth/login/hooks/useLoginValidation";

jest.mock("@/features/auth/login/hooks/useLoginForms");
jest.mock("@/features/auth/login/hooks/useLoginValidation");
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("next/link", () => ({
    __esModule: true,
    default: ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
    ),
}));

const mockHandleSubmit = jest.fn();
const mockUseLoginForm = useLoginForm as jest.Mock;
const mockUseLoginValidation = useLoginValidation as jest.Mock;

const defaultForm = {
    email: "",
    password: "",
    serverError: null,
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    handleSubmit: mockHandleSubmit,
};

const defaultValidation = {
    errors: { email: null, password: null },
    validateEmail: jest.fn(),
    validatePassword: jest.fn(),
};

describe("LoginForm", () => {
    beforeEach(() => {
        mockUseLoginForm.mockReturnValue(defaultForm);
        mockUseLoginValidation.mockReturnValue(defaultValidation);
    });

    afterEach(() => jest.clearAllMocks());

    it("renderiza el título y subtítulo", () => {
        render(<LoginForm />);
        expect(screen.getByText("Bienvenido de nuevo")).toBeInTheDocument();
        expect(screen.getByText(/Iniciá sesión para continuar/)).toBeInTheDocument();
    });

    it("renderiza los campos de email y contraseña", () => {
        render(<LoginForm />);
        expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Contraseña/)).toBeInTheDocument();
    });

    it("renderiza el botón de submit", () => {
        render(<LoginForm />);
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeInTheDocument();
    });

    it("el botón está deshabilitado si los campos están vacíos", () => {
        render(<LoginForm />);
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeDisabled();
    });

    it("el botón está habilitado si los campos están completos y sin errores", () => {
        mockUseLoginForm.mockReturnValue({
            ...defaultForm,
            email: "elena@test.com",
            password: "12345678",
        });

        render(<LoginForm />);
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).not.toBeDisabled();
    });

    it("el botón está deshabilitado si hay errores de validación", () => {
        mockUseLoginForm.mockReturnValue({
            ...defaultForm,
            email: "elena@test.com",
            password: "12345678",
        });
        mockUseLoginValidation.mockReturnValue({
            ...defaultValidation,
            errors: { email: "Email inválido", password: null },
        });

        render(<LoginForm />);
        expect(screen.getByRole("button", { name: /iniciar sesión/i })).toBeDisabled();
    });

    it("muestra el error del servidor si existe", () => {
        mockUseLoginForm.mockReturnValue({
            ...defaultForm,
            serverError: "Credenciales incorrectas",
        });

        render(<LoginForm />);
        expect(screen.getByText("Credenciales incorrectas")).toBeInTheDocument();
    });

    it("no muestra el error del servidor si no existe", () => {
        render(<LoginForm />);
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("llama a handleSubmit al enviar el formulario", () => {
        mockUseLoginForm.mockReturnValue({
            ...defaultForm,
            email: "elena@test.com",
            password: "12345678",
        });

        render(<LoginForm />);
        fireEvent.submit(
            screen.getByRole("button", { name: /iniciar sesión/i }).closest("form")!
        );

        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it("renderiza el link de registro", () => {
        render(<LoginForm />);
        expect(screen.getByText("Registrate gratis")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Registrate gratis" })).toHaveAttribute(
            "href",
            "/register"
        );
    });
});