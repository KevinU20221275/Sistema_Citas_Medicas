import { EstadoConsulta } from "src/types/EstadosConsulta";

export function CitaMedicaInfoCard({estadoCita, numeroCitas}:{estadoCita:string, numeroCitas: number}){
    const lenght = numeroCitas?.toString()

    return (
        <div 
        className={`bg-white flex flex-col items-center justify-center p-3 rounded-md border-[1px] 
        ${estadoCita === EstadoConsulta.Cancelada ? 'border-red-600' :
        estadoCita === EstadoConsulta.Completada ? 'border-green-600' : 'border-zinc-300'}`} >
            <h5 className="text-indigo-500 text-center">Citas {estadoCita}</h5>
            <div
             className={`flex flex-col items-center justify-center ${lenght?.length > 1 ? 'p-3' : 'p-2'} px-4 rounded-full 
            ${estadoCita === EstadoConsulta.Cancelada ? 'bg-red-600 text-white' :
            estadoCita === EstadoConsulta.Completada ? 'bg-green-600 text-white' : 'bg-zinc-300'}`}
            >
                {numeroCitas ?? 0}
            </div>
        </div>
    )
}