import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Nombre from "@/features/dashboard/recetario/nueva/components/Form/Nombre";

describe("Nombre", () => {
    it("renderiza el label y el input", () => {
        render(<Nombre value="" />);

        expect(screen.getByLabelText(/Nombre/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("Ej: Milanesa napolitana")).toBeInTheDocument();
    });

    it("muestra el valor actual", () => {
        render(<Nombre value="Milanesa" />);

        expect(screen.getByDisplayValue("Milanesa")).toBeInTheDocument();
    });

    it("llama a setValue al cambiar el texto", () => {
        const mockSetValue = jest.fn();
        render(<Nombre value="" setValue={mockSetValue} />);

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Pasta" } });

        expect(mockSetValue).toHaveBeenCalledWith("Pasta");
    });

    it("no llama a setValue si no se pasa", () => {
        render(<Nombre value="" />);

        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Pasta" } });
    });

    it("el input está deshabilitado si isDisabled es true", () => {
        render(<Nombre value="" isDisabled={true} />);

        expect(screen.getByRole("textbox")).toBeDisabled();
    });

    it("el input está habilitado si isDisabled es false", () => {
        render(<Nombre value="" isDisabled={false} />);

        expect(screen.getByRole("textbox")).not.toBeDisabled();
    });
});