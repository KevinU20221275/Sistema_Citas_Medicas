// import types
import type { IMedicoInfo } from "src/types/IMedicoInfo"
import type { IHorarioInfo } from "src/types/IHorarioInfo";

// import icons
import { MedicoIcon } from "../icons/Medico"
import { UpdateIcon } from "../icons/Update";
import { DeleteIcon } from "../icons/Delete";

// import store
import { useHorariosStore } from "src/store/useHorariosStore"

interface CardProps {
    medico : IMedicoInfo;
    agregarHorario: (id:string) => void;
    actualizarHorario: (horario: IHorarioInfo) => void;
}

export function MedicoCard({medico, agregarHorario, actualizarHorario}: CardProps){
    const {id, nombre, apellido, dui, sexo, telefono, direccion, especialidad} = medico
    const horarios = useHorariosStore((state) => state.horarios)
    const eliminarHorario = useHorariosStore((state) => state.eliminarHorario)

    const horariosDelMedico = horarios.filter((h) => h.medicoId === id)

    return (
        <div className="card flex flex-col justify-between bg-white rounded-md p-4 hover:shadow-md hover:shadow-zinc-400 dark:hover:shadow-zinc-800 transition-all">
            <picture className="flex justify-center text-indigo-500">
                <MedicoIcon className="w-20" />
            </picture>
            <div>
                <p><span className="text-indigo-600">Medico:</span> {nombre + ' ' + apellido}</p>
                <p><span className="text-indigo-600">Especialidad:</span> {especialidad}</p>
                <p><span className="text-indigo-600">Telefono:</span> {telefono}</p>
                <p><span className="text-indigo-600">Direccion:</span> {direccion}</p>
            </div>
            <div className="">
                <span className="text-indigo-600">Horarios:</span>
                <ul className="flex flex-col items-start justify-center list-disc pl-7">
                    {
                        horariosDelMedico.map((h) => (
                            <li key={h.id}>{h.dia}: {h.horaInicio} - {h.horaFin}
                                <button onClick={() => actualizarHorario(h)} className="btn-card bg-indigo-300 p-1 rounded-md cursor-pointer mx-1"><UpdateIcon className="w-4" /></button> 
                                <button onClick={() => eliminarHorario(h.id)} className="bg-red-600 p-1 rounded-md text-white cursor-pointer"><DeleteIcon className="w-4"/></button>
                            </li>
                        ))
                    }
                    {horariosDelMedico.length === 0 && <li>No hay horarios</li>}
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-center py-2">
                <button
                onClick={() => agregarHorario(id)}
                className="btn-card px-3 py-1 bg-indigo-400 rounded-md text-xs text-white hover:bg-indigo-500 transition-all cursor-pointer"
                >Agregar Horario
                </button>

                <a href={`/medicos-form/${id}`}
                className="btn-card px-3 py-1 bg-indigo-400 rounded-md text-xs text-white hover:bg-indigo-500 transition-all"
                >Editar Medico</a>
                
                <button
                className="btn-card px-3 py-1 bg-indigo-400 rounded-md text-xs text-white cursor-pointer hover:bg-indigo-500 transition-all"
                >Eliminar Medico</button>
            </div>
        </div>
    )
}