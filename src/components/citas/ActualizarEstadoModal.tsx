import { CloseIcon } from "../icons/CloseIcon";
import { useState } from "react";
import { useCitaStore } from "src/store/useCitasStore";
import { EstadoConsulta } from "src/types/EstadosConsulta";



export function ActualizarEstadoModal({id, estado, closeModal}:{ id:string, estado: EstadoConsulta, closeModal:(value:boolean) => void}){
    const [estadoCita, setEstadoCita] = useState(estado)
    const [isClosing, setIsClosing] = useState(false)
    const actualizarEstado = useCitaStore((state) => state.actualizarEstado)

    const handleSubmit = () => {
        actualizarEstado(id, estadoCita)
        closeModal(false)
    }

    return (
        <div className="absolute z-50 flex justify-center items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/40 w-full h-full">
            <form onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
            }} 
            className={`modal flex flex-col relative gap-2 bg-white p-6 rounded-md w-80 ${isClosing ? 'fadeOut' : 'fadeIn'}`}
            >
                
                <button 
                onClick={(e) => {
                    e.preventDefault();
                    setIsClosing(true)
                    setTimeout(() => {
                        closeModal(false)
                        setIsClosing(false)
                    }, 400)
                }}
                className="absolute top-2 right-2 hover:bg-zinc-300 close-modal-btn rounded-full p-1 transition-all cursor-pointer">
                    <CloseIcon className="w-5"/>
                </button>
                
                <fieldset>
                    <label htmlFor="estado" className="block mb-1">Estado <span className="text-red-600">*</span></label>
                    <select name="estado" id="estado" required
                    className={`p-2 border-[1px] rounded-lg bg-white w-full border-zinc-300`}
                    onChange={(e) => {
                        const value = e.target.value
                        
                        const nuevoEstado = value === EstadoConsulta.Cancelada ? EstadoConsulta.Cancelada :
                        value === EstadoConsulta.Completada ? EstadoConsulta.Completada :
                        EstadoConsulta.Pendiente

                        setEstadoCita(nuevoEstado)
                    }}
                    defaultValue={estado}
                    >
                        <option value="">Seleccione el estado de la Cita</option>
                        <option value={EstadoConsulta.Completada}>{EstadoConsulta.Completada}</option>
                        <option value={EstadoConsulta.Pendiente}>{EstadoConsulta.Pendiente}</option>
                        <option value={EstadoConsulta.Cancelada}>{EstadoConsulta.Cancelada}</option>
                    </select>
                </fieldset>
                <fieldset className="flex justify-center items-center pt-1">
                    <button className="py-1.5 px-3 text-white bg-indigo-400 dark:bg-indigo-600 hover:bg-indigo-500 rounded-md cursor-pointer">Actualizar</button>
                </fieldset>
            </form>
        </div>
    )
}