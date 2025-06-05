import type { EstadoConsulta } from "src/types/EstadosConsulta";
import type { ICita } from "src/types/ICitaInfo";

export class Cita {
    constructor(
        public id: string,
        public pacienteId: string,
        public medicoId: string,
        public fecha: Date,
        public hora: string,
        public motivoConsulta: string,
        public estado : string
    ) {}

    public mostrarInfo() : ICita {
        return {
            id : this.id,
            pacienteId : this.pacienteId,
            medicoId : this.medicoId,
            fecha : this.fecha,
            hora : this.hora,
            motivoConsulta : this.motivoConsulta,
            estado: this.estado
        }
    }

    public reprogramarCita(fecha: Date, hora: string): void {
        this.fecha = fecha
        this.hora = hora
    }

    public actualizarEstado(nuevoEstado : EstadoConsulta) : void {
        this.estado = nuevoEstado
    }

    public obtenerFecha() : Date {
        return new Date(`${this.fecha.toDateString()} ${this.hora}`)
    }
}
