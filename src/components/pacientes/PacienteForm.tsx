// import hooks
import { useEffect, useRef, useState } from "react";
// import stores
import { usePacienteStore } from "src/store/usePacientesStore";
// import types
import type { IPacienteInfo } from "src/types/IPacienteInfo";
import { Generos } from "src/types/Genero";
// import icons
import { PacienteIcon } from "../icons/Paciente";
// import helper
import { validatePacientForm } from "src/lib/validarPacienteForm";
// components
import { ModalAlert } from "../ModalAlert";
// const
import { INITIAL_STATE_PACIENTE_FORM, INITIAL_STATE_PACIENTE_FORM_ERRORS } from "@src/const/initialsStates";

export function PacienteForm({id} : {id? : string}){
    const paramId = (id === "nuevoPaciente") ? undefined : id
    const {getPacienteById, actualizarPaciente, agregarPaciente} = usePacienteStore((state) => state)
    const [showModal, setShowModal] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [pacienteData, setPacienteData] = useState<IPacienteInfo>({
        ...INITIAL_STATE_PACIENTE_FORM,
        id : crypto.randomUUID()
    })
    const [errors, setErrors] = useState(INITIAL_STATE_PACIENTE_FORM_ERRORS)


    useEffect(() => {
        if (paramId){
            const paciente = getPacienteById(paramId)
            if (paciente){
                setPacienteData(paciente)
            }
        }
    }, [paramId, getPacienteById])

    const handleSubmit = () => {
        const {isValid, error} = validatePacientForm(pacienteData)
        if (!isValid) {
            setErrors(error)
            return
        }

        if (paramId){
            actualizarPaciente(pacienteData)
        } else {
            agregarPaciente(pacienteData)
        }
        setShowModal(true)
        formRef.current?.reset()
        setPacienteData({
            ...INITIAL_STATE_PACIENTE_FORM,
            id : crypto.randomUUID()
        })
    }

    return (
        <section className="p-6">
            <h3 className="text-2xl text-center text-indigo-600 font-medium">Ingrese la informacion del paciente</h3>
            {showModal && <ModalAlert redirect="/pacientes" mensaje={`Paciente ${paramId ? 'actualizado' : 'agregado'} con exito`} closeModal={setShowModal} isEditing={paramId} />}
            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-3">
                <form action=""
                onSubmit={(e) => {
                    e.preventDefault()
                    setErrors(INITIAL_STATE_PACIENTE_FORM_ERRORS)
                    handleSubmit()
                }}
                className="grid grid-cols-2 gap-5 w-full md:col-span-2"
                >
                    <fieldset>
                        <label htmlFor="nombre" className="block mb-1">Nombre</label>
                        <input type="text" id="nombre" placeholder="Juan Simon" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            nombre : e.target.value
                        })}
                        defaultValue={pacienteData.nombre}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="apellido" className="block mb-1">Apellido</label>
                        <input type="text" id="apellido" placeholder="Perez Gonzales" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            apellido : e.target.value
                        })}
                        defaultValue={pacienteData.apellido}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="dui" className="block mb-1">Dui</label>
                        <input type="text" id="dui" placeholder="09090909-8" maxLength={10}  required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            dui : e.target.value
                        })}
                        defaultValue={pacienteData.dui}
                        />
                        <span className="text-xs text-red-600">{errors.duiError}</span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="edad" className="block mb-1">Edad</label>
                        <input type="number" id="edad" placeholder="20" min={1} max={120} 
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            edad : parseInt(e.target.value)
                        })}
                        defaultValue={pacienteData.edad}
                        />
                        <span className="text-xs text-red-600">{errors.edadError}</span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="telefono" className="block mb-1">Telefono</label>
                        <input type="text" id="telefono" placeholder="7875-9090" maxLength={9} minLength={9}
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full" 
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            telefono : e.target.value
                        })}
                        defaultValue={pacienteData.telefono}
                        />
                        <span className="text-xs text-red-600">{errors.telefonoError}</span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="direccion" className="block mb-1">Direccion</label>
                        <input type="text" id="direccion" placeholder="Barrio el Centro" 
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            direccion : e.target.value
                        })}
                        defaultValue={pacienteData.direccion}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="genero" className="block mb-1">Generos</label>
                        <select name="genero" id="genero"
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            sexo : e.target.value
                        })}
                        value={pacienteData.sexo}
                        >
                            <option value="">Seleccione el Generos</option>
                            <option value={Generos.Masculino}>{Generos.Masculino}</option>
                            <option value={Generos.Femenino}>{Generos.Femenino}</option>
                            <option value={Generos.NoBinario}>{Generos.NoBinario}</option>
                            <option value={Generos.PrefieroNoDecirlo}>{Generos.PrefieroNoDecirlo}</option>
                            <option value={Generos.Otro}>{Generos.Otro}</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="peso" className="block mb-1">Peso (Kg)</label>
                        <input type="text" id="peso" placeholder="80" maxLength={3}
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            peso : parseFloat(e.target.value)
                        })}
                        defaultValue={pacienteData.peso}
                        />
                        <span className="text-xs text-red-600">{errors.pesoError}</span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="altura" className="block mb-1">Altura (Metros)</label>
                        <input type="text" id="altura" placeholder="1.78" maxLength={4} 
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            altura : parseFloat(e.target.value)
                        })}
                        defaultValue={pacienteData.altura}
                        />
                        <span className="text-xs text-red-600">{errors.alturaError}</span>
                    </fieldset>
                    <fieldset className="col-span-2 flex items-center justify-center">
                        <button className="bg-indigo-400 text-white rounded-lg py-1.5 px-8 cursor-pointer hover:bg-indigo-500">Agregar</button>
                    </fieldset>
                </form>
                <div className="w-full hidden lg:flex justify-center items-center">
                    <PacienteIcon className={'w-72 text-indigo-500'} />
                </div>
            </article>
        </section>
    )
}