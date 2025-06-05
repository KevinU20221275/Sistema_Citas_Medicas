// import hooks
import { useState } from "react";
import { useMedicosFilters } from "src/hooks/useMedicosFilter";
// import types
import type { IHorarioInfo } from "src/types/IHorarioInfo";
// import components
import { MedicoCard } from "./MedicoCard";
import { FormModalHorario } from "./FormModalHorario";
import { MedicosFilterPanel } from "./MedicosFilterView";

export function MedicosDashboard(){
    const [showModal, setShowModal] = useState(false)
    const [horario, setHorario] = useState<IHorarioInfo | undefined>()
    const [medicoId,setMedicoId] = useState<string | undefined>(undefined)
    const { medicosFiltrados, filter, changeFilter } = useMedicosFilters()

    const handleAgregarhorario = (id: string) => {
        setMedicoId(id)
        setShowModal(true)
    }

    const handleEditHorario = (horario : IHorarioInfo) => {
        setHorario(horario)
        setShowModal(true)
    }

    console.log(medicosFiltrados)

    return (
        <section className="grid grid-cols-4 gap-2">
            <MedicosFilterPanel className={'col-span-4 flex flex-col items-center text-center pb-4'} filter={filter} changeFilter={changeFilter} />
            {showModal && <FormModalHorario horario={horario} medicoId={medicoId} closeModal={setShowModal} resetHorarioData={setHorario} />}
            {
                medicosFiltrados.map((m) => <MedicoCard key={m.id} medico={m} agregarHorario={handleAgregarhorario} actualizarHorario={handleEditHorario} />)
            }
        </section>
    )
}