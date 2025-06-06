import { getCitasDisponibles } from "@src/lib/getCitasDisponibles"
import { validarDiaSeleccionado } from "@src/lib/validarDiaSeleccionado"
import { useHorariosStore } from "@src/store/useHorariosStore"
import { useEffect, useMemo, useState } from "react"

export function useCitasDisponibles({medicoId, fechaCita}:{medicoId:string, fechaCita:string}){
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
    }, [medicoId, horarios])
    
    useEffect(() => {
        if (medicoHorarios && medicoHorarios.length > 0 && fechaOperar){
            const {success, message, horariosDelDia} =  validarDiaSeleccionado(fechaOperar, medicoHorarios)
            const parsedFecha = new Date(fechaCita)
    
            if (success){
                if (horariosDelDia && medicoId) {
                    const citas = getCitasDisponibles(parsedFecha, horariosDelDia, medicoId)
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
    }, [fechaCita, fechaOperar, medicoHorarios, medicoId])

    return {citasDisponibles, medicoHorarios, fechaError, setFechaOperar,fechaOperar}
}