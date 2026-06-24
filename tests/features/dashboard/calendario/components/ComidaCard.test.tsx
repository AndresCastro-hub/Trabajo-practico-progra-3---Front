import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ComidaCard } from "@/features/dashboard/calendario/components/ComidaCard";
import { useModoControl } from "@/context/ModoControlContext";
import { useCalendarioContext } from "@/features/dashboard/calendario/context/CalendarioContext";
import { eliminarRecetaDeCalendario } from "@/features/dashboard/calendario/service/calendarioService";
import { useNotificacion } from "@/context/NotificacionContext";

jest.mock("@/context/ModoControlContext");
jest.mock("@/features/dashboard/calendario/context/CalendarioContext");
jest.mock("@/features/dashboard/calendario/service/calendarioService");
jest.mock("@/context/NotificacionContext", () => ({
    useNotificacion: jest.fn(),
    TipoNotificacion: { SUCCESS: "success", ERROR: "error" },
}));

jest.mock("@/features/dashboard/calendario/components/EditarDialog", () => ({
    EditarDialog: ({ open }: { open: boolean }) => (open ? <div data-testid="editar-dialog" /> : null),
}));

jest.mock("@/components/ConfirmDialog", () => ({
    ConfirmDialog: ({ open, titulo, descripcion, onConfirm }: { open: boolean; titulo: string; descripcion: string; onConfirm: () => void }) =>
        open ? (
            <div data-testid="confirm-dialog">
                <p>{titulo}</p>
                <p>{descripcion}</p>
                <button onClick={onConfirm}>Confirmar</button>
            </div>
        ) : null,
}));

jest.mock("next/image", () => {
    function MockImage({ src, alt }: { src: string; alt: string }) {
        // eslint-disable-next-line @next/next/no-img-element
        return <img src={src} alt={alt} />;
    }
    return MockImage;
});

const mockUseModoControl = useModoControl as jest.Mock;
const mockUseCalendarioContext = useCalendarioContext as jest.Mock;
const mockEliminar = eliminarRecetaDeCalendario as jest.Mock;
const mockUseNotificacion = useNotificacion as jest.Mock;
const mockRefrescar = jest.fn();
const mockMostrarNotificacion = jest.fn();

const receta = {
    titulo: "Milanesa", descripcion: "Clásica milanesa", imagen: "https://imagen.com/milanesa.jpg",
    calorias: 500, tiempoPreparacion: 30, tipoComida: "Almuerzo",
};

beforeEach(() => {
    mockUseModoControl.mockReturnValue({ modoControl: true });
    mockUseCalendarioContext.mockReturnValue({ refrescar: mockRefrescar });
    mockUseNotificacion.mockReturnValue({ mostrarNotificacion: mockMostrarNotificacion });
    mockEliminar.mockResolvedValue({});
});
afterEach(() => jest.clearAllMocks());

describe("ComidaCard: renderizado", () => {
    it("renderiza tipo de comida", () => {
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);
        expect(screen.getByText("Almuerzo")).toBeInTheDocument();
    });

    it("renderiza título y descripción", () => {
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);
        expect(screen.getByText("Milanesa")).toBeInTheDocument();
        expect(screen.getByText("Clásica milanesa")).toBeInTheDocument();
    });

    it("muestra calorías si modoControl está activo", () => {
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);
        expect(screen.getByText("500 kcal")).toBeInTheDocument();
    });

    it("no muestra calorías si modoControl está desactivado", () => {
        mockUseModoControl.mockReturnValue({ modoControl: false });
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);
        expect(screen.queryByText("500 kcal")).not.toBeInTheDocument();
    });

    it("muestra el tiempo de preparación", () => {
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);
        expect(screen.getByText("30 min")).toBeInTheDocument();
    });

    it("no muestra el ConfirmDialog ni el EditarDialog por defecto", () => {
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);
        expect(screen.queryByTestId("confirm-dialog")).not.toBeInTheDocument();
        expect(screen.queryByTestId("editar-dialog")).not.toBeInTheDocument();
    });
});

describe("ComidaCard: interacciones", () => {
    it("abre el diálogo de edición al hacer click en editar", async () => {
        const user = userEvent.setup();
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);

        await user.click(screen.getAllByRole("button")[0]);

        expect(screen.getByTestId("editar-dialog")).toBeInTheDocument();
    });

    it("abre el ConfirmDialog al hacer click en eliminar, sin eliminar todavía", async () => {
        const user = userEvent.setup();
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);

        await user.click(screen.getAllByRole("button")[1]);

        expect(screen.getByTestId("confirm-dialog")).toBeInTheDocument();
        expect(mockEliminar).not.toHaveBeenCalled();
    });

    it("muestra el título y la descripción de confirmación con el nombre de la receta", async () => {
        const user = userEvent.setup();
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);

        await user.click(screen.getAllByRole("button")[1]);

        expect(screen.getByText("¿Eliminar receta?")).toBeInTheDocument();
        expect(screen.getByText(/Esta acción no se puede deshacer\. ¿Estás seguro que querés eliminar "Milanesa" del calendario\?/i)).toBeInTheDocument();
    });

    it("al confirmar: llama al servicio con el tipo de comida y fecha correctos", async () => {
        const user = userEvent.setup();
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);

        await user.click(screen.getAllByRole("button")[1]);
        await user.click(screen.getByText("Confirmar"));

        expect(mockEliminar).toHaveBeenCalledWith({ tipo_comida_id: 1, fecha: "2026-01-01" });
    });

    it("al confirmar con éxito: notifica éxito y refresca", async () => {
        const user = userEvent.setup();
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);

        await user.click(screen.getAllByRole("button")[1]);
        await user.click(screen.getByText("Confirmar"));

        await waitFor(() => expect(mockMostrarNotificacion).toHaveBeenCalledWith("Receta eliminada del calendario.", "success"));
        expect(mockRefrescar).toHaveBeenCalled();
    });

    it("al confirmar con error: notifica error y no refresca", async () => {
        mockEliminar.mockRejectedValue(new Error("Error de red"));
        const user = userEvent.setup();
        render(<ComidaCard receta={receta} fecha="2026-01-01" />);

        await user.click(screen.getAllByRole("button")[1]);
        await user.click(screen.getByText("Confirmar"));

        await waitFor(() => expect(mockMostrarNotificacion).toHaveBeenCalledWith("Error al eliminar la receta.", "error"));
        expect(mockRefrescar).not.toHaveBeenCalled();
    });
});