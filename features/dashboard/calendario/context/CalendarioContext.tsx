"use client";
import { createContext, useContext, ReactNode } from 'react';
import useCalendario from '../hooks/useCalendario';

type CalendarioContextType = ReturnType<typeof useCalendario>;

export const CalendarioContext = createContext<CalendarioContextType | null>(null);

export function CalendarioProvider({ children }: { children: ReactNode }) {
    const calendarioState = useCalendario(); 

    return (
        <CalendarioContext.Provider value={calendarioState}>
            {children}
        </CalendarioContext.Provider>
    )
}

export const useCalendarioContext = () => {
    const context = useContext(CalendarioContext);
    if (!context) throw new Error("useCalendarioContext debe usarse dentro de un CalendarioProvider");
    return context;
};