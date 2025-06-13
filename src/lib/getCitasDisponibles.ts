import type { Horario } from "src/models/Horario"
import { useCitaStore } from "src/store/useCitasStore"

export const getCitasDisponibles = (fecha: Date, horarios: Horario[], medicoId: string) =>{
    const citas = useCitaStore.getState().citas
    const posiblesCitas : string[] = []

    if (horarios.length > 0){
        horarios.forEach((h) => {
            let [hi, hiMin] = h.horaInicio.split(":").map(Number)
            let [hf, hfMin] = h.horaFin.split(":").map(Number)

            let inicioEnMin = hi * 60 + hiMin
            const finEnMin = hf * 60 + hfMin
   
            while (inicioEnMin + 20 <= finEnMin){
                const horas = Math.floor(inicioEnMin / 60)
                const minutos = inicioEnMin % 60

                const cita = `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}`
                posiblesCitas.push(cita)
                
                inicioEnMin += 20
            }
        })
    }

    const citasDelDia = citas.filter((c) => {
        const citaFecha = new Date(c.fecha)
        return (
            citaFecha.getFullYear() === fecha.getFullYear() &&
            citaFecha.getMonth() === fecha.getMonth() &&
            citaFecha.getDate() === fecha.getDate() &&
            c.medicoId == medicoId
        )
    })

    const horasOcupadas = new Set(citasDelDia.map((c) => c.hora))

    const disponibles = posiblesCitas.filter((hora) => !horasOcupadas.has(hora))
   
    return disponibles
}
