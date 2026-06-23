import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TiempoDePreparacion from "@/features/dashboard/recetario/nueva/components/Form/TiempoDePreparacion";

describe("TiempoDePreparacion", () => {
    it("renderiza el label y el input", () => {
        render(<TiempoDePreparacion value={0} setValue={() => {}} />);

        expect(screen.getByLabelText(/Tiempo de preparación/)).toBeInTheDocument();
        expect(screen.getByPlaceholderText("30")).toBeInTheDocument();
    });

    it("muestra vacío si el valor es 0", () => {
        render(<TiempoDePreparacion value={0} setValue={() => {}} />);

        expect(screen.getByRole("spinbutton")).toHaveValue(null);
    });

    it("muestra el valor actual si es distinto de 0", () => {
        render(<TiempoDePreparacion value={30} setValue={() => {}} />);

        expect(screen.getByRole("spinbutton")).toHaveValue(30);
    });

    it("llama a setValue con el número al cambiar", () => {
        const mockSetValue = jest.fn();
        render(<TiempoDePreparacion value={0} setValue={mockSetValue} />);

        fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "45" } });

        expect(mockSetValue).toHaveBeenCalledWith(45);
    });

    it("llama a setValue con 0 si se borra el valor", () => {
        const mockSetValue = jest.fn();
        render(<TiempoDePreparacion value={30} setValue={mockSetValue} />);

        fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "" } });

        expect(mockSetValue).toHaveBeenCalledWith(0);
    });
});