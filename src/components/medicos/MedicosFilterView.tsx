// import const
import { ESPECIALIDADES_MEDICAS } from "src/const/especialidadesMedicas";

export function MedicosFilterPanel({className, changeFilter, filter}:{className:string, changeFilter: (filter:string) => void, filter:string}){
    return (
        <article className={className}>
            <h4 className="my-2 text-indigo-600">Filtrar Medicos por especialidad:</h4>        
                <div className="flex items-center justify-around max-w-xl gap-1">
                    <button 
                    className={`${filter === 'all' ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-zinc-200 hover:bg-indigo-200'} px-3 py-1 rounded-full cursor-pointer  transition-all`}
                    onClick={() => changeFilter('all')}
                    >Todos</button>
                    {
                        ESPECIALIDADES_MEDICAS.map((e, index) => <button 
                            key={e.especialidad  + index}
                            className={`${filter === e.especialidad ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-zinc-200 hover:bg-indigo-200'} px-3 py-1 rounded-full cursor-pointer  transition-all`}
                            onClick={() => changeFilter(e.especialidad)}
                            >{e.especialidad}</button>)
                    }
                </div>
        </article>
    )
}