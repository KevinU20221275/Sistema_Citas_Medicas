import { create } from "zustand";
import { Cita } from "src/models/Cita";
import type {ICita} from "src/types/ICitaInfo"
import type { EstadoConsulta } from "src/types/EstadosConsulta";

const citasIniciales: Cita[] = [
  new Cita(crypto.randomUUID(), "pac001", "med001", new Date("2025-04-12T06:00:00.000Z"), "09:00", "No aplica", "Pendiente"),
  new Cita(crypto.randomUUID(), "pac002", "med002", new Date("2025-04-10T06:00:00.000Z"), "10:00", "No aplica", "Cancelada"),
  new Cita(crypto.randomUUID(), "pac003", "med003", new Date("2025-04-15T06:00:00.000Z"), "11:20", "Paciente ausente", "Completada"),
  new Cita(crypto.randomUUID(), "pac001", "med002", new Date("2025-05-01T06:00:00.000Z"), "14:00", "Control mensual", "Pendiente"),
  new Cita(crypto.randomUUID(), "pac003", "med001", new Date("2025-03-28T06:00:00.000Z"), "15:40", "Consulta de rutina", "Completada"),
  new Cita(crypto.randomUUID(), "pac002", "med003", new Date("2025-04-02T06:00:00.000Z"), "16:00", "No aplica", "Pendiente"),
  new Cita(crypto.randomUUID(), "pac001", "med003", new Date("2025-04-30T06:00:00.000Z"), "08:20", "Dolor de cabeza persistente", "Cancelada"),
  new Cita(crypto.randomUUID(), "pac003", "med002", new Date("2025-03-22T06:00:00.000Z"), "13:00", "Revisión anual", "Completada"),
  new Cita(crypto.randomUUID(), "pac002", "med001", new Date("2025-05-02T06:00:00.000Z"), "09:40", "No aplica", "Pendiente"),
];


interface State {
    citas: Cita[];
    agregarCita : (cita : ICita) => void;
    reprogramarCita : (id:string, fecha:Date, hora:string) => void;
    actualizarEstado : (id: string, nuevoEstado : EstadoConsulta) => void;
    eliminarCita : (id:string) => void;
}

export const useCitaStore = create<State>((set, get) => ({
    citas : citasIniciales,
    agregarCita : (data) => {
        const nuevaCita = new Cita(
            data.id, 
            data.pacienteId,
            data.medicoId,
            data.fecha,
            data.hora,
            data.motivoConsulta,
            data.estado
        )
        set((state) => ({citas : [...state.citas, nuevaCita]}))
    },
    reprogramarCita: (id, fecha, hora) => {
        set((state) => {
            const index = state.citas.findIndex((c) => c.id === id)
            
            if (index === -1) return state;

            const cita = state.citas[index]
            cita.reprogramarCita(fecha, hora)

            const citasActualizadas = [...state.citas]
            citasActualizadas[index] = cita

            return {citas : citasActualizadas}
        })
    },
    actualizarEstado : (id,nuevoEstado) => {
        set((state) => {
            const index = state.citas.findIndex((c) => c.id === id)

            if (index === -1) return state

            const cita = state.citas[index]
            cita.actualizarEstado(nuevoEstado)

            const citasActualizadas = [...state.citas]
            citasActualizadas[index] = cita

            return {citas : citasActualizadas}
        })
    },
    eliminarCita : (id) => {
        set((state) => ({
            citas: state.citas.filter((c) => c.id !== id)
        }))
    },
}))