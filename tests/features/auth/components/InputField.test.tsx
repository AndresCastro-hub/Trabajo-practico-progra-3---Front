import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import InputField from "@/features/auth/components/InputField";

const defaultProps = {
    id: "email",
    label: "Email",
    type: "email" as const,
    placeholder: "elena@ejemplo.com",
    value: "",
    onChange: jest.fn(),
    icon: <span>icon</span>,
    autoComplete: "email",
    error: null,
    validate: jest.fn(),
};

describe("InputField", () => {
    afterEach(() => jest.clearAllMocks());

    it("renderiza el label correctamente", () => {
        render(<InputField {...defaultProps} />);
        expect(screen.getByLabelText("Email")).toBeInTheDocument();
    });

    it("renderiza el placeholder", () => {
        render(<InputField {...defaultProps} />);
        expect(screen.getByPlaceholderText("elena@ejemplo.com")).toBeInTheDocument();
    });

    it("muestra el valor actual", () => {
        render(<InputField {...defaultProps} value="test@test.com" />);
        expect(screen.getByDisplayValue("test@test.com")).toBeInTheDocument();
    });

    it("llama a onChange al escribir", () => {
        const mockOnChange = jest.fn();
        render(<InputField {...defaultProps} onChange={mockOnChange} />);

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "nuevo@test.com" } });

        expect(mockOnChange).toHaveBeenCalledWith("nuevo@test.com");
    });

    it("llama a validate al perder el foco", () => {
        const mockValidate = jest.fn();
        render(<InputField {...defaultProps} validate={mockValidate} />);

        fireEvent.blur(screen.getByRole("textbox"));

        expect(mockValidate).toHaveBeenCalled();
    });

    it("llama a validate al escribir si hay error", () => {
        const mockValidate = jest.fn();
        render(<InputField {...defaultProps} error="Email inválido" validate={mockValidate} />);

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "test" } });

        expect(mockValidate).toHaveBeenCalledWith("test");
    });

    it("muestra el mensaje de error si existe", () => {
        render(<InputField {...defaultProps} error="Campo requerido" />);
        expect(screen.getByText("Campo requerido")).toBeInTheDocument();
    });

    it("no muestra error si no existe", () => {
        render(<InputField {...defaultProps} />);
        expect(screen.queryByRole("paragraph")).not.toBeInTheDocument();
    });

    it("aplica clase de error si hay error", () => {
        render(<InputField {...defaultProps} error="Error" />);
        expect(screen.getByRole("textbox")).toHaveClass("border-red-500");
    });

    describe("campo de contraseña", () => {
        const passwordProps = {
            ...defaultProps,
            id: "password",
            label: "Contraseña",
            type: "password" as const,
            autoComplete: "current-password",
        };

        it("renderiza el botón de mostrar contraseña", () => {
            render(<InputField {...passwordProps} />);
            expect(screen.getByRole("button", { name: /ver contraseña/i })).toBeInTheDocument();
        });

        it("el input es de tipo password por defecto", () => {
            render(<InputField {...passwordProps} />);
            expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "password");
        });

        it("muestra la contraseña al clickear el botón", () => {
            render(<InputField {...passwordProps} />);

            fireEvent.click(screen.getByRole("button", { name: /ver contraseña/i }));

            expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "text");
        });

        it("oculta la contraseña al clickear el botón dos veces", () => {
            render(<InputField {...passwordProps} />);

            fireEvent.click(screen.getByRole("button", { name: /ver contraseña/i }));
            fireEvent.click(screen.getByRole("button", { name: /ver contraseña/i }));

            expect(screen.getByLabelText("Contraseña")).toHaveAttribute("type", "password");
        });
    });
});