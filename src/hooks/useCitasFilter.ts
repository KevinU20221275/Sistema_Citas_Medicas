import { useMemo, useState } from "react";
import { useCitasDetalladas } from "./useCitasDetalladas";

export const CITAS_FILTERS = {
    TODAS: 'all',
    PROXIMAS: 'proximas',
}

export const CITA_ESTADO_FILTERS = {
    TODOS : 'all',
    PENDIENTE : 'Pendiente',
    CANCELADA : 'Cancelada',
    COMPLETADA : 'Completada'
}

export function useCitasFilter(){
    const { todasLasCitasDetalladas, citasDetalladasProximas } = useCitasDetalladas()
    const [filters, setFilters] = useState({
        citas: CITAS_FILTERS.TODAS,
        medico: '',
        paciente: '',
        estado: CITA_ESTADO_FILTERS.TODOS
    })

    const citasFiltradas = useMemo(() => {
        const baseCitas = filters.citas === CITAS_FILTERS.PROXIMAS ? citasDetalladasProximas : todasLasCitasDetalladas;
        
        return baseCitas.filter((cita) => {
            const filterPorMedico = filters.medico ? cita.medico.toLocaleLowerCase().includes(filters.medico.toLocaleLowerCase()) : true;

            const filterPorPaciente = filters.paciente ? cita.paciente.toLocaleLowerCase().includes(filters.paciente.toLocaleLowerCase()) : true;

            const filterPorEstado = !filters.estado || filters.estado === CITA_ESTADO_FILTERS.TODOS ? true : cita.estado === filters.estado

            return filterPorMedico && filterPorPaciente && filterPorEstado
        })
    }, [filters, todasLasCitasDetalladas, citasDetalladasProximas])


    return { citasFiltradas, setFilters, filters}

}