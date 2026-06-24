import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminContentTable, { IColumn } from "@/features/dashboard/admin/components/AdminContentTable";

jest.mock("@/components/LoadingSpinner", () => {
    function MockLoadingSpinner() { return <div data-testid="loading-spinner" />; }
    return MockLoadingSpinner;
});

jest.mock("@/components/ErrorState", () => {
    function MockErrorState({ message }: { message: string }) {
        return <div data-testid="error-state">{message}</div>;
    }
    return MockErrorState;
});

interface IItem { id: number; nombre: string; }

const mockData: IItem[] = [
    { id: 1, nombre: "Tomate" },
    { id: 2, nombre: "Leche" },
];

const columnas: IColumn<IItem>[] = [
    { header: "Nombre", render: (item) => <span>{item.nombre}</span> },
];

describe("AdminContentTable: renderizado", () => {
    it("renderiza los headers de las columnas", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} />);
        expect(screen.getByText("Nombre")).toBeInTheDocument();
    });

    it("renderiza una fila por cada item", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} />);
        expect(screen.getByText("Tomate")).toBeInTheDocument();
        expect(screen.getByText("Leche")).toBeInTheDocument();
    });

    it("no renderiza filas si tableContent está vacío", () => {
        render(<AdminContentTable tableContent={[]} columns={columnas} getKey={(i: IItem) => i.id} error={null} />);
        expect(screen.queryByText("Tomate")).not.toBeInTheDocument();
    });
});

describe("AdminContentTable: columna de acciones", () => {
    it("no renderiza botones si no hay onEdit ni onDelete", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} />);
        expect(screen.queryByRole("button")).not.toBeInTheDocument();
    });

    it("renderiza solo el botón de editar si solo se pasa onEdit", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} onEdit={jest.fn()} />);
        expect(screen.getAllByRole("button").length).toBe(mockData.length);
    });

    it("renderiza solo el botón de eliminar si solo se pasa onDelete", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} onDelete={jest.fn()} />);
        expect(screen.getAllByRole("button").length).toBe(mockData.length);
    });

    it("renderiza editar y eliminar si se pasan ambos", () => {
        render(
            <AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} onEdit={jest.fn()} onDelete={jest.fn()} />
        );
        expect(screen.getAllByRole("button").length).toBe(mockData.length * 2);
    });
});

describe("AdminContentTable: interacciones", () => {
    it("llama a onEdit con el item correcto", async () => {
        const user = userEvent.setup();
        const onEdit = jest.fn();
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} onEdit={onEdit} />);

        await user.click(screen.getAllByRole("button")[0]);

        expect(onEdit).toHaveBeenCalledWith(mockData[0]);
    });

    it("llama a onDelete con el item correcto", async () => {
        const user = userEvent.setup();
        const onDelete = jest.fn();
        render(
            <AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} onEdit={jest.fn()} onDelete={onDelete} />
        );

        await user.click(screen.getAllByRole("button")[1]);

        expect(onDelete).toHaveBeenCalledWith(mockData[0]);
    });
});

describe("AdminContentTable: loading y error", () => {
    it("muestra el spinner si loading es true", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} loading />);
        expect(screen.getByTestId("loading-spinner")).toBeInTheDocument();
    });

    it("no muestra el spinner si loading es false o no se pasa", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} />);
        expect(screen.queryByTestId("loading-spinner")).not.toBeInTheDocument();
    });

    it("muestra el ErrorState con el mensaje recibido, sin prefijo adicional", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error="Error de red" />);
        expect(screen.getByTestId("error-state")).toHaveTextContent("Error de red");
    });

    it("no muestra el ErrorState si error es null", () => {
        render(<AdminContentTable tableContent={mockData} columns={columnas} getKey={(i) => i.id} error={null} />);
        expect(screen.queryByTestId("error-state")).not.toBeInTheDocument();
    });
});