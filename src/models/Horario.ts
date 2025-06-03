import type { DiaSemana } from "src/types/DiaSemana";
import type { IHorarioInfo } from "src/types/IHorarioInfo";

export class Horario {
    constructor(
        public id : string,
        public medicoId : string,
        public dia: DiaSemana,
        public horaInicio: string,
        public horaFin: string,
    ){}

    public mostartInfo() : IHorarioInfo{
        return  {
            id : this.id,
            medicoId : this.medicoId,
            dia : this.dia,
            horaInicio : this.horaInicio,
            horaFin : this.horaFin
        }
    }
}