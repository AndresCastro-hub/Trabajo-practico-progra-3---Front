import { render, screen } from "@testing-library/react";
import AdminHeader from "@/features/dashboard/admin/components/AdminHeader";

describe("AdminHeader", () => {
    it("renderiza el título", () => {
        render(<AdminHeader />);
        expect(screen.getByText("Panel de administración")).toBeInTheDocument();
    });

    it("renderiza la descripción", () => {
        render(<AdminHeader />);
        expect(screen.getByText("Solo accesible para administradores")).toBeInTheDocument();
    });
});