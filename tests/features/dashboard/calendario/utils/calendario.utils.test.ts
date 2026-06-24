import moment from "moment";
moment.locale("es");
import { semanaVacia, mapperResponseDTOToSemana, rangoSemana, isSemanaVacia } from "@/features/dashboard/calendario/utils/calendario.utils";
import { ICalendarWeekItemDto, IDia } from "@/features/dashboard/calendario/types/calendario.types";

describe("semanaVacia", () => {
    it("genera 7 días a partir de la fecha dada", () => {
        const resultado = semanaVacia("2026-01-01");
        expect(resultado).toHaveLength(7);
        expect(resultado[0].fecha).toBe("2026-01-01");
        expect(resultado[6].fecha).toBe("2026-01-07");
    });

    it("cada día tiene comidas Almuerzo y Cena vacías", () => {
        const resultado = semanaVacia("2026-01-01");
        resultado.forEach(dia => {
            expect(dia.comidas).toHaveLength(2);
            expect(dia.comidas[0]).toMatchObject({
                tipoComida: 'Almuerzo',
                titulo: '',
                descripcion: '',
                imagen: '',
                calorias: 0,
                tiempoPreparacion: 0,
            });
            expect(dia.comidas[1]).toMatchObject({
                tipoComida: 'Cena',
                titulo: '',
                descripcion: '',
                imagen: '',
                calorias: 0,
                tiempoPreparacion: 0,
            });
        });
    });
});

describe("mapperResponseDTOToSemana", () => {
    it("rellena la comida correspondiente cuando hay datos para ese día y tipo", () => {
        const dto: ICalendarWeekItemDto[] = [{
            fecha: "2026-01-01", tipo_comida: "Almuerzo", titulo: "Milanesa",
            descripcion: "Rica milanesa", imagen: "https://imagen.com/milanesa.jpg",
            calorias: 500, tiempo_preparacion: 30,
        }];

        const resultado = mapperResponseDTOToSemana("2026-01-01", dto);
        const almuerzo = resultado[0].comidas.find(c => c.tipoComida === "Almuerzo");

        expect(almuerzo?.titulo).toBe("Milanesa");
        expect(almuerzo?.calorias).toBe(500);
        expect(almuerzo?.tiempoPreparacion).toBe(30);
    });

    it("deja la comida vacía si no hay datos para ese día", () => {
        const resultado = mapperResponseDTOToSemana("2026-01-01", []);
        resultado.forEach(dia => dia.comidas.forEach(c => expect(c.titulo).toBe("")));
    });

    it("no pisa la cena si solo viene el almuerzo del día", () => {
        const dto: ICalendarWeekItemDto[] = [{
            fecha: "2026-01-01", tipo_comida: "Almuerzo", titulo: "Milanesa",
            descripcion: "", imagen: "", calorias: 500, tiempo_preparacion: 30,
        }];

        const resultado = mapperResponseDTOToSemana("2026-01-01", dto);
        const cena = resultado[0].comidas.find(c => c.tipoComida === "Cena");
        expect(cena?.titulo).toBe("");
    });

    it("no pisa el almuerzo si solo viene la cena del día", () => {
        const dto: ICalendarWeekItemDto[] = [{
            fecha: "2026-01-01", tipo_comida: "Cena", titulo: "Milanesa",
            descripcion: "", imagen: "", calorias: 500, tiempo_preparacion: 30,
        }];

        const resultado = mapperResponseDTOToSemana("2026-01-01", dto);
        const cena = resultado[0].comidas.find(c => c.tipoComida === "Almuerzo");
        expect(cena?.titulo).toBe("");
    });
});

describe("rangoSemana", () => {
    it("usa formato corto si ambas fechas son del mismo mes", () => {
        expect(rangoSemana("2026-01-01")).toBe("01 al 7 de enero");
    });

    it("usa formato largo si las fechas cruzan de mes", () => {
        expect(rangoSemana("2026-01-29")).toBe("29 de enero al 4 de febrero");
    });
});

describe("isSemanaVacia", () => {
    it("devuelve true si todas las comidas de todos los días están vacías", () => {
        expect(isSemanaVacia(semanaVacia("2026-01-01"))).toBe(true);
    });

    it("devuelve false si al menos una comida tiene título", () => {
        const semana2: IDia[] = [{
            fecha: "2026-01-01",
            comidas: [{
                titulo: "Milanesa",
                descripcion: "",
                imagen: "",
                calorias: 500,
                tiempoPreparacion: 30,
                tipoComida: "Almuerzo"
            }]
        }];
        expect(isSemanaVacia(semana2)).toBe(false);
    });
});