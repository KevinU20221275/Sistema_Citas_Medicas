import { useEffect, useMemo, useState } from "react"
import { useCitaStore } from "src/store/useCitasStore"
import { usePacienteStore } from "src/store/usePacientesStore"
import { EstadoConsulta } from "src/types/EstadosConsulta"
import type { ICita } from "src/types/ICitaInfo"
import { CitaIcon } from "../icons/CitaIcon"
import { useHorariosStore } from "src/store/useHorariosStore"
import { getCitasDisponibles } from "src/lib/getCitasDisponibles"
import { useMedicosFilters } from "src/hooks/useMedicosFilter"
import { validarDiaSeleccionado } from "src/lib/validarDiaSeleccionado"
import { MedicosFilterPanel } from "../medicos/MedicosFilterView"

export function CitaForm({id} : {id?:string}){
    const paramId = id === "nuevaCita" ? undefined : id
    const citas = useCitaStore((state) => state.citas)
    const agregarCita = useCitaStore((state) => state.agregarCita)
    const pacientes  = usePacienteStore((state) => state.pacientes)
    const horarios = useHorariosStore((state) => state.horarios)

    const [citaData, setCitaData] = useState<ICita>({
        id: crypto.randomUUID(),
        pacienteId: '',
        medicoId: '',
        fecha: new Date(),
        hora: '',
        motivoConsulta: '',
        estado : EstadoConsulta.Pendiente
    })

    const [fechaOperar, setFechaOperar] = useState<Date>()

    const {changeFilter, medicosFiltrados, filter} = useMedicosFilters()
    const [citasDisponibles, setCitasDisponibles] = useState<string[]>([])

    const [errors, setErrors] = useState({
        fechaError : '',
        horaError : ''
    })

    useEffect(() => {
        if (paramId){
            setCitaData((prev) => ({
                ...prev,
                pacienteId : paramId
            }))
        }
    }, [paramId])

    const medicoHorarios = useMemo(() => {
        if (citaData.medicoId){
            const horariosFiltrados = horarios.filter((h) => h.medicoId === citaData.medicoId)
            return horariosFiltrados
        } 
        []
    }, [citaData.medicoId])

    const validarFecha = useMemo(() => {
        if (medicoHorarios && medicoHorarios.length > 0 && fechaOperar){
            const {success, message, horariosDelDia} =  validarDiaSeleccionado(fechaOperar, medicoHorarios)

            if (success){
                if (horariosDelDia) {
                    const citas = getCitasDisponibles(citaData.fecha, horariosDelDia, citaData.medicoId)
                    setCitasDisponibles(citas)
                }
            } else {
                setCitasDisponibles([])
                if (message){
                    setErrors(prev => ({
                        ...prev,
                        fechaError: message
                    }))
                }
            }
        }
    }, [citaData.fecha])

    const handleSubmit = () => {
        agregarCita(citaData)
    }

    return (
        <section className="p-6">
            <h3 className="text-2xl text-center text-indigo-600 font-medium">Complete la siguiente informacion</h3>
            <MedicosFilterPanel className={''} filter={filter} changeFilter={changeFilter} />

            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-3">
                <form action=""
                onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit()
                }}
                className="grid grid-cols-2 gap-5 w-full md:col-span-2"
                >
                    <fieldset>
                        <label htmlFor="paciente" className="block mb-1">Paciente <span className="text-red-600">*</span></label>
                        <select name="paciente" id="paciente" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setCitaData({
                            ...citaData,
                            pacienteId : e.target.value
                        })}
                        value={citaData.pacienteId}
                        >   
                            <option value="">Seleccione el paciente</option>
                        {
                            pacientes.map((p) => <option key={p.id} value={p.id}>{p.nombre + ' ' + p.apellido}</option>)
                        }
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="medico" className="block mb-1">Medico <span className="text-red-600">*</span></label>
                        <select name="medico" id="medico" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setCitaData({
                            ...citaData,
                            medicoId : e.target.value
                        })}
                        defaultValue={citaData.medicoId}
                        >   
                            <option value="">Seleccione el Medico</option>
                        {
                            medicosFiltrados.map((p) => <option key={p.id} value={p.id}>{p.nombre + ' ' + p.apellido}</option>)
                        }
                        </select>
                    </fieldset>

                    {
                        citaData.medicoId && (
                            <fieldset className="col-span-2 flex gap-2">
                                <div>
                                    <h5>Dias de Trabajo del Medico: </h5>
                                    {
                                        medicoHorarios?.map((h) => <span key={h.id} className="text-xs bg-indigo-400 text-white inline-block p-1 rounded-md mr-1">{h.dia} : {h.horaInicio} - {h.horaFin}</span>)
                                    }
                                    {
                                        medicoHorarios?.length === 0 && <p className="text-xs text-red-600">Este medico no tiene horarios Seleccione otro</p>
                                    }
                                </div>
                            </fieldset>
                        )
                    }

                    <fieldset>
                        <label htmlFor="fecha" className="block mb-1">Fecha <span className="text-red-600">*</span></label>
                        <input type="date" id="fecha" placeholder="12-03-2025" required
                        className={`p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full ${!citaData.medicoId && 'pointer-events-none opacity-20'}`}
                        onChange={(e) => {
                            setErrors(prev => ({
                                ...prev,
                                fechaError: ''
                            }))

                            const [year, month, day] = e.target.value.split("-").map(Number)

                            setFechaOperar(new Date(e.target.value))

                            setCitaData({
                                ...citaData,
                                fecha : new Date(year, month - 1, day)
                            })
                        }}
                        defaultValue={citaData.fecha.toISOString().split("T")[0]}
                        />
                        <span className="text-red-600 text-xs">{errors.fechaError}</span>
                    </fieldset>

                    <fieldset>
                        <label htmlFor="hora" className="block mb-1">Hora <span className="text-red-600">*</span></label>
                        <select name="hora" id="hora" required
                        className={`p-2 border-[1px] rounded-lg bg-white w-full
                        ${(errors.fechaError || !fechaOperar || !citaData.medicoId) && 'pointer-events-none border-1px opacity-20 cursor-not-allowed'} 
                        ${errors.horaError ? 'border-red-600' : 'border-zinc-300'}`}
                        value={citaData.hora}
                        onChange={(e) =>
                        setCitaData({
                            ...citaData,
                            hora: e.target.value,
                        })
                        }
                        disabled={!citasDisponibles.length}
                        >
                            <option value="">Seleccione una hora</option>
                            {citasDisponibles.map((hora) => <option key={hora} value={hora}>{hora}</option>)}
                        </select>
                    </fieldset>

                    <fieldset className={`col-span-2`}>
                        <label htmlFor="motivoConsulta" className="block mb-1">Motivo de Consulta <span className="text-red-600">*</span></label>
                        <textarea  id="motivoConsulta" placeholder="Consulta general" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full resize-none" 
                        onChange={(e) => setCitaData({
                            ...citaData,
                            motivoConsulta : e.target.value
                        })}
                        defaultValue={citaData.motivoConsulta}
                        disabled={!citaData.medicoId || !citaData.hora}
                        />
                    </fieldset>

                    <fieldset className="col-span-2 flex items-center justify-center">
                        <button className="bg-indigo-400 text-white rounded-lg py-1.5 px-8 cursor-pointer hover:bg-indigo-500">Agendar</button>
                    </fieldset>
                </form>
                <div className="w-full hidden lg:flex justify-center items-start">
                    <CitaIcon className={'w-72 text-indigo-500'} />
                </div>
            </article>
        </section>
    )
}