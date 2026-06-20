import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminContentHeader from "@/features/dashboard/admin/components/AdminContentHeader";

describe("AdminContentHeader", () => {
    it("renderiza el input de búsqueda", () => {
        render(<AdminContentHeader onSearch={jest.fn()} />);
        expect(screen.getByPlaceholderText("Buscar por nombre...")).toBeInTheDocument();
    });

    it("llama a onSearch con el valor al presionar Enter", async () => {
        const user = userEvent.setup();
        const onSearch = jest.fn();
        render(<AdminContentHeader onSearch={onSearch} />);

        await user.type(screen.getByPlaceholderText("Buscar por nombre..."), "Tomate{enter}");

        expect(onSearch).toHaveBeenCalledWith("Tomate");
    });

    it("no llama a onSearch mientras se escribe sin presionar Enter", async () => {
        const user = userEvent.setup();
        const onSearch = jest.fn();
        render(<AdminContentHeader onSearch={onSearch} />);

        await user.type(screen.getByPlaceholderText("Buscar por nombre..."), "Tomate");

        expect(onSearch).not.toHaveBeenCalled();
    });

    it("renderiza el actionButton si se pasa", () => {
        render(<AdminContentHeader onSearch={jest.fn()} actionButton={<button>Acción</button>} />);
        expect(screen.getByRole("button", { name: "Acción" })).toBeInTheDocument();
    });

    it("no renderiza ningún botón si no se pasa actionButton", () => {
        render(<AdminContentHeader onSearch={jest.fn()} />);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });
});