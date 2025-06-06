import { CloseIcon } from "../icons/CloseIcon";
import { useEffect, useState } from "react";
import { useCitaStore } from "src/store/useCitasStore";
import { useCitasDisponibles } from "@src/hooks/useCitasDisponibles";

interface ReprogramarCitaModalProps {
    citaId:string;
    fecha: string;
    hora:string;
    closeModal:(value: boolean) => void;
    medicoId:string;
}

export function ReprogramarCitaModal({citaId, fecha, hora, closeModal, medicoId} : ReprogramarCitaModalProps){
    const [data, setData] = useState<{fecha: string | Date, hora:string, fechaOperar:Date | null}>({
        fecha: fecha || '',
        hora : hora || '',
        fechaOperar: null
    })
    const [isClosing, setIsClosing] = useState(false)
    const [errors, setErrors] = useState({
        fechaError: '',
        horaError: ''
    })
    const reprogramarCita = useCitaStore((state) => state.reprogramarCita)
    const {citasDisponibles, fechaError, setFechaOperar, medicoHorarios} = useCitasDisponibles({medicoId, fechaCita : fecha })

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
        }, [fechaError])

    const handleSubmit = () => {
        if (data.fecha instanceof Date && !errors.fechaError && !errors.horaError){
            reprogramarCita(citaId, data.fecha, data.hora)
            closeModal(false)
        }
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
                     <div>
                        <h5 className="text-center">Dias de Trabajo del Medico</h5>
                        {
                            medicoHorarios?.map((h) => <span key={h.id} className="text-xs bg-indigo-400 dark:bg-indigo-600 text-white inline-block p-1 rounded-md mr-1">{h.dia} : {h.horaInicio} - {h.horaFin}</span>)
                        }
                    </div>
                </fieldset>

                <fieldset>
                    <label htmlFor="fecha" className="block mb-1">Fecha <span className="text-red-600">*</span></label>
                    <input type="date" id="fecha" placeholder="12-03-2025" required
                    className={`p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full`}
                    onChange={(e) => {
                        setErrors(prev => ({
                            ...prev,
                            fechaError: ''
                        }))

                        setFechaOperar(new Date(e.target.value))

                        const [year, month, day] = e.target.value.split("-").map(Number)
                            
                        setData({
                            ...data,
                            fecha : new Date(year, month - 1, day),
                            fechaOperar: new Date(e.target.value)
                        })
                    }}
                    />
                    <span className="text-red-600 text-xs">{errors.fechaError}</span>
                </fieldset>
                
                <fieldset>
                    <label htmlFor="hora" className="block mb-1">Hora <span className="text-red-600">*</span></label>
                    <select name="hora" id="hora" required
                    className={`p-2 border-[1px] rounded-lg bg-white w-full
                    ${(errors.fechaError || !data.fecha) && 'pointer-events-none border-1px opacity-20 cursor-not-allowed'} 
                    ${errors.horaError ? 'border-red-600' : 'border-zinc-300'}`}
                    onChange={(e) =>
                        setData({
                            ...data,
                            hora: e.target.value,
                        })
                    }
                    disabled={!citasDisponibles.length}
                    >
                        <option value="">Seleccione una hora</option>
                            {citasDisponibles.map((hora) => <option key={hora} value={hora}>{hora}</option>)}
                    </select>
                </fieldset>
                <fieldset className="flex justify-center items-center pt-1">
                    <button className="py-1.5 px-3 text-white bg-indigo-400 dark:bg-indigo-600 hover:bg-indigo-500 rounded-md cursor-pointer">Reprogramar</button>
                </fieldset>
            </form>
        </div>
    )
}