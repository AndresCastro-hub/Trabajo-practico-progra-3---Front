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

    if (loading && isSemanaVacia(semana)) return ( <LoadingSpinner/> );

    if (error) return ( <ErrorState message={error} onBack={() => router.back()} /> );

    return (
        <Carousel opts={{ align: "start", watchDrag: false }} className="w-full h-full">
            <CarouselContent className="h-full" >
                {semana.map((dia) => {
                    return(
                        <CarouselItem key={`${dia.fecha}`} className="h-full basis-full sm:basis-65/100 lg:basis-38/100 xl:basis-1/4">
                            <div className="p-1 h-full">
                                <Card className="h-full flex flex-col">
                                    <header className="flex flex-row justify-between items-center border-b px-4 pb-2 shrink-0">
                                        <h3 className="text-lg font-semibold">
                                            {`${moment(dia.fecha).locale('es').format('ddd')} ${moment(dia.fecha).locale('es').format('DD')}`}
                                        </h3>
                                    </header>

                                    <CardContent className="grid grid-rows-2 gap-5 flex-1 min-h-0 p-3">
                                        <ComidasDelDia comidasDelDia={dia} />
                                    </CardContent>
                                </Card>
                            </div>
                        </CarouselItem>
                    )}
                )}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
        </Carousel>
    )
}
