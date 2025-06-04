import { useCitaStore } from "src/store/useCitasStore"
import { useMedicoStore } from "src/store/useMedicoStore"
import { usePacienteStore } from "src/store/usePacientesStore"

export function useCitasDetalladas(){
    const citas = useCitaStore((state) => state.citas)
    const pacientes = usePacienteStore((state) => state.pacientes)
    const medicos = useMedicoStore((state) => state.medicos)
    
    const citasDetalladas = citas.map((c) => {
        const paciente = pacientes.find(p => p.id === c.pacienteId)
        const medico = medicos.find(m => m.id === c.medicoId)
    
        return {
            ...c,
            paciente: paciente ? `${paciente.nombre + ' ' + paciente.apellido}` : 'Desconocido',
            medico: medico ? `${medico.nombre + ' ' + medico.apellido}` : 'Desconocido'
        }
    })

    return { citasDetalladas }
}