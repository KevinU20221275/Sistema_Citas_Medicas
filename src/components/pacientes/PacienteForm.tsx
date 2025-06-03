import { useEffect, useState } from "react";
import { usePacienteStore } from "src/store/usePacientesStore";
import type { IPacienteInfo } from "src/types/IPacienteInfo";
import { PacienteIcon } from "../icons/Paciente";
import { Sexo } from "src/types/Sexo";

export function PacienteForm({id} : {id? : string}){
    const getPacienteById = usePacienteStore((state) => state.getPacienteById)
    const actualizarPaciente = usePacienteStore((state) => state.actualizarPaciente)
    const agregarPaciente = usePacienteStore((state) => state.agregarPaciente)

    const [pacienteData, setPacienteData] = useState<IPacienteInfo>({
        id : id ?? crypto.randomUUID(),
        nombre :  '',
        apellido : '',
        dui : '',
        edad : 0,
        telefono : '',
        direccion : '',
        sexo : '',
        peso : 0,
        altura : 0
    })

    useEffect(() => {
        if (id){
            const paciente = getPacienteById(id)
            if (paciente){
                setPacienteData(paciente)
            }
        }
    }, [id, getPacienteById])

    const handleSubmit = () => {
        if (id){
            actualizarPaciente(pacienteData)
        } else {
            agregarPaciente(pacienteData)
        }
    }

    return (
        <section className="p-6">
            <h3 className="text-2xl text-center text-indigo-600 font-medium">Ingrese la informacion del paciente</h3>
            <article className="flex py-6">
                <form action=""
                onSubmit={handleSubmit}
                className="grid grid-cols-2 gap-5 w-2xl"
                >
                    <fieldset>
                        <label htmlFor="nombre" className="block mb-1">Nombre</label>
                        <input type="text" id="nombre" placeholder="Juan Simon"
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
                        <input type="text" id="apellido" placeholder="Perez Gonzales"
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
                        <input type="text" id="dui" placeholder="09090909-8"
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            dui : e.target.value
                        })}
                        defaultValue={pacienteData.dui}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="edad" className="block mb-1">Edad</label>
                        <input type="text" id="edad" placeholder="20" 
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            edad : parseFloat(e.target.value)
                        })}
                        defaultValue={pacienteData.edad}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="telefono" className="block mb-1">Telefono</label>
                        <input type="text" id="telefono" placeholder="7875-9090"
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full" 
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            telefono : e.target.value
                        })}
                        defaultValue={pacienteData.telefono}
                        />
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
                        <label htmlFor="sexo" className="block mb-1">Sexo</label>
                        <select name="sexo" id="sexo"
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            sexo : e.target.value
                        })}
                        defaultValue={pacienteData.sexo}
                        >
                            <option value="">Seleccione el Sexo</option>
                            <option value={Sexo.Masculino}>{Sexo.Masculino}</option>
                            <option value={Sexo.Femenino}>{Sexo.Femenino}</option>
                            <option value={Sexo.NoBinario}>{Sexo.NoBinario}</option>
                            <option value={Sexo.PrefieroNoDecirlo}>{Sexo.PrefieroNoDecirlo}</option>
                            <option value={Sexo.Otro}>{Sexo.Otro}</option>
                        </select>
                    </fieldset>
                    <fieldset>
                        <label htmlFor="peso" className="block mb-1">Peso</label>
                        <input type="text" id="peso" placeholder="80" 
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            peso : parseFloat(e.target.value)
                        })}
                        defaultValue={pacienteData.peso}
                        />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="altura" className="block mb-1">Altura</label>
                        <input type="text" id="altura" placeholder="1.78" 
                        className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                        onChange={(e) => setPacienteData({
                            ...pacienteData,
                            altura : parseFloat(e.target.value)
                        })}
                        defaultValue={pacienteData.altura}
                        />
                    </fieldset>
                    <fieldset className="col-span-2 flex items-center justify-center">
                        <button className="bg-indigo-400 text-white rounded-lg py-1.5 px-8 cursor-pointer hover:bg-indigo-500">Agregar</button>
                    </fieldset>
                </form>
                <PacienteIcon className={'w-72 text-indigo-500'} />
            </article>
        </section>
    )
}