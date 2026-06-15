"use client";
import { CarouselCalendario } from "./components/CarouselCalendario";
import { CalendarioHeader } from "./components/CalendarioHeader";
import { CalendarioProvider } from "./context/CalendarioContext";
import moment from 'moment';
moment.locale('es');

export default function Calendario (){
    return (
        <CalendarioProvider>
            <CalendarioHeader />

            <hr className="border-gray-300 mb-4" />

            <div className="h-[70vh] px-12 py-4 mx-5">
                <CarouselCalendario />
            </div>
        </CalendarioProvider>
    )
}