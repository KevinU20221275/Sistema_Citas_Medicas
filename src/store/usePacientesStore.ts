import { create } from "zustand";
import { Paciente } from "src/models/Paciente";
import type { IPacienteInfo } from "src/types/IPacienteInfo";

interface State {
    pacientes: Paciente[],
    agregarPaciente : (paciente : IPacienteInfo) => void;
    actualizarPaciente: (paciente : IPacienteInfo) => void;
    getPacienteById : (id:string) => Paciente | undefined;
    eliminarPaciente: (id:string) => void;
}

export const usePacienteStore = create<State>((set, get) => ({
    pacientes : [],
    agregarPaciente : (data) => {
        const nuevoPaciente = new Paciente(
            data.id,
            data.nombre,
            data.apellido,
            data.dui,
            data.telefono,
            data.direccion,
            data.edad,
            data.sexo,
            data.peso,
            data.altura
        )

        set((state) => ({pacientes : [...state.pacientes, nuevoPaciente]}))
    },
    actualizarPaciente: (data) => {
        set((state) => {
            const index = state.pacientes.findIndex((p) => p.id === data.id)

            if (index === -1) return state;

            const paciente = state.pacientes[index]
            paciente.nombre = data.nombre;
            paciente.apellido = data.apellido;
            paciente.dui = data.dui;
            paciente.telefono = data.telefono;
            paciente.direccion = data.direccion;
            paciente.edad = data.edad;
            paciente.sexo = data.sexo;
            paciente.peso = data.peso;
            paciente.altura = data.altura;

            const pacientesActualizados = [...state.pacientes]
            pacientesActualizados[index] = paciente;

            return {pacientes : pacientesActualizados}
        })
    },
    getPacienteById: (id) => get().pacientes.find((paciente) => paciente.id === id),
    eliminarPaciente: (id) => {
        set((state) => ({
            pacientes: state.pacientes.filter((paciente) => paciente.id !== id)
        }))
    },
}))