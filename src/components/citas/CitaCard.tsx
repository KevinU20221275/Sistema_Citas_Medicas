// import store
import { CitaIcon } from "../icons/CitaIcon";
import { EstadoConsulta } from "src/types/EstadosConsulta";
import { Calendario } from "../icons/Calendario";
import { RelojIcon } from "../icons/Reloj";

export interface CitaDetallada {
    paciente: string;
    medico: string;
    id: string;
    pacienteId: string;
    medicoId: string;
    fecha: Date;
    hora: string;
    motivoConsulta: string;
    estado: string;
}

interface CardProps {
    cita : CitaDetallada;
    reprogramarCita: (id:string, fecha:string, hora:string, medicoId:string) => void
    cambiarEstado: (id:string, estado : string) => void;
    eliminarCita: (id:string) => void;
}

export function CitaCard({cita, reprogramarCita, cambiarEstado, eliminarCita}: CardProps){
    const {id, paciente, pacienteId, medico, medicoId, fecha, hora, motivoConsulta, estado} = cita
    const fechaFormateada = fecha.toLocaleDateString("es-Es", {
        weekday: "long",
        year:"numeric",
        month: "long",
        day : "numeric"
    })

    return (
        <div 
        className={`relative flex flex-col justify-between bg-white border-[1px] rounded-md p-4 hover:shadow-md hover:shadow-zinc-400 transition-all 
        ${estado === EstadoConsulta.Completada ? 'border-green-700' : estado === EstadoConsulta.Cancelada ? 'border-red-600' : 'border-transparent'}
        `}>
            <span 
            className={`absolute right-2 top-2 text-xs rounded-md px-1.5 py-0.5 
                ${estado === EstadoConsulta.Completada ? 'bg-green-700' :
                estado === EstadoConsulta.Cancelada ? 'bg-red-600' : 'bg-zinc-200'
             }`}>{estado}</span>
            <picture className="flex justify-center text-indigo-500">
                <CitaIcon className="w-20" />
            </picture>
            <div>
                <p><span className="text-indigo-600">Paciente:</span> {paciente}</p>
                <p><span className="text-indigo-600">Medico:</span> {medico}</p>
                <p className="flex gap-1"><span className="text-indigo-600"><Calendario className="w-6" /></span> {fechaFormateada}</p>
                <p className="flex gap-1"><span className="text-indigo-600"><RelojIcon className="w-6" /></span> {hora}</p>
            </div>
            <div className="my-1">
                <span className="text-indigo-600">Motivo de Consulta:</span>
                <p> {motivoConsulta}</p>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-center py-2">
                <button
                onClick={() => {
                    reprogramarCita(id, fecha.toDateString(), hora, medicoId)
                }}
                className="px-3 py-1 bg-indigo-400 rounded-md text-xs text-white hover:bg-indigo-500 transition-all cursor-pointer"
                >Reprogramar Cita
                </button>

                <button
                onClick={() => {
                    cambiarEstado(id, estado)
                }}
                className="px-3 py-1 bg-indigo-400 rounded-md text-xs text-white hover:bg-indigo-500 transition-all cursor-pointer"
                >Actualizar Estado
                </button>
                
                <button
                onClick={() => eliminarCita(id)}
                className="px-3 py-1 bg-indigo-400 rounded-md text-xs text-white cursor-pointer hover:bg-indigo-500 transition-all"
                >Eliminar Cita</button>
            </div>
        </div>
    )
}