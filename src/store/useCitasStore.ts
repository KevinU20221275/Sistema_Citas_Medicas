import { create } from "zustand";
import { Cita } from "src/models/Cita";
import type {ICita} from "src/types/ICitaInfo"
import type { EstadoConsulta } from "src/types/EstadosConsulta";

const citasIniciales: Cita[] = [

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