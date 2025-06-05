import type { CitaDetallada } from "src/types/definitions"
import { useCitaStore } from "src/store/useCitasStore"
import { useMedicoStore } from "src/store/useMedicoStore"
import { usePacienteStore } from "src/store/usePacientesStore"

export function useCitasDetalladas(){
    const citas = useCitaStore((state) => state.citas)
    const pacientes = usePacienteStore((state) => state.pacientes)
    const medicos = useMedicoStore((state) => state.medicos)

    const citasProximas = [...citas]
    .filter(c => c.obtenerFecha() > new Date())
    .toSorted((a,b) => a.obtenerFecha().getTime() - b.obtenerFecha().getTime())

    const todasLasCitasOrdenadasPorFecha = [...citas]
    .toSorted((a,b) => a.obtenerFecha().getTime() - b.obtenerFecha().getTime())
    
    const todasLasCitasDetalladas : CitaDetallada[] = todasLasCitasOrdenadasPorFecha.map((c) => {
        const paciente = pacientes.find(p => p.id === c.pacienteId)
        const medico = medicos.find(m => m.id === c.medicoId)
    
        return {
            ...c,
            paciente: paciente ? `${paciente.nombre + ' ' + paciente.apellido}` : 'Desconocido',
            medico: medico ? `${medico.nombre + ' ' + medico.apellido}` : 'Desconocido'
        }
    })

    const citasDetalladasProximas : CitaDetallada[] = citasProximas.map((c) => {
        const paciente = pacientes.find(p => p.id === c.pacienteId)
        const medico = medicos.find(m => m.id === c.medicoId)
    
        return {
            ...c,
            paciente: paciente ? `${paciente.nombre + ' ' + paciente.apellido}` : 'Desconocido',
            medico: medico ? `${medico.nombre + ' ' + medico.apellido}` : 'Desconocido'
        }
    })

    return { todasLasCitasDetalladas, citasDetalladasProximas }
}