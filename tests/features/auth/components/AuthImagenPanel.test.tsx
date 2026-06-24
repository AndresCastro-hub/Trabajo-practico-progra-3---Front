import AuthImagePanel from "@/features/auth/components/AuthImagenPanel";
import { render, screen } from "@testing-library/react";

jest.mock("next/image", () => ({
    __esModule: true,
    // eslint-disable-next-line @next/next/no-img-element
    default: ({ src, alt }: { src: string; alt: string }) => <img src={src} alt={alt} />,
}));

describe("AuthImagePanel", () => {
    const props = {
        src: "/imagen.jpg",
        alt: "Imagen de fondo",
        badge: "Meal Prep App",
        heading: <span>Planificá tus comidas</span>,
    };

    it("renderiza el badge", () => {
        render(<AuthImagePanel {...props} />);
        expect(screen.getByText("Meal Prep App")).toBeInTheDocument();
    });

    it("renderiza el heading", () => {
        render(<AuthImagePanel {...props} />);
        expect(screen.getByText("Planificá tus comidas")).toBeInTheDocument();
    });

    it("renderiza la imagen con el src y alt correctos", () => {
        render(<AuthImagePanel {...props} />);
        const img = screen.getByAltText("Imagen de fondo");
        expect(img).toBeInTheDocument();
        expect(img).toHaveAttribute("src", "/imagen.jpg");
    });
});