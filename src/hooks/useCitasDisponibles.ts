import { getCitasDisponibles } from "@src/lib/getCitasDisponibles"
import { validarDiaSeleccionado } from "@src/lib/validarDiaSeleccionado"
import { useHorariosStore } from "@src/store/useHorariosStore"
import { useMemo, useState } from "react"

export function useCitasDisponibles({medicoId, fechaCita}:{medicoId:string, fechaCita:Date}){
    const [citasDisponibles, setCitasDisponibles] = useState<string[]>([])
    const horarios = useHorariosStore.getState().horarios
    const [fechaError, setFechaError] = useState('')
    const [fechaOperar, setFechaOperar] = useState<Date>()

    const medicoHorarios = useMemo(() => {
        if (medicoId){
            const horariosFiltrados = horarios.filter((h) => h.medicoId === medicoId)
            return horariosFiltrados
        } 
        []
    }, [medicoId])
    
    const validarFecha = useMemo(() => {
        if (medicoHorarios && medicoHorarios.length > 0 && fechaOperar){
            const {success, message, horariosDelDia} =  validarDiaSeleccionado(fechaOperar, medicoHorarios)
    
            if (success){
                if (horariosDelDia && medicoId) {
                    const citas = getCitasDisponibles(fechaCita, horariosDelDia, medicoId)
                    setCitasDisponibles(citas)
                    setFechaError('')
                }
            } else {
                setCitasDisponibles([])
                if (message){
                    setFechaError(message)
                }
            }
        }
    }, [fechaCita])

    return {citasDisponibles, medicoHorarios, fechaError, setFechaOperar,fechaOperar}
}