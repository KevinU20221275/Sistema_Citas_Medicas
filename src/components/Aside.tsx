import { CitaIcon } from "./icons/CitaIcon";
import { MedicoIcon } from "./icons/Medico";
import { PacienteIcon } from "./icons/Paciente";

export function AsideMenu(){
    return (
        <ul>
            <li>
                <a href="/medicos"
                className="flex items-center gap-1.5 px-5 py-2 rounded-md hover:bg-indigo-400 hover:text-white transition-all"
                >
                    <MedicoIcon className={'w-5'}/>
                    Medicos
                </a>
            </li>
            <li>
                <a href="/pacientes"
                className="flex items-center gap-1.5 px-5 py-2 rounded-md hover:bg-indigo-400 hover:text-white  transition-all"
                >
                    <PacienteIcon className={'w-5'}/>
                    Pacientes
                </a>    
            </li>
            <li>
                <a href="/citas"
                className="flex items-center gap-1.5 px-5 py-2 rounded-md hover:bg-indigo-400 hover:text-white transition-all"
                >
                    <CitaIcon className={'w-5'} />
                    Citas
                </a>
            </li>
        </ul>
    )
}