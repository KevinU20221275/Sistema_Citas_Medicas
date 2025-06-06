import { useCurrentPath } from "src/store/useCurrentPath";
import { CitaIcon } from "./icons/CitaIcon";
import { MedicoIcon } from "./icons/Medico";
import { PacienteIcon } from "./icons/Paciente";
import { useEffect, useState } from "react";

export function AsideMenu(){
    const currentPath = useCurrentPath()
    const [isClient, setIsClient] = useState(false)
    
    useEffect(() => {
        setIsClient(true)
    }, [])
    
    if (!isClient) return null

    return (
        <ul className="flex flex-col gap-1">
            <li>
                <a href="/medicos"
                className={`flex items-center gap-1.5 px-5 py-2 rounded-md ${currentPath === '/medicos' ? 'bg-indigo-600 nav-active text-white hover:bg-indigo-700' : 'hover:bg-indigo-400 nav-inactive'} hover:text-white transition-all`}
                >
                    <MedicoIcon className={'w-5'}/>
                    Medicos
                </a>
            </li>
            <li>
                <a href="/pacientes"
                className={`flex items-center gap-1.5 px-5 py-2 rounded-md ${currentPath === '/pacientes' ? 'bg-indigo-600 nav-active text-white hover:bg-indigo-700' : 'hover:bg-indigo-400 nav-inactive'} hover:text-white transition-all`}
                >
                    <PacienteIcon className={'w-5'}/>
                    Pacientes
                </a>    
            </li>
            <li>
                <a href="/citas"
                className={`flex items-center gap-1.5 px-5 py-2 rounded-md ${currentPath === '/citas' ? 'bg-indigo-600 nav-active text-white hover:bg-indigo-700' : 'hover:bg-indigo-400 nav-inactive'} hover:text-white transition-all`}
                >
                    <CitaIcon className={'w-5'} />
                    Citas
                </a>
            </li>
        </ul>
    )
}