import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Imagen from "@/features/dashboard/recetario/nueva/components/Form/Imagen";

describe("Imagen", () => {
    it("renderiza el título y descripción", () => {
        render(<Imagen value={null} setValue={() => {}} />);

        expect(screen.getByText("Imagen")).toBeInTheDocument();
        expect(screen.getByText("Subí una imagen de la receta.")).toBeInTheDocument();
    });

    it("muestra 'Subir imagen' si no hay archivo", () => {
        render(<Imagen value={null} setValue={() => {}} />);

        expect(screen.getByText("Subir imagen")).toBeInTheDocument();
    });

    it("muestra el nombre del archivo si hay uno seleccionado", () => {
        const file = new File([""], "milanesa.jpg", { type: "image/jpeg" });
        render(<Imagen value={file} setValue={() => {}} />);

        expect(screen.getByText("milanesa.jpg")).toBeInTheDocument();
    });

    it("llama a setValue con el archivo seleccionado", () => {
        const mockSetValue = jest.fn();
        render(<Imagen value={null} setValue={mockSetValue} />);

        const file = new File([""], "milanesa.jpg", { type: "image/jpeg" });
        const input = document.querySelector("input[type='file']") as HTMLInputElement;

        fireEvent.change(input, { target: { files: [file] } });

        expect(mockSetValue).toHaveBeenCalledWith(file);
    });

    it("muestra error si el archivo supera los 10MB", () => {
        const mockSetValue = jest.fn();
        render(<Imagen value={null} setValue={mockSetValue} />);

        const bigFile = new File(["x".repeat(11 * 1024 * 1024)], "grande.jpg", { type: "image/jpeg" });
        const input = document.querySelector("input[type='file']") as HTMLInputElement;

        fireEvent.change(input, { target: { files: [bigFile] } });

        expect(screen.getByText("La imagen no puede superar los 10MB.")).toBeInTheDocument();
        expect(mockSetValue).not.toHaveBeenCalled();
    });

    it("llama a setValue con null si no hay archivo", () => {
        const mockSetValue = jest.fn();
        render(<Imagen value={null} setValue={mockSetValue} />);

        const input = document.querySelector("input[type='file']") as HTMLInputElement;
        fireEvent.change(input, { target: { files: [] } });

        expect(mockSetValue).toHaveBeenCalledWith(null);
    });
});