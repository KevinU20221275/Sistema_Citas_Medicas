import { EstadoConsulta } from "@src/types/EstadosConsulta";
import { Cita } from "../Cita";

describe("Cita: mostrar informacion", () => {
    it("debe mostrar la informacion completa de la cita por medio del metodo mostrarInfo", () => {
        const fecha = new Date("2025-06-01T10:00:00.000Z")
        const cita = new Cita(
            "cita001",
            "pac001",
            "med001",
            fecha,
            "11:40",
            "Consulta General",
            "Pendiente"
        )

        const info = cita.mostrarInfo()

        expect(info).toEqual({
            id : "cita001",
            pacienteId : "pac001",
            medicoId : "med001",
            fecha: fecha,
            hora : "11:40",
            motivoConsulta : "Consulta General",
            estado : "Pendiente"
        })
    })
})


describe("Cita: cambiar estado", () => {
    it("La cita debe cambiar su estado por medio del metodo actualizarEstado", () => {
        const cita = new Cita(
            "cita001",
            "pac001",
            "med001",
            new Date(),
            "11:40",
            "Consulta General",
            "Pendiente"
        )

        cita.actualizarEstado(EstadoConsulta.Completada)

        expect(cita.estado).toBe(EstadoConsulta.Completada)
    })
})


describe("Cita: reprogramar cita", () => {
    it("La cita debe cambiar su fecha y hora al reprogramarse por medio del metodo reprogramarCita", () => {
        const cita = new Cita(
            "cita001",
            "pac001",
            "med001",
            new Date("2025-05-01T06:00:00.000Z"),
            "11:40",
            "Consulta General",
            "Pendiente"
        )

        const nuevaFecha = new Date("2025-06-01T10:00:00.000Z")
        const nuevaHora = "14:00"

        cita.reprogramarCita(nuevaFecha, nuevaHora)

        expect(cita.fecha).toEqual(nuevaFecha)
        expect(cita.hora).toBe(nuevaHora)
    })
})


describe("Cita: devolver fecha completa", () => {
    it("la cita debe devolver la fecha completa", () => {
        const cita = new Cita(
            "cita001",
            "pac001",
            "med001",
            new Date("2025-05-01T06:00:00.000Z"),
            "11:40",
            "Consulta General",
            "Pendiente"
        )

        const fechaEsperada = new Date("2025-05-01T11:40:00");

        const fechaObtenida = cita.obtenerFecha()

        expect(fechaObtenida).toEqual(fechaEsperada)
    })
})