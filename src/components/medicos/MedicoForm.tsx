// import hooks
import { useEffect, useRef, useState } from "react";
import { useMedicoStore } from "src/store/useMedicoStore";
// import types
import type { IMedicoInfo } from "src/types/IMedicoInfo";
import { Generos } from "src/types/Genero";
// import icons
import { MedicoIcon } from "../icons/Medico";
// import const
import { ESPECIALIDADES_MEDICAS } from "src/const/especialidadesMedicas";
import { INITIAL_STATE_MEDICO_FORM } from "@src/const/initialsStates";
// import components
import { ModalAlert } from "../ModalAlert";
import { validateMedicoForm } from "@src/lib/validarMedicoForm";

export function MedicoForm({id} : {id? : string}){
    const paramId = id === "nuevoMedico" ? undefined : id
    const {getMedicoById, actualizarMedico, agregarMedico} = useMedicoStore((state) => state)
    const [medicoData, setMedicoData] = useState<IMedicoInfo>({
        ...INITIAL_STATE_MEDICO_FORM,
        id : crypto.randomUUID()
    })
    const [showModal, setShowModal] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)
    const [errors,setErrors] = useState({
        duiError : '',
        telefonoError : '',
    })

    useEffect(() => {
        if (paramId){
            const medico = getMedicoById(paramId)
            if (medico){
                setMedicoData(medico)
            }
        }
    }, [paramId, getMedicoById])

    const handleSubmit = () => {
        const {isValid, error} = validateMedicoForm(medicoData)
        if (!isValid){
            setErrors(error)
            return
        }

        if (paramId){
            actualizarMedico(medicoData)
        } else {
            agregarMedico(medicoData)
        }
        
        setShowModal(true)
        formRef.current?.reset()
        setMedicoData({
            ...INITIAL_STATE_MEDICO_FORM,
            id : crypto.randomUUID()
        })
    }

    return (
        <section className="p-6">
            <h3 className="text-2xl text-center text-indigo-600 font-medium">Ingrese la informacion del medico</h3>
            {showModal && <ModalAlert redirect="/medicos" mensaje={`Medico ${paramId ? 'actualizado' : 'agregado'} con exito`} closeModal={setShowModal} isEditing={paramId} />}
            <article className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6 gap-3">
                <form ref={formRef} action=""
                onSubmit={(e) => {
                    e.preventDefault()
                    setErrors({
                        duiError : '',
                        telefonoError: ''
                    })
                    handleSubmit()
                }}
                className="grid grid-cols-2 gap-5 w-full md:col-span-2"
                >
                    <fieldset>
                        <label htmlFor="nombre" className="block mb-1">Nombre</label>
                        <input type="text" id="nombre" placeholder="Juan Simon" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setMedicoData({
                            ...medicoData,
                            nombre : e.target.value
                        })}
                        defaultValue={medicoData.nombre}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="apellido" className="block mb-1">Apellido</label>
                        <input type="text" id="apellido" placeholder="Perez Gonzales" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setMedicoData({
                            ...medicoData,
                            apellido : e.target.value
                        })}
                        defaultValue={medicoData.apellido}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="dui" className="block mb-1">Dui</label>
                        <input type="text" id="dui" placeholder="09090909-8" required maxLength={10} minLength={10}
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setMedicoData({
                            ...medicoData,
                            dui : e.target.value
                        })}
                        defaultValue={medicoData.dui}
                        />
                        <span className="text-xs text-red-600">{errors.duiError}</span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="telefono" className="block mb-1">Telefono</label>
                        <input type="text" id="telefono" placeholder="7875-9090" required maxLength={9} minLength={9}
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full" 
                        onChange={(e) => setMedicoData({
                            ...medicoData,
                            telefono : e.target.value
                        })}
                        defaultValue={medicoData.telefono}
                        />
                        <span className="text-xs text-red-600">{errors.telefonoError}</span>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="genero" className="block mb-1">Genero</label>
                        <select name="genero" id="genero" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setMedicoData({
                            ...medicoData,
                            sexo : e.target.value
                        })}
                        value={medicoData.sexo}
                        
                        >
                            <option value="">Seleccione el Genero</option>
                            <option value={Generos.Masculino}>{Generos.Masculino}</option>
                            <option value={Generos.Femenino}>{Generos.Femenino}</option>
                            <option value={Generos.NoBinario}>{Generos.NoBinario}</option>
                            <option value={Generos.PrefieroNoDecirlo}>{Generos.PrefieroNoDecirlo}</option>
                            <option value={Generos.Otro}>{Generos.Otro}</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="direccion" className="block mb-1">Direccion</label>
                        <input type="text" id="direccion" placeholder="Barrio el Centro" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setMedicoData({
                            ...medicoData,
                            direccion : e.target.value
                        })}
                        defaultValue={medicoData.direccion}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="genero" className="block mb-1">Especialidad</label>
                        <select name="genero" id="genero" required
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setMedicoData({
                            ...medicoData,
                            especialidad : e.target.value
                        })}
                        value={medicoData.especialidad}
                        
                        >
                            <option value="">Seleccione la Especialidad</option>
                            {
                                ESPECIALIDADES_MEDICAS.map((e) => <option key={e.especialidad + 'option'} value={e.especialidad} >{e.especialidad}</option>)
                            }
                        </select>
                    </fieldset>
                    <fieldset className="col-span-2 flex items-center justify-center">
                        <button className="bg-indigo-400 text-white rounded-lg py-1.5 px-8 cursor-pointer hover:bg-indigo-500">{paramId ? 'Actualizar' : 'Agregar'}</button>
                    </fieldset>
                </form>
                <div className="w-full hidden lg:flex justify-center items-center">
                    <MedicoIcon className={'w-72 text-indigo-500'} />
                </div>
            </article>
        </section>
    )
}