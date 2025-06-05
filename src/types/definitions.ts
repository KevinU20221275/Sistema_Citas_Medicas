import type { IHorarioInfo } from "src/types/IHorarioInfo";

export interface FormModalHorarioProps {
    horario?: IHorarioInfo;
    medicoId?: string;
    closeModal: (show:boolean) => void;
    resetHorarioData: (arg:undefined) => void
}

export interface CitaDetallada {
    paciente: string;
    medico: string;
    id: string;
    pacienteId: string;
    medicoId: string;
    fecha: Date;
    hora: string;
    motivoConsulta: string;
    estado: string;
}