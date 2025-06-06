import type { IPacienteInfo } from "src/types/IPacienteInfo";
import { PacienteIcon } from "../icons/Paciente";
import { PesoIcon } from "../icons/Peso";
import { EstaturaIcon } from "../icons/Estatura";
import { GeneroIcon } from "../icons/Genero";
import { EdadIcon } from "../icons/Edad";

export function PacienteCard({paciente, eliminar}: {paciente: IPacienteInfo, eliminar:(id:string) => void}){
    const {id, nombre, apellido, telefono, direccion, dui, peso, edad, altura, sexo } = paciente
    return (
        <div className="card flex flex-col justify-between bg-white  rounded-md p-4 hover:shadow-md hover:shadow-zinc-400 transition-all">
            <picture className="flex justify-center text-indigo-500 ">
                <PacienteIcon className="w-20" />
            </picture>
            <div>
                <p><span className="text-indigo-600">Paciente:</span> {nombre + ' ' + apellido}</p>
                <p><span className="text-indigo-600">Dui:</span> {dui}</p>
                <p><span className="text-indigo-600">Telefono:</span> {telefono}</p>
                <p><span className="text-indigo-600">Direccion:</span> {direccion}</p>
            </div>
            <div className="grid grid-cols-2 gap-1.5">
                <h2 className="col-span-2 text-base text-center text-indigo-600">Informacion Complementaria</h2>
                <p className="flex gap-1"><span className="text-indigo-600"><GeneroIcon className="w-6" /> </span> {sexo}</p>
                <p className="flex gap-1"><span className="text-indigo-600"><EdadIcon className="w-6" /> </span> {edad} años</p>
                <p className="flex gap-1"><span className="text-indigo-600"><PesoIcon className="w-6"/> </span> {peso} Kg</p>
                <p className="flex gap-1"><span className="text-indigo-600"><EstaturaIcon className="w-6"/> </span> {altura} metros</p>
            </div>
            <div className="">
                <span className="text-indigo-600">Citas:</span>
                <ul className="flex flex-col items-start justify-center list-disc pl-7">
                            
                </ul>
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-center py-2">
                <a
                href={`/agendarCita/${id}`}   
                className="btn-card px-3 py-1 bg-indigo-400  dark:hover:bg-indigo-700 rounded-md text-xs text-white hover:bg-indigo-500 transition-all cursor-pointer"
                >Agendar Cita
                </a>
        
                <a href={`/pacientes-form/${id}`}
                className="btn-card px-3 py-1 bg-indigo-400  dark:hover:bg-indigo-700 rounded-md text-xs text-white hover:bg-indigo-500 transition-all"
                >Editar Paciente</a>
                        
                <button
                onClick={() => eliminar(id)}
                className="btn-card px-3 py-1 bg-indigo-400 dark:hover:bg-indigo-700 rounded-md text-xs text-white cursor-pointer hover:bg-indigo-500 transition-all"
                >Eliminar Paciente</button>
            </div>
        </div>
    )
}