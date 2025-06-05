import { create } from "zustand";
import { Medico } from "src/models/Medico";
import type { IMedicoInfo } from "src/types/IMedicoInfo";

const instanciasMedico: Medico[] = [
  new Medico("med001", "Laura", "González", "01234567-8", "7888-1234", "Col. Escalón, San Salvador", "Femenino", "Pediatría"),
  new Medico("med002", "Carlos", "Ramírez", "02345678-9", "7555-5678", "Santa Tecla, La Libertad", "Masculino", "Medicina Interna"),
  new Medico("med003", "Alex", "Morales", "03456789-0", "7200-3321", "Soyapango, San Salvador", "No binario", "Psiquiatría"),
];

interface State {
    medicos: Medico[],
    agregarMedico : (medico : IMedicoInfo) => void;
    actualizarMedico : (medico : IMedicoInfo) => void;
    getMedicoById: (id:string) => Medico | undefined;
    eliminarMedico: (id:string) => void;
}

export const useMedicoStore = create<State>((set, get) => ({
    medicos : instanciasMedico,
    agregarMedico : (data) => {
        const nuevoMedico = new Medico(
            data.id,
            data.nombre,
            data.apellido,
            data.dui,
            data.telefono,
            data.direccion,
            data.sexo,
            data.especialidad
        )

        console.log(nuevoMedico.mostrarInfo())
        console.log("agregado")

        set((state) => ({medicos : [...state.medicos, nuevoMedico]}))
    },
    actualizarMedico : (data) => {
        set((state) => {
            const index = state.medicos.findIndex((m) => m.id === data.id);

            if (index === -1) return state;

            const medico = state.medicos[index]
            medico.nombre = data.nombre;
            medico.apellido = data.apellido;
            medico.dui = data.dui;
            medico.telefono = data.telefono;
            medico.direccion = data.direccion;
            medico.sexo = data.sexo;
            medico.especialidad = data.especialidad;

            const medicosActualizados = [...state.medicos];
            medicosActualizados[index] = medico;

            return {medicos : medicosActualizados}
        })
    },
    getMedicoById: (id) => get().medicos.find((medico) => medico.id === id),
    eliminarMedico: (id) => {
        set((state) => ({
            medicos: state.medicos.filter((medico) => medico.id !== id)
        }))
    },
}))