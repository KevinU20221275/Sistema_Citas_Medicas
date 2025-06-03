import { create } from "zustand";
import { Horario } from "src/models/Horario";
import type { IHorarioInfo } from "src/types/IHorarioInfo";

interface State {
    horarios: Horario[],
    agregarHorario : (horario : IHorarioInfo) => void;
    actualizarHorario: (horario: IHorarioInfo) => void;
    getHorarioById: (id:string) => Horario | undefined;
    eliminarHorario: (id:string) => void;
}

export const useHorariosStore = create<State>((set, get) => ({
    horarios : [],
    agregarHorario : (data) => {
        const nuevoHorario = new Horario(
            data.id,
            data.medicoId,
            data.dia,
            data.horaInicio,
            data.horaFin
        )
        set((state) => ({horarios : [...state.horarios, nuevoHorario]}))
    },
    actualizarHorario: (data) => {
        set((state) => {
            const index = get().horarios.findIndex((h) => h.id === data.id)

            if (index === -1) return state;

            const horario = state.horarios[index]
            horario.dia = data.dia,
            horario.horaInicio = data.horaInicio,
            horario.horaFin = data.horaFin

            const horariosActualizados = [...state.horarios]
            horariosActualizados[index] = horario;

            return {horarios : horariosActualizados}
        })
    },
    getHorarioById: (id) => get().horarios.find((horario) => horario.id === id),
    eliminarHorario: (id) => {
        set((state) => ({
            horarios: state.horarios.filter((horario) => horario.id !== id)
        }))
    },
}))