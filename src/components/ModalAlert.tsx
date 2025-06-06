import { useState } from "react";
import { CloseIcon } from "./icons/CloseIcon";

export function ModalAlert({mensaje, redirect, closeModal, isEditing}: {mensaje: string, redirect:string, closeModal:(value: boolean) => void, isEditing?:string}){
    const [isClosing, setIsClosing] = useState(false)
    return (
        <div className="absolute flex z-20 justify-center items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/40 w-full h-full">
            <div className={`flex flex-col relative gap-2 z-50 bg-white p-6 rounded-md w-96 ${isClosing ? 'fadeOut' : 'fadeIn'}`}>
                <button 
                onClick={(e) => {
                    e.preventDefault();
                    setIsClosing(true)
                    setTimeout(() => {
                            closeModal(false)
                            setIsClosing(false)
                    }, 400)
                }}
                className="absolute top-2 right-2 hover:bg-zinc-300 rounded-full p-1 transition-all cursor-pointer"
                >
                    <CloseIcon className="w-5"/>
                </button>
                <p className="text-center text-2xl text-green-600 py-4">{mensaje}</p>
                <div className="flex justify-center items-center gap-2 text-sm text-white">
                    <a href={redirect} className={'px-3 py-1 rounded-md bg-indigo-500 hover:bg-indigo-600'}>Ir al Dashboard</a>
                    {!isEditing && <button 
                    onClick={(e) => {
                        e.preventDefault();
                        setIsClosing(true)
                        setTimeout(() => {
                                closeModal(false)
                                setIsClosing(false)
                        }, 400)
                    }}
                    className="px-3 py-1 rounded-md bg-indigo-500 hover:bg-indigo-600 cursor-pointer">Seguir agregando registros</button>}
                </div>
            </div>
        </div>
    )
}