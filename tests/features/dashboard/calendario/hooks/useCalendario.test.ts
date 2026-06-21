import { renderHook, act, waitFor } from "@testing-library/react";
import { obtenerCalendarioSemanal } from "@/features/dashboard/calendario/service/calendarioService";
import useCalendario from "@/features/dashboard/calendario/hooks/useCalendario";
import moment from "moment";

jest.mock("@/features/dashboard/calendario/service/calendarioService");
const mockObtener = obtenerCalendarioSemanal as jest.Mock;

describe("useCalendario", () => {
    beforeEach(() => mockObtener.mockResolvedValue([]));
    afterEach(() => jest.clearAllMocks());

    it("inicializa fechaActual en el día de hoy", async () => {
        const { result } = renderHook(() => useCalendario());

        await waitFor(() => expect(result.current.loading).toBe(false));
        
        expect(result.current.fechaActual).toBe(moment().format("YYYY-MM-DD"));
    });

    it("hace fetch inicial al iniciar", async () => {
        const { result } = renderHook(() => useCalendario());

        await waitFor(() => expect(result.current.loading).toBe(false));

        await waitFor(() => expect(mockObtener).toHaveBeenCalledTimes(1));
    });

    it("loading es true durante el fetch y false al terminar", async () => {
        const { result } = renderHook(() => useCalendario());

        expect(result.current.loading).toBe(true);

        await waitFor(() => expect(result.current.loading).toBe(false));
    });

    it("mapea los datos recibidos a la semana", async () => {
        mockObtener.mockResolvedValue([{
            fecha: moment().format("YYYY-MM-DD"), tipo_comida: "Almuerzo", titulo: "Milanesa",
            descripcion: "", imagen: "", calorias: 500, tiempo_preparacion: 30,
        }]);

        const { result } = renderHook(() => useCalendario());

        await waitFor(() => expect(result.current.loading).toBe(false));

        const almuerzo = result.current.semana[0].comidas.find(c => c.tipoComida === "Almuerzo");
        expect(almuerzo?.titulo).toBe("Milanesa");
    });

    it("setea error si el fetch falla", async () => {
        mockObtener.mockRejectedValue(new Error("Error de red"));
        const { result } = renderHook(() => useCalendario());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(result.current.error).toBe("Error de red");
    });

    it("setFechaActual dispara un nuevo fetch con la fecha correcta", async () => {
        const { result } = renderHook(() => useCalendario());

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(mockObtener).toHaveBeenCalledTimes(1);

        act(() => result.current.setFechaActual("2026-02-01"));

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(mockObtener).toHaveBeenCalledWith("2026-02-01");
        expect(mockObtener).toHaveBeenCalledTimes(2);
    });

    it("refrescar dispara un nuevo fetch sin cambiar la fecha", async () => {
        const { result } = renderHook(() => useCalendario());

        await waitFor(() => expect(result.current.loading).toBe(false));

        await waitFor(() => expect(mockObtener).toHaveBeenCalledTimes(1));

        act(() => result.current.refrescar());

        await waitFor(() => expect(result.current.loading).toBe(false));

        expect(mockObtener).toHaveBeenCalledTimes(2);
    });
});