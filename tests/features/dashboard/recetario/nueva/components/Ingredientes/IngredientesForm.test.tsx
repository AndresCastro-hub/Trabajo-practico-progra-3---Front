import { render, screen, fireEvent } from "@testing-library/react";
import IngredientesForm from "@/features/dashboard/recetario/nueva/components/Ingredientes/IngredientesForm";
import { IngredienteRow } from "@/features/dashboard/recetario/nueva/types/receta.types";

jest.mock("@/features/dashboard/recetario/nueva/components/Ingredientes/SelectorIngrediente", () => ({
    SelectorIngrediente: ({ value, onChange }: { value: { nombre: string } | null, onChange: (ing: { id: number, nombre: string, unidad: string }) => void }) => (
        <div>
            <span>{value ? value.nombre : "Seleccionar ingrediente"}</span>
            <button onClick={() => onChange({ id: 1, nombre: "Carne", unidad: "g" })}>
                Seleccionar
            </button>
        </div>
    )
}));

const ingredienteMock: IngredienteRow[] = [
    { ingrediente: { id: 1, nombre: "Carne", unidad: "g" }, cantidad: "300" }
];

describe("IngredientesForm", () => {
    it("renderiza el título y el botón de agregar", () => {
        render(
            <IngredientesForm
                agregarIngrediente={() => {}}
                ingredientes={[]}
                eliminarIngrediente={() => {}}
                actualizarIngrediente={() => {}}
            />
        );

        expect(screen.getByText(/Ingredientes/)).toBeInTheDocument();
        expect(screen.getByText("Agregar ingrediente")).toBeInTheDocument();
    });

    it("llama a agregarIngrediente al clickear el botón", () => {
        const mockAgregar = jest.fn();
        render(
            <IngredientesForm
                agregarIngrediente={mockAgregar}
                ingredientes={[]}
                eliminarIngrediente={() => {}}
                actualizarIngrediente={() => {}}
            />
        );

        fireEvent.click(screen.getByText("Agregar ingrediente"));
        expect(mockAgregar).toHaveBeenCalled();
    });

    it("renderiza los ingredientes existentes", () => {
        render(
            <IngredientesForm
                agregarIngrediente={() => {}}
                ingredientes={ingredienteMock}
                eliminarIngrediente={() => {}}
                actualizarIngrediente={() => {}}
            />
        );

        expect(screen.getByDisplayValue("300")).toBeInTheDocument();
        expect(screen.getByText("Carne")).toBeInTheDocument();
    });

    it("llama a eliminarIngrediente al clickear el botón eliminar", () => {
        const mockEliminar = jest.fn();
        render(
            <IngredientesForm
                agregarIngrediente={() => {}}
                ingredientes={ingredienteMock}
                eliminarIngrediente={mockEliminar}
                actualizarIngrediente={() => {}}
            />
        );

        const botonesEliminar = screen.getAllByRole("button", { name: "" });
        fireEvent.click(botonesEliminar[botonesEliminar.length - 1]);

        expect(mockEliminar).toHaveBeenCalledWith(0);
    });

    it("llama a actualizarIngrediente al cambiar la cantidad", () => {
        const mockActualizar = jest.fn();
        render(
            <IngredientesForm
                agregarIngrediente={() => {}}
                ingredientes={ingredienteMock}
                eliminarIngrediente={() => {}}
                actualizarIngrediente={mockActualizar}
            />
        );

        fireEvent.change(screen.getByDisplayValue("300"), { target: { value: "500" } });

        expect(mockActualizar).toHaveBeenCalledWith(0, "cantidad", "500");
    });

    it("llama a actualizarIngrediente al seleccionar un ingrediente", () => {
        const mockActualizar = jest.fn();
        render(
            <IngredientesForm
                agregarIngrediente={() => {}}
                ingredientes={[{ ingrediente: null, cantidad: "" }]}
                eliminarIngrediente={() => {}}
                actualizarIngrediente={mockActualizar}
            />
        );

        fireEvent.click(screen.getByText("Seleccionar"));

        expect(mockActualizar).toHaveBeenCalledWith(0, "ingrediente", { id: 1, nombre: "Carne", unidad: "g" });
    });
});