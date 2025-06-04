import { useState } from "react";
import { useCitasDetalladas } from "src/hooks/useCitasDetalladas";
import { CitaCard } from "./CitaCard";
import { ReprogramarCitaModal } from "./ReprogramarCitaModal";
import { ActualizarEstadoModal } from "./ActualizarEstadoModal";
import { EstadoConsulta } from "src/types/EstadosConsulta";
import { useCitaStore } from "src/store/useCitasStore";

export function CitasDashboard(){
    const {citasDetalladas} = useCitasDetalladas()
    const eliminarCita = useCitaStore((state) => state.eliminarCita)
    const [dataEstado, setDataEstado] = useState({
        id: '',
        estado: EstadoConsulta.Pendiente
    })
    const [showModal, setShowModal] = useState(false)
    const [estadoModal, setEstadoModal] = useState(false)
    const [dataCita, setDataCita] = useState({
        id : '',
        fecha: '',
        hora: '',
        medicoId : ''
    })

    const handleReprogramarCita = (id:string, fecha:string, hora:string, medicoId:string) => {
        setDataCita({
            id,
            fecha,
            hora,
            medicoId
        })
        setShowModal(true)
    }

    const handleCambiarEstado = (id:string, estado:string) => {
        const nuevoEstado = estado === EstadoConsulta.Cancelada ? EstadoConsulta.Cancelada :
        estado === EstadoConsulta.Completada ? EstadoConsulta.Completada : EstadoConsulta.Pendiente

        setDataEstado({
            id,
            estado : nuevoEstado
        })
        setEstadoModal(true)
    }

    const handleDelete = (id:string) => {
        eliminarCita(id)
    }

    return (
        <section className="grid grid-cols-4 gap-2">
            {estadoModal && <ActualizarEstadoModal id={dataEstado.id} estado={dataEstado.estado} closeModal={setEstadoModal} />}
            {showModal && <ReprogramarCitaModal citaId={dataCita.id} fecha={dataCita.fecha} hora={dataCita.hora} medicoId={dataCita.medicoId} closeModal={setShowModal}  />}
            {
                citasDetalladas.map((c) => <CitaCard key={c.id} cita={c} reprogramarCita={handleReprogramarCita} cambiarEstado={handleCambiarEstado} eliminarCita={handleDelete} />)
            }
            {
                citasDetalladas.length === 0 && <p className="text-zinc-600">No hay citas</p>
            }
        </section>
    )
}