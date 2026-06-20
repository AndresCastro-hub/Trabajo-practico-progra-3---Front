import { semanaVacia, mapperResponseDTOToSemana, rangoSemana, isSemanaVacia } from "@/features/dashboard/calendario/utils/calendario.utils";
import { ICalendarWeekItemDto } from "@/features/dashboard/calendario/types/calendario.types";
import moment from "moment";
beforeAll(() => {
    moment.locale('es');
});
describe("semanaVacia", () => {
    it("retorna 7 días", () => {
        const semana = semanaVacia("2024-01-01");
        expect(semana.length).toBe(7);
    });

    it("el primer día es la fecha pasada", () => {
        const semana = semanaVacia("2024-01-01");
        expect(semana[0].fecha).toBe("2024-01-01");
    });

    it("el último día es 6 días después", () => {
        const semana = semanaVacia("2024-01-01");
        expect(semana[6].fecha).toBe("2024-01-07");
    });

    it("cada día tiene 2 comidas: Almuerzo y Cena", () => {
        const semana = semanaVacia("2024-01-01");
        semana.forEach(dia => {
            expect(dia.comidas.length).toBe(2);
            expect(dia.comidas[0].tipoComida).toBe("Almuerzo");
            expect(dia.comidas[1].tipoComida).toBe("Cena");
        });
    });

    it("las comidas tienen título vacío", () => {
        const semana = semanaVacia("2024-01-01");
        semana.forEach(dia => {
            dia.comidas.forEach(comida => {
                expect(comida.titulo).toBe("");
            });
        });
    });
});

describe("mapperResponseDTOToSemana", () => {
    const fechaInicio = "2024-01-01";

    const dtoAlmuerzo: ICalendarWeekItemDto = {
        fecha: "2024-01-01",
        tipo_comida: "Almuerzo",
        titulo: "Milanesa",
        descripcion: "Rica milanesa",
        imagen: "https://imagen.com/milanesa.jpg",
        calorias: 500,
        tiempo_preparacion: 30,
    };

    it("mapea correctamente una comida del DTO a la semana", () => {
        const semana = mapperResponseDTOToSemana(fechaInicio, [dtoAlmuerzo]);
        const dia = semana.find(d => d.fecha === "2024-01-01");
        const almuerzo = dia?.comidas.find(c => c.tipoComida === "Almuerzo");

        expect(almuerzo?.titulo).toBe("Milanesa");
        expect(almuerzo?.descripcion).toBe("Rica milanesa");
        expect(almuerzo?.calorias).toBe(500);
        expect(almuerzo?.tiempoPreparacion).toBe(30);
    });

    it("deja vacías las comidas que no están en el DTO", () => {
        const semana = mapperResponseDTOToSemana(fechaInicio, [dtoAlmuerzo]);
        const dia = semana.find(d => d.fecha === "2024-01-01");
        const cena = dia?.comidas.find(c => c.tipoComida === "Cena");

        expect(cena?.titulo).toBe("");
    });

    it("días sin datos en el DTO quedan vacíos", () => {
        const semana = mapperResponseDTOToSemana(fechaInicio, [dtoAlmuerzo]);
        const dia = semana.find(d => d.fecha === "2024-01-03");

        dia?.comidas.forEach(comida => {
            expect(comida.titulo).toBe("");
        });
    });

    it("retorna 7 días", () => {
        const semana = mapperResponseDTOToSemana(fechaInicio, []);
        expect(semana.length).toBe(7);
    });

    it("con DTO vacío retorna semana vacía", () => {
        const semana = mapperResponseDTOToSemana(fechaInicio, []);
        semana.forEach(dia => {
            dia.comidas.forEach(comida => {
                expect(comida.titulo).toBe("");
            });
        });
    });
});

describe("rangoSemana", () => {
    it("muestra rango dentro del mismo mes", () => {
        const resultado = rangoSemana("2024-01-01");
        expect(resultado).toBe("01 al 7 de enero");
    });

    it("muestra rango entre dos meses distintos", () => {
        const resultado = rangoSemana("2024-01-29");
        expect(resultado).toBe("29 de enero al 4 de febrero");
    });
});

describe("isSemanaVacia", () => {
    it("retorna true si todas las comidas tienen título vacío", () => {
        const semana = semanaVacia("2024-01-01");
        expect(isSemanaVacia(semana)).toBe(true);
    });

    it("retorna false si al menos una comida tiene título", () => {
        const semana = semanaVacia("2024-01-01");
        semana[0].comidas[0].titulo = "Milanesa";
        expect(isSemanaVacia(semana)).toBe(false);
    });
});