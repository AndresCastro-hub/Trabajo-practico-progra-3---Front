"use client";
import { CarouselCalendario } from "./components/CarouselCalendario";
import useCalendario from "./hooks/useCalendario";
import { CalendarioHeader } from "./components/CalendarioHeader";
import moment from 'moment';
moment.locale('es');

export default function Calendario (){
    const {
        fechaActual,
        setFechaActual,
        semana,
        loading,
        error,
    } = useCalendario();

    return (
        <>
            <CalendarioHeader fechaActual={fechaActual} setFechaActual={setFechaActual} />

            <hr className="border-gray-300 mb-4" />

            <div className="h-[70vh] px-12 py-4 mx-5">
                <CarouselCalendario semana={semana} loading={loading} error={error} />
            </div>
        </>
    )
}