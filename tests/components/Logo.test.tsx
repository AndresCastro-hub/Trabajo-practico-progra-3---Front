import { render, screen } from "@testing-library/react";
import Logo from "@/components/Logo";

describe("Logo", () => {
    it("renderiza el nombre de la app", () => {
        render(<Logo />);
        expect(screen.getByText("Meal Prep")).toBeInTheDocument();
    });
});