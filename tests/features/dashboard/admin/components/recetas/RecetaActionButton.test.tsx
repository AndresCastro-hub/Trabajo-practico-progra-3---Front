import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/navigation";
import RecetaActionButton from "@/features/dashboard/admin/components/recetas/RecetaActionButton";

jest.mock("next/navigation", () => ({
    useRouter: jest.fn(),
}));

const mockPush = jest.fn();

beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
});

afterEach(() => jest.clearAllMocks());

describe("RecetaActionButton", () => {
    it("renderiza el botón con el texto correcto", () => {
        render(<RecetaActionButton />);
        expect(screen.getByRole("button", { name: /nueva receta global/i })).toBeInTheDocument();
    });

    it("navega a /recetario/nueva al hacer click", async () => {
        const user = userEvent.setup();
        render(<RecetaActionButton />);

        await user.click(screen.getByRole("button", { name: /nueva receta global/i }));

        expect(mockPush).toHaveBeenCalledWith("/recetario/nueva");
    });
});