import type { DiaSemana } from "./DiaSemana";

export interface IHorarioInfo {
    id : string,
    medicoId : string,
    dia: DiaSemana,
    horaInicio: string,
    horaFin: string,
}