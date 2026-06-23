import { render, screen } from "@testing-library/react";
import Calendario from "@/features/dashboard/calendario/Calendario";
import { ReactNode } from "react";

jest.mock("@/features/dashboard/calendario/context/CalendarioContext", () => ({
    CalendarioProvider: ({ children }: { children: ReactNode }) => <div data-testid="mock-provider">{children}</div>
}));

jest.mock("@/features/dashboard/calendario/components/CalendarioHeader", () => ({
    CalendarioHeader: () => <div data-testid="mock-header">Header Mock</div>
}));

jest.mock("@/features/dashboard/calendario/components/CarouselCalendario", () => ({
    CarouselCalendario: () => <div data-testid="mock-carousel">Carousel Mock</div>
}));

describe("Calendario: ", () => {
    it("debe iniciar el provider y renderizar los hijos en el orden correcto", () => {
        render(<Calendario />);

        const provider = screen.getByTestId("mock-provider");
        expect(provider).toBeInTheDocument();

        const header = screen.getByTestId("mock-header");
        const carousel = screen.getByTestId("mock-carousel");

        expect(header).toBeInTheDocument();
        expect(carousel).toBeInTheDocument();

        expect(provider).toContainElement(header);
        expect(provider).toContainElement(carousel);
    });
});