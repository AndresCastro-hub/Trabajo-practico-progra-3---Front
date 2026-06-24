import React from "react";
import { renderHook, act } from "@testing-library/react";
import { NotificacionProvider, useNotificacion, TipoNotificacion } from "@/context/NotificacionContext";

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(NotificacionProvider, null, children);

describe("NotificacionContext", () => {
    it("inicia con notificacion en null", () => {
        const { result } = renderHook(() => useNotificacion(), { wrapper });
        expect(result.current.notificacion).toBeNull();
    });

    it("mostrarNotificacion setea la notificación de éxito", () => {
        const { result } = renderHook(() => useNotificacion(), { wrapper });

        act(() => result.current.mostrarNotificacion("Operación exitosa", TipoNotificacion.SUCCESS));

        expect(result.current.notificacion).toEqual({
            mensaje: "Operación exitosa",
            tipo: TipoNotificacion.SUCCESS,
        });
    });

    it("mostrarNotificacion setea la notificación de error", () => {
        const { result } = renderHook(() => useNotificacion(), { wrapper });

        act(() => result.current.mostrarNotificacion("Ocurrió un error", TipoNotificacion.ERROR));

        expect(result.current.notificacion).toEqual({
            mensaje: "Ocurrió un error",
            tipo: TipoNotificacion.ERROR,
        });
    });

    it("limpiarNotificacion resetea la notificación a null", () => {
        const { result } = renderHook(() => useNotificacion(), { wrapper });

        act(() => result.current.mostrarNotificacion("Mensaje", TipoNotificacion.SUCCESS));
        act(() => result.current.limpiarNotificacion());

        expect(result.current.notificacion).toBeNull();
    });

    it("lanza error si se usa fuera del provider", () => {
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

        expect(() => renderHook(() => useNotificacion())).toThrow(
            "useNotificacion debe usarse dentro de NotificacionProvider"
        );

        consoleError.mockRestore();
    });
});