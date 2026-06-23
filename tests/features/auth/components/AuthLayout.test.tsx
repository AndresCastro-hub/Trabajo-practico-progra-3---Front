import React from "react";
import { render, screen } from "@testing-library/react";
import AuthLayout from "@/features/auth/components/AuthLayout";

jest.mock("@/components/Logo", () => ({
    __esModule: true,
    default: () => <div>Logo</div>,
}));

jest.mock("@/features/auth/components/AuthImagenPanel", () => ({
    __esModule: true,
    default: ({ badge, heading }: { badge: string; heading: React.ReactNode }) => (
        <div>
            <span>{badge}</span>
            <div>{heading}</div>
        </div>
    ),
}));

describe("AuthLayout", () => {
    const props = {
        imageSrc: "/imagen.jpg",
        imageAlt: "Imagen",
        badge: "Meal Prep App",
        heading: <span>Planificá tus comidas</span>,
    };

    it("renderiza el logo", () => {
        render(<AuthLayout {...props}><div>Contenido</div></AuthLayout>);
        expect(screen.getByText("Logo")).toBeInTheDocument();
    });

    it("renderiza el contenido hijo", () => {
        render(<AuthLayout {...props}><div>Contenido hijo</div></AuthLayout>);
        expect(screen.getByText("Contenido hijo")).toBeInTheDocument();
    });

    it("renderiza el footer con el copyright", () => {
        render(<AuthLayout {...props}><div /></AuthLayout>);
        expect(screen.getByText(/Todos los derechos reservados/)).toBeInTheDocument();
    });

    it("renderiza el badge del panel lateral", () => {
        render(<AuthLayout {...props}><div /></AuthLayout>);
        expect(screen.getByText("Meal Prep App")).toBeInTheDocument();
    });

    it("renderiza el heading del panel lateral", () => {
        render(<AuthLayout {...props}><div /></AuthLayout>);
        expect(screen.getByText("Planificá tus comidas")).toBeInTheDocument();
    });
});