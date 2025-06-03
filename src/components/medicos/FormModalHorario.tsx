// import hooks
import { useState, useEffect } from "react"
// import types
import { DiaSemana } from "src/types/DiaSemana"
import type { IHorarioInfo } from "src/types/IHorarioInfo"
// import icons
import { CloseIcon } from "../icons/CloseIcon";
// import store
import { useHorariosStore } from "src/store/useHorariosStore"


interface FormModalProps {
    horario?: IHorarioInfo;
    medicoId?: string;
    closeModal: (show:boolean) => void;
    resetHorarioData: (arg:undefined) => void
}

export function FormModalHorario({horario, medicoId, closeModal, resetHorarioData}: FormModalProps){
    const [isClosing, setIsClosing] = useState(false)
    const [errors, setErrors] = useState({
        errorHoraFin: ''
    })
    const [horarioData, setHorarioData] = useState<IHorarioInfo>({
        id: horario?.id ?? crypto.randomUUID(),
        medicoId: medicoId ?? '',
        dia: horario?.dia || DiaSemana.Lunes,
        horaInicio: horario?.horaInicio || '',
        horaFin: horario?.horaFin || ''
    })

    const agregarHorario = useHorariosStore((store) => store.agregarHorario)
    const actualizarHorario = useHorariosStore((store) => store.actualizarHorario)

    useEffect(() => {
        if (horario){
            setHorarioData(horario)
        }
    }, [horario])

    const handleSubmit = () => {
        if (horarioData.horaInicio >= horarioData.horaFin){
            setErrors({
                ...errors,
                errorHoraFin : 'La hora de finalizacion debe ser mayor a la hora de inicio'
            })
            return
        } 

        if (horario?.id){
            actualizarHorario(horarioData)
        } else {
            agregarHorario(horarioData)
        }

        setIsClosing(true)
        resetHorarioData(undefined)
        setTimeout(() => {
            closeModal(false)
            setIsClosing(false)
        }, 400)
    }

    return (
        <div className="absolute flex justify-center items-center top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 bg-black/40 w-full h-full">
            <form onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
                }} 
            className={`flex flex-col relative gap-2 bg-white p-6 rounded-md w-80 ${isClosing ? 'fadeOut' : 'fadeIn'}`}>
                <button 
                onClick={(e) => {
                    e.preventDefault();
                    setIsClosing(true)
                    setTimeout(() => {
                        closeModal(false)
                        setIsClosing(false)
                    }, 400)
                }}
                className="absolute top-2 right-2 hover:bg-zinc-300 rounded-full p-1 transition-all cursor-pointer">
                    <CloseIcon className="w-5"/>
                </button>
                <fieldset>
                    <label htmlFor="dia" className="block">Dia <span className="text-red-600">*</span></label>
                    <select name="dia" id="dia" required
                    defaultValue={horarioData.dia}
                    className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                    >
                        <option value="">Seleccione el dia</option>
                        <option value={DiaSemana.Lunes}>{DiaSemana.Lunes}</option>
                        <option value={DiaSemana.Martes}>{DiaSemana.Martes}</option>
                        <option value={DiaSemana.Miercoles}>{DiaSemana.Miercoles}</option>
                        <option value={DiaSemana.Jueves}>{DiaSemana.Jueves}</option>
                        <option value={DiaSemana.Viernes}>{DiaSemana.Viernes}</option>
                        <option value={DiaSemana.Sabado}>{DiaSemana.Sabado}</option>
                        <option value={DiaSemana.Domingo}>{DiaSemana.Domingo}</option>
                    </select>
                </fieldset>
                <fieldset>
                    <label htmlFor="horaInicio">Hora Inicio <span className="text-red-600">*</span></label>
                    <input type="time" name="horaInicio" required
                    className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                    defaultValue={horarioData.horaInicio}
                    onChange={(e) => {
                        setHorarioData({
                            ...horarioData,
                            horaInicio: e.target.value
                        })
                    }}
                    />
                   
                </fieldset>
                <fieldset>
                    <label htmlFor="horaFin">Hora de Finalizacion <span className="text-red-600">*</span></label>
                    <input type="time" name="horaFin" required
                    className="p-2 border-[1px] border-zinc-300 rounded-lg bg-white w-full"
                    defaultValue={horarioData.horaFin}
                    onChange={(e) => {
                        setHorarioData({
                            ...horarioData,
                            horaFin: e.target.value
                        })
                    }}
                    />
                    <span className="text-xs text-red-600">{errors.errorHoraFin}</span>
                </fieldset>
                <fieldset className="flex justify-center items-center pt-1">
                    <button className="py-1.5 px-3 text-white bg-indigo-400 hover:bg-indigo-500 rounded-md cursor-pointer">{horario?.id ? 'Actualizar' : 'Agregar'}</button>
                </fieldset>
            </form>
        </div>
    )
}