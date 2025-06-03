import type { ICita } from "src/types/ICitaInfo";

export class Cita {
    constructor(
        public id: string,
        public pacienteId: string,
        public medicoId: string,
        public fecha: Date,
        public hora: string,
        public motivo: string
    ) {}

    public mostrarInfo() : ICita {
        return {
            id : this.id,
            pacienteId : this.pacienteId,
            medicoId : this.medicoId,
            fecha : this.fecha,
            hora : this.hora,
            motivo : this.motivo
        }
    }
}
