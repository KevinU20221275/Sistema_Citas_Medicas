import { useMedicoStore } from "src/store/useMedicoStore";
import { useState } from "react";
import type { IHorarioInfo } from "src/types/IHorarioInfo";
import { MedicoCard } from "./MedicoCard";
import { FormModalHorario } from "./FormModalHorario";

export function MedicosDashboard(){
    const medicos = useMedicoStore((state) => state.medicos)
    const [showModal, setShowModal] = useState(false)
    const [horario, setHorario] = useState<IHorarioInfo | undefined>()
    const [medicoId,setMedicoId] = useState<string | undefined>(undefined)

    const handleAgregarhorario = (id: string) => {
        setMedicoId(id)
        setShowModal(true)
    }

    const handleEditHorario = (horario : IHorarioInfo) => {
        setHorario(horario)
        setShowModal(true)
    }

    return (
        <section className="grid grid-cols-4 gap-2">
            {showModal && <FormModalHorario horario={horario} medicoId={medicoId} closeModal={setShowModal} resetHorarioData={setHorario} />}
            {
                medicos.map((m) => <MedicoCard key={m.id} medico={m} agregarHorario={handleAgregarhorario} actualizarHorario={handleEditHorario} />)
            }
        </section>
    )
}