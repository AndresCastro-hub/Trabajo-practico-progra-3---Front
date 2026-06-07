import { Card, CardContent } from "@/components/ui/card"
import { ComidaCard } from "./ComidaCard"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export function CarouselCalendario() {
    return (
        <Carousel
            opts={{
                align: "start",
            }}
            className="lg:w-3/4"
        >
            <CarouselContent >
                {Array.from({ length: 7 }).map((_, index) => {
                    const hoy = new Date();
                    hoy.setDate(hoy.getDate() + index);
                    let nombreDia = hoy.toLocaleDateString('es-ES', { weekday: "long"});
                    nombreDia = nombreDia.charAt(0).toUpperCase() + nombreDia.slice(1);
                    const numeroDia = hoy.toLocaleDateString('es-ES', { day: "2-digit"});
                    return(
                        <CarouselItem key={index} className="lg:basis-1/4">
                            <div className="p-1 w-full">
                                <Card className="w-full h-full">
                                    <header className="flex flex-row justify-between items-center border-b pr-4 pl-4 pb-4">
                                        <h3 className="text-lg font-semibold">{`${nombreDia}`}</h3>
                                        <p className="text-sm text-gray-500">{`${numeroDia}`}</p>
                                    </header>
                                    <CardContent className="flex flex-col gap-4 aspect-square items-center justify-center w-full pb-5">
                                        <ComidaCard />
                                        <ComidaCard />
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
