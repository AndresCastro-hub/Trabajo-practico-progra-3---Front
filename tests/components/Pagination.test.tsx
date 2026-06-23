import { render, screen, fireEvent } from "@testing-library/react";
import Pagination from "@/components/Pagination";

describe("Pagination", () => {
 
    it("el botón anterior está deshabilitado en la primera página", () => {
        render(<Pagination current={1} lastPage={5} onPageChange={() => {}} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons[0]).toBeDisabled();
    });

    it("el botón siguiente está deshabilitado en la última página", () => {
        render(<Pagination current={5} lastPage={5} onPageChange={() => {}} />);
        const buttons = screen.getAllByRole("button");
        expect(buttons[buttons.length - 1]).toBeDisabled();
    });

    it("renderiza todas las páginas si lastPage <= 5", () => {
        render(<Pagination current={1} lastPage={4} onPageChange={() => {}} />);
        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
        expect(screen.getByText("4")).toBeInTheDocument();
    });

    it("llama a onPageChange con la página correcta al clickear", () => {
        const mockOnPageChange = jest.fn();
        render(<Pagination current={1} lastPage={5} onPageChange={mockOnPageChange} />);

        fireEvent.click(screen.getByText("2"));
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("llama a onPageChange con current - 1 al clickear anterior", () => {
        const mockOnPageChange = jest.fn();
        render(<Pagination current={3} lastPage={5} onPageChange={mockOnPageChange} />);

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[0]);
        expect(mockOnPageChange).toHaveBeenCalledWith(2);
    });

    it("llama a onPageChange con current + 1 al clickear siguiente", () => {
        const mockOnPageChange = jest.fn();
        render(<Pagination current={3} lastPage={5} onPageChange={mockOnPageChange} />);

        const buttons = screen.getAllByRole("button");
        fireEvent.click(buttons[buttons.length - 1]);
        expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it("muestra ellipsis al inicio si current > 3 y lastPage > 5", () => {
        render(<Pagination current={5} lastPage={10} onPageChange={() => {}} />);
        const ellipsis = screen.getAllByText("...");
        expect(ellipsis.length).toBeGreaterThan(0);
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("muestra ellipsis al final si hay más páginas", () => {
        render(<Pagination current={1} lastPage={10} onPageChange={() => {}} />);
        expect(screen.getByText("...")).toBeInTheDocument();
        expect(screen.getByText("10")).toBeInTheDocument();
    });

    it("navega a la primera página al clickear el 1 del ellipsis inicial", () => {
        const mockOnPageChange = jest.fn();
        render(<Pagination current={7} lastPage={10} onPageChange={mockOnPageChange} />);

        fireEvent.click(screen.getByText("1"));
        expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it("navega a la última página al clickear el número del ellipsis final", () => {
        const mockOnPageChange = jest.fn();
        render(<Pagination current={1} lastPage={10} onPageChange={mockOnPageChange} />);

        fireEvent.click(screen.getByText("10"));
        expect(mockOnPageChange).toHaveBeenCalledWith(10);
    });

    it("la página actual tiene estilo activo", () => {
        render(<Pagination current={3} lastPage={5} onPageChange={() => {}} />);
        const pageButton = screen.getByText("3");
        expect(pageButton).toHaveClass("bg-green-500");
    });
});