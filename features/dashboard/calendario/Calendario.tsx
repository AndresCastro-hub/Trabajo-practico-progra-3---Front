"use client";
import { CarouselCalendario } from "./components/CarouselCalendario";
import { CalendarioHeader } from "./components/CalendarioHeader";
import { CalendarioProvider } from "./context/CalendarioContext";
import moment from 'moment';
moment.locale('es');

export default function Calendario() {
    return (
        <CalendarioProvider>
            <CalendarioHeader />
            <div className="px-8 pb-8">
                <CarouselCalendario />
            </div>
        </CalendarioProvider>
    )
}