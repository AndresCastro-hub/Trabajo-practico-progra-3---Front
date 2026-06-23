import React from "react";
import { renderHook, act } from "@testing-library/react";
import { ModoControlProvider, useModoControl } from "@/context/ModoControlContext";

const wrapper = ({ children }: { children: React.ReactNode }) =>
    React.createElement(ModoControlProvider, null, children);

describe("ModoControlContext", () => {
    it("inicia con modoControl en false", () => {
        const { result } = renderHook(() => useModoControl(), { wrapper });
        expect(result.current.modoControl).toBe(false);
    });

    it("onToggleModoControl cambia modoControl a true", () => {
        const { result } = renderHook(() => useModoControl(), { wrapper });

        act(() => result.current.onToggleModoControl());

        expect(result.current.modoControl).toBe(true);
    });

    it("onToggleModoControl vuelve a false al llamarse dos veces", () => {
        const { result } = renderHook(() => useModoControl(), { wrapper });

        act(() => result.current.onToggleModoControl());
        act(() => result.current.onToggleModoControl());

        expect(result.current.modoControl).toBe(false);
    });

    it("lanza error si se usa fuera del provider", () => {
        const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});

        expect(() => renderHook(() => useModoControl())).toThrow(
            "useModoControl debe usarse dentro de ModoControlProvider"
        );

        consoleError.mockRestore();
    });
});