import {
    obtenerCalendarioSemanal, asignarRecetaACalendario,
    EditarRecetaDelCalendario, eliminarRecetaDeCalendario,
} from "@/features/dashboard/calendario/service/calendarioService";
import { http } from "@/lib/utils/httpClient";

jest.mock("@/lib/utils/httpClient", () => ({
    http: { get: jest.fn(), post: jest.fn(), put: jest.fn(), delete: jest.fn() },
}));

const mockHttp = http as unknown as { get: jest.Mock; post: jest.Mock; put: jest.Mock; delete: jest.Mock };

afterEach(() => jest.clearAllMocks());

describe("obtenerCalendarioSemanal", () => {
    it("llama a http.get con la URL y query correctos", async () => {
        mockHttp.get.mockResolvedValue([]);
        await obtenerCalendarioSemanal("2026-01-01");
        expect(mockHttp.get).toHaveBeenCalledWith("/calendar/week?fecha=2026-01-01");
    });

    it("devuelve lo que resuelve el http.get", async () => {
        const mockData = [{ fecha: "2026-01-01" }];
        mockHttp.get.mockResolvedValue(mockData);
        const result = await obtenerCalendarioSemanal("2026-01-01");
        expect(result).toEqual(mockData);
    });

    it("propaga el error si http.get rechaza", async () => {
        mockHttp.get.mockRejectedValue(new Error("Error de red"));
        await expect(obtenerCalendarioSemanal("2026-01-01")).rejects.toThrow("Error de red");
    });
});

describe("asignarRecetaACalendario", () => {
    const dto = { fecha: "2026-01-01", tipo_comida_id: 1, receta_id: 5 };

    it("llama a http.post con la URL y el body correctos", () => {
        mockHttp.post.mockResolvedValue({});
        asignarRecetaACalendario(dto);
        expect(mockHttp.post).toHaveBeenCalledWith("/calendar", dto);
    });

    it("devuelve lo que resuelve el http.post", async () => {
        const mockData = [{
            id: 1,
            usuario_id: 1,
            fecha: "2026-01-01",
            receta_id: 5,
            tipo_comida_id: 1,
        }];
        mockHttp.post.mockResolvedValue(mockData);
        const result = await asignarRecetaACalendario(dto);
        expect(result).toEqual(mockData);
    });

    it("propaga el error si http.post rechaza", async () => {
        mockHttp.post.mockRejectedValue(new Error("Error al asignar"));
        await expect(asignarRecetaACalendario(dto)).rejects.toThrow("Error al asignar");
    });
});

describe("EditarRecetaDelCalendario", () => {
    const dto = { fecha: "2026-01-01", tipo_comida_id: 1, receta_id: 7 };

    it("llama a http.put con la URL y el body correctos", () => {
        mockHttp.put.mockResolvedValue({});
        EditarRecetaDelCalendario(dto);
        expect(mockHttp.put).toHaveBeenCalledWith("/calendar", dto);
    });

    it("devuelve lo que resuelve el http.put", async () => {
        const mockData = [{
            id: 1,
            usuario_id: 1,
            fecha: "2026-01-01",
            receta_id: 7,
            tipo_comida_id: 1,
        }];
        mockHttp.put.mockResolvedValue(mockData);
        const result = await EditarRecetaDelCalendario(dto);
        expect(result).toEqual(mockData);
    });

    it("propaga el error si http.put rechaza", async () => {
        mockHttp.put.mockRejectedValue(new Error("Error al editar"));
        await expect(EditarRecetaDelCalendario(dto)).rejects.toThrow("Error al editar");
    });
});

describe("eliminarRecetaDeCalendario", () => {
    const dto = { tipo_comida_id: 1, fecha: "2026-01-01" };

    it("llama a http.delete con la URL y el body correctos", () => {
        mockHttp.delete.mockResolvedValue({});
        eliminarRecetaDeCalendario(dto);
        expect(mockHttp.delete).toHaveBeenCalledWith("/calendar", dto);
    });

    it("devuelve lo que resuelve el http.delete", async () => {
        const mockData = [{
            id: 1,
            usuario_id: 1,
            fecha: "2026-01-01",
            receta_id: 5,
            tipo_comida_id: 1,
        }];
        mockHttp.delete.mockResolvedValue(mockData);
        const result = await eliminarRecetaDeCalendario(dto);
        expect(result).toEqual(mockData);
    });

    it("propaga el error si http.delete rechaza", async () => {
        mockHttp.delete.mockRejectedValue(new Error("Error al eliminar"));
        await expect(eliminarRecetaDeCalendario(dto)).rejects.toThrow("Error al eliminar");
    });
});