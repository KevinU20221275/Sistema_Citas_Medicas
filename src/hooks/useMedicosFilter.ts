import { useMemo, useState } from "react";
import { useHorariosStore } from "src/store/useHorariosStore";
import { useMedicoStore } from "src/store/useMedicoStore";

export function useMedicosFilters(){
    const [filter, setFilter] = useState<string>('all')
    const medicos = useMedicoStore.getState().medicos
    const horarios = useHorariosStore.getState().horarios

    const changeFilter = (newFilter: string) => {
        setFilter(newFilter)
    }

    const medicosSelect = useMemo(() => {
        if (filter == 'all') return medicos
    
        return medicos.filter((m) => m.especialidad.toLocaleLowerCase() === filter.toLocaleLowerCase())
    }, [filter, medicos, horarios])

    return { changeFilter, medicosFiltrados : medicosSelect, filter }
}