import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegisterForm from "@/features/auth/register/components/RegisterForm";
import { useRegisterForm } from "@/features/auth/register/hooks/useRegisterForm";
import { useRegisterValidation } from "@/features/auth/register/hooks/useRegisterValidation";

jest.mock("@/features/auth/register/hooks/useRegisterForm");
jest.mock("@/features/auth/register/hooks/useRegisterValidation");
jest.mock("next/navigation", () => ({ useRouter: () => ({ push: jest.fn() }) }));
jest.mock("next/link", () => ({ __esModule: true, default: ({ children, href }: { children: React.ReactNode, href: string }) => <a href={href}>{children}</a> }));

const mockHandleSubmit = jest.fn();
const mockUseRegisterForm = useRegisterForm as jest.Mock;
const mockUseRegisterValidation = useRegisterValidation as jest.Mock;

const defaultForm = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    serverError: null,
    setNombre: jest.fn(),
    setEmail: jest.fn(),
    setPassword: jest.fn(),
    setConfirmPassword: jest.fn(),
    handleSubmit: mockHandleSubmit,
};

const defaultValidation = {
    errors: { name: null, email: null, password: null, confirmPassword: null },
    validateEmail: jest.fn(),
    validatePassword: jest.fn(),
    validateConfirmPassword: jest.fn(),
    validateNombre: jest.fn(),
};

describe("RegisterForm", () => {
    beforeEach(() => {
        mockUseRegisterForm.mockReturnValue(defaultForm);
        mockUseRegisterValidation.mockReturnValue(defaultValidation);
    });

    afterEach(() => jest.clearAllMocks());

    it("renderiza el título", () => {
        render(<RegisterForm />);
        expect(screen.getByText("Creá tu cuenta")).toBeInTheDocument();
    });

    it("renderiza todos los campos del formulario", () => {
        render(<RegisterForm />);
        expect(screen.getByLabelText(/Nombre completo/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
        expect(screen.getByLabelText(/^Contraseña/)).toBeInTheDocument();
        expect(screen.getByLabelText(/Confirmar contraseña/)).toBeInTheDocument();
    });

    it("renderiza el botón de submit", () => {
        render(<RegisterForm />);
        expect(screen.getByRole("button", { name: /crear cuenta/i })).toBeInTheDocument();
    });

    it("el botón está deshabilitado si los campos están vacíos", () => {
        render(<RegisterForm />);
        expect(screen.getByRole("button", { name: /crear cuenta/i })).toBeDisabled();
    });

    it("el botón está habilitado si todos los campos están completos y sin errores", () => {
        mockUseRegisterForm.mockReturnValue({
            ...defaultForm,
            name: "Elena",
            email: "elena@test.com",
            password: "12345678",
            confirmPassword: "12345678",
        });

        render(<RegisterForm />);
        expect(screen.getByRole("button", { name: /crear cuenta/i })).not.toBeDisabled();
    });

    it("el botón está deshabilitado si hay errores de validación", () => {
        mockUseRegisterForm.mockReturnValue({
            ...defaultForm,
            name: "Elena",
            email: "elena@test.com",
            password: "12345678",
            confirmPassword: "12345678",
        });
        mockUseRegisterValidation.mockReturnValue({
            ...defaultValidation,
            errors: { name: null, email: "Email inválido", password: null, confirmPassword: null },
        });

        render(<RegisterForm />);
        expect(screen.getByRole("button", { name: /crear cuenta/i })).toBeDisabled();
    });

    it("muestra el error del servidor si existe", () => {
        mockUseRegisterForm.mockReturnValue({
            ...defaultForm,
            serverError: "El email ya está registrado",
        });

        render(<RegisterForm />);
        expect(screen.getByText("El email ya está registrado")).toBeInTheDocument();
    });

    it("no muestra el error del servidor si no existe", () => {
        render(<RegisterForm />);
        expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    });

    it("llama a handleSubmit al enviar el formulario", () => {
        mockUseRegisterForm.mockReturnValue({
            ...defaultForm,
            name: "Elena",
            email: "elena@test.com",
            password: "12345678",
            confirmPassword: "12345678",
        });

        render(<RegisterForm />);
        fireEvent.submit(screen.getByRole("button", { name: /crear cuenta/i }).closest("form")!);

        expect(mockHandleSubmit).toHaveBeenCalled();
    });

    it("renderiza el link de inicio de sesión", () => {
        render(<RegisterForm />);
        expect(screen.getByText("Iniciá sesión")).toBeInTheDocument();
        expect(screen.getByRole("link", { name: "Iniciá sesión" })).toHaveAttribute("href", "/login");
    });
});