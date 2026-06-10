import { Card, CardContent } from "@/components/ui/card"
import { ComidaCard } from "./ComidaCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { EmptyComidaCard } from "./EmptyComidaCard";

export function CarouselCalendario() {
    return (
        <Carousel opts={{ align: "start", watchDrag: false }} className="w-full h-full">
            <CarouselContent className="h-full" >
                {Array.from({ length: 7 }).map((_, index) => {
                    const hoy = new Date();
                    hoy.setDate(hoy.getDate() + index);
                    let nombreDia = hoy.toLocaleDateString('es-ES', { weekday: "long"});
                    nombreDia = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);
                    const numeroDia = hoy.toLocaleDateString('es-ES', { day: "2-digit"});
                    return(
                        <CarouselItem key={index} className="h-full basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="p-1 h-full">
                                <Card className="h-full flex flex-col">
                                    <header className="flex flex-row justify-between items-center border-b px-4 py-3 shrink-0">
                                        <h3 className="text-lg font-semibold">{`${nombreDia}`}</h3>
                                        <p className="text-sm text-gray-500">{`${numeroDia}`}</p>
                                    </header>

                                    <CardContent className="grid grid-rows-2 gap-3 flex-1 min-h-0 p-3">
                                        <ComidaCard tipoComida="Almuerzo" />
                                        <EmptyComidaCard tipoComida="Almuerzo" />
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
