import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AsignarRecetaTabs } from "@/features/dashboard/calendario/components/AsignarRecetaTabs";

describe("AsignarRecetaTabs", () => {
    it("renderiza ambas pestañas", () => {
        render(<AsignarRecetaTabs activeTab="plataforma" handleTabChange={jest.fn()} />);
        expect(screen.getByText("Plataforma")).toBeInTheDocument();
        expect(screen.getByText("Mis Recetas")).toBeInTheDocument();
    });

    it("llama a handleTabChange con 'plataforma'", async () => {
        const user = userEvent.setup();
        const handleTabChange = jest.fn();
        render(<AsignarRecetaTabs activeTab="mis-recetas" handleTabChange={handleTabChange} />);
        await user.click(screen.getByText("Plataforma"));
        expect(handleTabChange).toHaveBeenCalledWith("plataforma");
    });

    it("llama a handleTabChange con 'mis-recetas'", async () => {
        const user = userEvent.setup();
        const handleTabChange = jest.fn();
        render(<AsignarRecetaTabs activeTab="plataforma" handleTabChange={handleTabChange} />);
        await user.click(screen.getByText("Mis Recetas"));
        expect(handleTabChange).toHaveBeenCalledWith("mis-recetas");
    });
});