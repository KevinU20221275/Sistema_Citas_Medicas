// import hooks
import { useEffect, useState } from "react";
import { useMedicosFilters } from "src/hooks/useMedicosFilter";
// import types
import type { IHorarioInfo } from "src/types/IHorarioInfo";
// import components
import { MedicoCard } from "./MedicoCard";
import { FormModalHorario } from "./FormModalHorario";
import { MedicosFilterPanel } from "./MedicosFilterView";
import { useMedicoStore } from "@src/store/useMedicoStore";
import { useHorariosStore } from "@src/store/useHorariosStore";

export function MedicosDashboard(){
    const [showModal, setShowModal] = useState(false)
    const [horario, setHorario] = useState<IHorarioInfo | undefined>()
    const [medicoId,setMedicoId] = useState<string | undefined>(undefined)
    const { medicosFiltrados, filter, changeFilter } = useMedicosFilters()
    const eliminarMedico = useMedicoStore((state) => state.eliminarMedico)
    const { horarios,eliminarHorario } =useHorariosStore((state) => state)
    const [mounted, setMounted] = useState(false);

    const handleAgregarhorario = (id: string) => {
        setMedicoId(id)
        setShowModal(true)
    }

    const handleEditHorario = (horario : IHorarioInfo) => {
        setHorario(horario)
        setShowModal(true)
    }

    const handleDeleteMedico = (id:string) => {
        eliminarMedico(id)
        const horariosMedico = horarios.filter((h) => h.medicoId === id)
        if (horariosMedico){
            horariosMedico.forEach((h) => {
                eliminarHorario(h.id)
            })
        }
    }

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <section className="grid grid-cols-3 gap-1">
            <MedicosFilterPanel className={'col-span-3 flex flex-col items-center text-center pb-4'} filter={filter} changeFilter={changeFilter} />
            {showModal && <FormModalHorario horario={horario} medicoId={medicoId} closeModal={setShowModal} resetHorarioData={setHorario} />}
            {
                medicosFiltrados.map((m) => <MedicoCard key={m.id} medico={m} agregarHorario={handleAgregarhorario} actualizarHorario={handleEditHorario} eliminarMedico={handleDeleteMedico} />)
            }
        </section>
    )
}