import { create } from "zustand";
import { Paciente } from "src/models/Paciente";
import type { IPacienteInfo } from "src/types/IPacienteInfo";

export const pacientesIniciales = [
  new Paciente("pac001","Andrea","Martínez","12345678-9","7888-4321","Col. Médica, San Salvador",28,"Femenino",58.5,1.65),
  new Paciente("pac002","Roberto","Hernández","23456789-0","7011-3344","Santa Ana Centro",35,"Masculino",75.2,1.78),
  new Paciente("pac003","Elías","Castro","34567890-1","7899-1122","Soyapango, San Salvador",22,"No binario",63.0,1.72)
];


interface State {
    pacientes: Paciente[],
    agregarPaciente : (paciente : IPacienteInfo) => void;
    actualizarPaciente: (paciente : IPacienteInfo) => void;
    getPacienteById : (id:string) => Paciente | undefined;
    eliminarPaciente: (id:string) => void;
}

export const usePacienteStore = create<State>((set, get) => ({
    pacientes : pacientesIniciales,
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