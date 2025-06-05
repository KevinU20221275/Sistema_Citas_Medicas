import { CITA_ESTADO_FILTERS, CITAS_FILTERS } from "src/hooks/useCitasFilter"
import type { CitasFilterPanelProps } from "src/types/definitions"

export function CitasFiltersPanel({className, filters, setFilters} : CitasFilterPanelProps){
    const { medico, paciente, citas, estado } = filters

    return (
        <article className={className}>       
                <div className="grid grid-cols-2 items-center justify-around w-full px-4 gap-4">
                    <fieldset className="col-span-2 flex gap-2 items-center justify-center">
                        <button 
                        className={`${citas === CITAS_FILTERS.TODAS ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-zinc-200 hover:bg-indigo-200'} px-3 py-1 rounded-full cursor-pointer  transition-all`}
                        onClick={() => setFilters(prev => ({
                            ...prev,
                            citas : CITAS_FILTERS.TODAS
                        }))}
                        >Todas</button>

                        <button 
                        className={`${citas === CITAS_FILTERS.PROXIMAS ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-zinc-200 hover:bg-indigo-200'} px-3 py-1 rounded-full cursor-pointer  transition-all`}
                        onClick={() => setFilters(prev => ({
                            ...prev,
                            citas : CITAS_FILTERS.PROXIMAS
                        }))}
                        >Proximas</button>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="searchPaciente" className="block mb-2">Filtrar Citas por Paciente</label>
                        <input type="text" name="searchPaciente" id="searchPaciente" placeholder="Pedro Pereira" className="px-4 bg-white py-2 rounded-md w-full"
                        onChange={(e) => 
                            setFilters(prev => ({
                                ...prev,
                                paciente : e.target.value
                            }))
                        }
                        defaultValue={paciente}
                        />
                    </fieldset>

                    <fieldset>
                        <label htmlFor="searchMedico" className="block mb-2">Filtrar citas por Medico</label>
                        <input type="text" name="searchMedico" id="searchMedico" placeholder="Juan Juarez" className="px-4 bg-white py-2 rounded-md w-full"
                        onChange={(e) => 
                            setFilters(prev => ({
                                ...prev,
                                medico : e.target.value
                            }))
                        }
                        defaultValue={medico}
                        />
                    </fieldset>
                    <fieldset className="col-span-2">
                        <h4 className="text-center">Filtrar por Estado</h4>
                        <div className="flex justify-center items-center gap-2">
                            <button 
                            className={`${estado === CITA_ESTADO_FILTERS.TODOS ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-zinc-200 hover:bg-indigo-200'} px-3 py-1 rounded-full cursor-pointer  transition-all`}
                            onClick={() => setFilters(prev => ({
                                ...prev,
                                estado : CITA_ESTADO_FILTERS.TODOS
                            }))}
                            >Todas</button>

                            <button 
                            className={`${estado === CITA_ESTADO_FILTERS.PENDIENTE ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-zinc-200 hover:bg-indigo-200'} px-3 py-1 rounded-full cursor-pointer  transition-all`}
                            onClick={() => setFilters(prev => ({
                                ...prev,
                                estado : CITA_ESTADO_FILTERS.PENDIENTE
                            }))}
                            >Pendientes</button>

                            <button 
                            className={`${estado === CITA_ESTADO_FILTERS.COMPLETADA ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-zinc-200 hover:bg-indigo-200'} px-3 py-1 rounded-full cursor-pointer  transition-all`}
                            onClick={() => setFilters(prev => ({
                                ...prev,
                                estado : CITA_ESTADO_FILTERS.COMPLETADA
                            }))}
                            >Completadas</button>
                            
                            <button 
                            className={`${estado === CITA_ESTADO_FILTERS.CANCELADA ? 'bg-indigo-500 hover:bg-indigo-600 text-white' : 'bg-zinc-200 hover:bg-indigo-200'} px-3 py-1 rounded-full cursor-pointer  transition-all`}
                            onClick={() => setFilters(prev => ({
                                ...prev,
                                estado : CITA_ESTADO_FILTERS.CANCELADA
                            }))}
                            >Canceladas</button>
                        </div>
                    </fieldset>
                </div>
        </article>
    )
}