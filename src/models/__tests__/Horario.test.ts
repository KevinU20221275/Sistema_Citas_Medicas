import { DiaSemana } from "@src/types/DiaSemana";
import { Horario } from "../Horario";

describe("Horario: mostrar informacion", () => {
    it("debe mostrar la informacion completa del horario", () => {
        const horario = new Horario(
            "hor001",
            "med001",
            DiaSemana.Lunes,
            "08:10",
            "12:00"
        )


        const info = horario.mostartInfo()

        expect(info).toEqual({
            id : "hor001",
            medicoId : "med001",
            dia : DiaSemana.Lunes,
            horaInicio : "08:10",
            horaFin : "12:00"
        })
    })
})