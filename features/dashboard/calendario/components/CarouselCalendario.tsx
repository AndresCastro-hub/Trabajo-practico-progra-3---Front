import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { useCalendarioContext } from "../context/CalendarioContext";
import { ComidasDelDia } from "./ComidasDelDia";
import { useRouter } from "next/navigation";
import ErrorState from "@/components/ErrorState";
import LoadingSpinner from "@/components/LoadingSpinner";
import moment from 'moment';
import { isSemanaVacia } from "../utils/calendario.utils";

export function CarouselCalendario() {
    const router = useRouter();
    const { semana, loading, error } = useCalendarioContext();

    if (loading && isSemanaVacia(semana)) return <LoadingSpinner />;
    if (error) return <ErrorState message={error} onBack={() => router.back()} />;

    return (
        <Carousel opts={{ align: "start", watchDrag: false }} className="w-full">
            <CarouselContent className="-ml-3">
                {semana.map((dia) => (
                    <CarouselItem
                        key={dia.fecha}
                        className="pl-3 basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                    >
                        <Card className="flex flex-col rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                            {/* Header del día */}
                            <header className="flex flex-row justify-between items-center px-4 py-3 border-b border-gray-100 bg-white">
                                <span className="text-sm font-bold text-green-500 uppercase tracking-wide">
                                    {moment(dia.fecha).locale('es').format('ddd')}
                                </span>
                                <span className="text-sm font-semibold text-gray-400">
                                    {moment(dia.fecha).locale('es').format('DD')}
                                </span>
                            </header>

                            <CardContent className="flex flex-col gap-3 p-3">
                                <ComidasDelDia comidasDelDia={dia} />
                            </CardContent>
                        </Card>
                    </CarouselItem>
                ))}
            </CarouselContent>
            <CarouselPrevious className="-left-5" />
            <CarouselNext className="-right-5" />
        </Carousel>
    )
}