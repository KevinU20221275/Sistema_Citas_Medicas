import { useCitaStore } from "src/store/useCitasStore";
import { CitaMedicaInfoCard } from "./CitasMedicasInfoCard";

export function CitasReporte(){
    const citas = useCitaStore((state) => state.citas)
    
    const conteoCitasPorEstado = citas.reduce((acc, cita) => {
        const estado = cita.estado;
        acc[estado] = (acc[estado] || 0) + 1;
        return acc
    }, {} as Record<string, number>)

    return (
        <article className="grid grid-cols-3 gap-2 max-w-xl mx-auto py-6">
            <h4 className="col-span-3 text-center text-indigo-500">Total de Citas : {citas.length}</h4>
            <CitaMedicaInfoCard estadoCita='Pendiente' numeroCitas={conteoCitasPorEstado["Pendiente"]} />
            <CitaMedicaInfoCard estadoCita='Completada' numeroCitas={conteoCitasPorEstado["Completada"]} />
            <CitaMedicaInfoCard estadoCita='Cancelada' numeroCitas={conteoCitasPorEstado["Cancelada"]} />
        </article>
    )
}