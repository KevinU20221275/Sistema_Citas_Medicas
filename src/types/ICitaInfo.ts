import type { EstadoConsulta } from "./EstadosConsulta";

export interface ICita {
  id: string;
  pacienteId: string;
  medicoId: string;
  fecha: Date;
  hora: string;
  motivoConsulta: string;
  estado : string;
}
