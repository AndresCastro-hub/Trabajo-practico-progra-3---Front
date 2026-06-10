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
import moment from 'moment';

export interface Comida {
    fecha: string;
    receta: {
        titulo: string;
        descripcion: string;
        imagen: string;
        calorias: number;
        tiempoPreparacion: number;
    };
    tipo_comida: string;
}

const mockData: Comida[] = [
    {
        fecha: "2026-06-10",
        receta: {
            titulo: "Milanesa napolitana con fritasaaaaaaa",
            descripcion: "asdasdasdasd",
            imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            calorias: 500,
            tiempoPreparacion: 30
        },
        tipo_comida: "Almuerzo"
    },
    {
        fecha: "2026-06-13",
        receta: {
            titulo: "Milanesa napolitana con fritasaaaaaaa",
            descripcion: "asdasdasdasd",
            imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            calorias: 500,
            tiempoPreparacion: 30
        },
        tipo_comida: "Almuerzo"
    },
    {
        fecha: "2026-06-12",
        receta: {
            titulo: "Milanesa napolitana con fritasaaaaaaa",
            descripcion: "asdasdasdasd",
            imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            calorias: 500,
            tiempoPreparacion: 30
        },
        tipo_comida: "Almuerzo"
    },
    {
        fecha: "2026-06-16",
        receta: {
            titulo: "Milanesa napolitana con fritasaaaaaaa",
            descripcion: "asdasdasdasd",
            imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            calorias: 500,
            tiempoPreparacion: 30
        },
        tipo_comida: "Almuerzo"
    },
    {
        fecha: "2026-06-10",
        receta: {
            titulo: "Ensalada César1111",
            descripcion: "asdasdasdasd",
            imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            calorias: 300,
            tiempoPreparacion: 20
        },
        tipo_comida: "Cena"
    },{
        fecha: "2026-06-13",
        receta: {
            titulo: "Ensalada César1111",
            descripcion: "asdasdasdasd",
            imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            calorias: 300,
            tiempoPreparacion: 20
        },
        tipo_comida: "Cena"
    },
    {
        fecha: "2026-06-15",
        receta: {
            titulo: "Ensalada César",
            descripcion: "asdasdasdasd",
            imagen: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
            calorias: 300,
            tiempoPreparacion: 20
        },
        tipo_comida: "Cena"
    }
];

export function CarouselCalendario() {
    const data = Array.from({ length: 7 }).map((_, index) => {
        const hoy = moment().add(index, 'days');
        const diaSemana = hoy.locale('es').format('ddd');
        const nombreDia = diaSemana.charAt(0).toUpperCase() + diaSemana.slice(1);
        const numeroDia = hoy.locale('es').format('DD');
        const almuerzo = mockData.find(item => item.fecha === hoy.toISOString().split('T')[0] && item.tipo_comida === "Almuerzo");
        const cena = mockData.find(item => item.fecha === hoy.toISOString().split('T')[0] && item.tipo_comida === "Cena");
        return {
            nombreDia,
            numeroDia,
            almuerzo,
            cena
        }
    });
    return (
        <Carousel opts={{ align: "start", watchDrag: false }} className="w-full h-full">
            <CarouselContent className="h-full" >
                {data.map((item, index) => {
                    return(
                        <CarouselItem key={index} className="h-full basis-full sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                            <div className="p-1 h-full">
                                <Card className="h-full flex flex-col">
                                    <header className="flex flex-row justify-between items-center border-b px-4 pb-2 shrink-0">
                                        <h3 className="text-lg font-semibold">{`${item.nombreDia} ${item.numeroDia}`}</h3>
                                    </header>

                                    <CardContent className="grid grid-rows-2 gap-5 flex-1 min-h-0 p-3">
                                        {item.almuerzo ? (
                                            <ComidaCard tipoComida="Almuerzo" receta={item.almuerzo.receta} />
                                        ) : (
                                            <EmptyComidaCard tipoComida="Almuerzo" />
                                        )}
                                        {item.cena ? (
                                            <ComidaCard tipoComida="Cena" receta={item.cena.receta} />
                                        ) : (
                                            <EmptyComidaCard tipoComida="Cena" />
                                        )}
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
