import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { IDia } from "../types/calendario.types";
import { ComidasDelDia } from "./ComidasDelDia";
import ErrorState from "@/components/ErrorState";
import moment from 'moment';
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/LoadingSpinner";

interface CarouselCalendarioProps {
    semana: IDia[];
    loading: boolean;
    error: string | null;
}

export function CarouselCalendario({semana, loading, error}: CarouselCalendarioProps) {
    const router = useRouter();

    if (loading) return ( <LoadingSpinner/> );

    if (error) return ( <ErrorState message={error} onBack={() => router.back()} /> );

    return (
        <Carousel opts={{ align: "start", watchDrag: false }} className="w-full h-full">
            <CarouselContent className="h-full" >
                {semana.map((dia) => {
                    return(
                        <CarouselItem key={`${dia.fecha}`} className="h-full basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="p-1 h-full">
                                <Card className="h-full flex flex-col">
                                    <header className="flex flex-row justify-between items-center border-b px-4 pb-2 shrink-0">
                                        <h3 className="text-lg font-semibold">{`${moment(dia.fecha).locale('es').format('ddd')} ${moment(dia.fecha).locale('es').format('DD')}`}</h3>
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
