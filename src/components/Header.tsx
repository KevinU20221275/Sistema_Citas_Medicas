export function HeaderMenu(){
    return (
        <>
            <h2 className="text-indigo-600 text-xl">Sistema Citas Medicas</h2>
            <nav>
                <ul className="flex gap-2">
                    <li>
                        <a href="/"
                        className="flex p-2 px-3 rounded-full hover:bg-indigo-400 hover:text-white text-sm transition-all"
                        >Home</a>
                    </li>
                    <li>
                        <a href={`/pacientes-form/${undefined}`}
                        className="flex p-2 px-3 rounded-full hover:bg-indigo-400 hover:text-white text-sm transition-all"
                        >Agregar Paciente</a>
                    </li>
                    <li>
                        <a href={`/medicos-form/${undefined}`}
                        className="flex p-2 px-3 rounded-full hover:bg-indigo-400 hover:text-white text-sm transition-all"
                        >Agregar Medico</a>
                    </li>
                    <li>
                        <a href="/citas"
                        className="flex p-2 px-3 rounded-full hover:bg-indigo-400 hover:text-white text-sm transition-all"
                        >Agendar Cita</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}