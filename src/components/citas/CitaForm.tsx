// hooks
import { useEffect, useRef, useState } from "react"
// stores
import { useCitaStore } from "src/store/useCitasStore"
import { usePacienteStore } from "src/store/usePacientesStore"
// types
import type { ICita } from "src/types/ICitaInfo"
// icons
import { CitaIcon } from "../icons/CitaIcon"
// custom hooks
import { useMedicosFilters } from "src/hooks/useMedicosFilter"
// components
import { ModalAlert } from "../ModalAlert"
import { MedicosFilterPanel } from "../medicos/MedicosFilterView"
// const 
import { INITIAL_STATE_CITA_FORM, INITIAL_STATE_CITA_FORM_ERRORS } from "@src/const/initialsStates"
// functions
import { useCitasDisponibles } from "@src/hooks/useCitasDisponibles"

export function CitaForm({id} : {id?:string}){
    const paramId = id === "nuevaCita" ? undefined : id
    const [citaData, setCitaData] = useState<ICita>({
        ...INITIAL_STATE_CITA_FORM,
        id : crypto.randomUUID()
    })
    const {citasDisponibles, medicoHorarios, fechaError, setFechaOperar, fechaOperar} = useCitasDisponibles({medicoId : citaData.medicoId, fechaCita : citaData.fecha})
    const agregarCita = useCitaStore((state) => state.agregarCita)
    const pacientes  = usePacienteStore((state) => state.pacientes)
    const {changeFilter, medicosFiltrados, filter} = useMedicosFilters()
    const [errors, setErrors] = useState(INITIAL_STATE_CITA_FORM_ERRORS)
    const [showModal, setShowModal] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)

    useEffect(() => {
        if (paramId){
            setCitaData((prev) => ({
                ...prev,
                pacienteId : paramId
            }))
        }
    }, [paramId])

    useEffect(() => {
        if (fechaError){
            setErrors((prev) => ({
                ...prev,
                fechaError : fechaError
            }))
        } else {
            setErrors((prev) => ({
                ...prev,
                fechaError : ''
            }))
        }
    }, [citaData.fecha])

    const handleSubmit = () => {
        if (medicoHorarios?.length === 0) {
            setErrors((prev) => ({
                ...prev,
                medicoHorariosError : 'El medico seleccionado no tiene horarios, por favor seleccione otro medico'
            }))
            return
        }
        setShowModal(true)
        setCitaData({
            ...INITIAL_STATE_CITA_FORM,
            id : crypto.randomUUID()
        })
        formRef.current?.reset()
        agregarCita(citaData)
    }

    return (
        <section className="p-6">
            <h3 className="text-2xl text-center text-indigo-600 font-medium">Complete la siguiente informacion</h3>
            <MedicosFilterPanel className={''} filter={filter} changeFilter={changeFilter} />
            {showModal && <ModalAlert redirect="/citas" mensaje={'Cita Agendada con exito'} closeModal={setShowModal} />}

            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-3">
                <form ref={formRef} action=""
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
                            medicoId : e.target.value,
                            fecha : new Date(),
                            hora: ''
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
                                        medicoHorarios?.map((h) => <span key={h.id} className="text-xs bg-indigo-400 dark:bg-indigo-500 text-white inline-block p-1 rounded-md mr-1">{h.dia} : {h.horaInicio} - {h.horaFin}</span>)
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
                        className={`p-2 border-[1px] border-zinc-300 rounded-lg bg-white  w-full resize-none ${(!citaData.medicoId || !citaData.hora) && 'opacity-20'}`} 
                        onChange={(e) => setCitaData({
                            ...citaData,
                            motivoConsulta : e.target.value
                        })}
                        defaultValue={citaData.motivoConsulta}
                        disabled={!citaData.medicoId || !citaData.hora}
                        />
                    </fieldset>

                    <fieldset className="col-span-2 flex items-center justify-center">
                        <button className="btn-card bg-indigo-400 text-white rounded-lg py-1.5 px-8 cursor-pointer hover:bg-indigo-600">Agendar</button>
                    </fieldset>
                </form>
                <div className="w-full hidden lg:flex justify-center items-start">
                    <CitaIcon className={'w-72 text-indigo-500 icon-form'} />
                </div>
            </article>
        </section>
    )
}