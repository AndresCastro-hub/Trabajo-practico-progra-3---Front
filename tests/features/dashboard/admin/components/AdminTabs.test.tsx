import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminTabs from "@/features/dashboard/admin/components/AdminTabs";

jest.mock("@/features/dashboard/admin/components/ingredientes/IngredientesTab", () => {
    function MockIngredientesTab() { return <div>Contenido de Ingredientes</div>; }
    return MockIngredientesTab;
});

jest.mock("@/features/dashboard/admin/components/recetas/RecetasTab", () => {
    function MockRecetasTab() { return <div>Contenido de Recetas</div>; }
    return MockRecetasTab;
});

jest.mock("@/features/dashboard/admin/components/usuarios/UsuariosTab", () => {
    function MockUsuariosTab() { return <div>Contenido de Usuarios</div>; }
    return MockUsuariosTab;
});

describe("AdminTabs", () => {
    it("renderiza las tres pestañas", () => {
        render(<AdminTabs />);
        expect(screen.getByRole("tab", { name: /recetas globales/i })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: /ingredientes/i })).toBeInTheDocument();
        expect(screen.getByRole("tab", { name: /usuarios/i })).toBeInTheDocument();
    });

    it("muestra el contenido de recetas globales por defecto", () => {
        render(<AdminTabs />);
        expect(screen.getByText("Contenido de Recetas")).toBeInTheDocument();
    });

    it("cambia a ingredientes al hacer click en la pestaña", async () => {
        const user = userEvent.setup();
        render(<AdminTabs />);

        await user.click(screen.getByRole("tab", { name: /ingredientes/i }));

        expect(screen.getByText("Contenido de Ingredientes")).toBeInTheDocument();
    });

    it("cambia a usuarios al hacer click en la pestaña", async () => {
        const user = userEvent.setup();
        render(<AdminTabs />);

        await user.click(screen.getByRole("tab", { name: /usuarios/i }));

        expect(screen.getByText("Contenido de Usuarios")).toBeInTheDocument();
    });
});