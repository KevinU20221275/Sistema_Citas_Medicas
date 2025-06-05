import { useCitaStore } from "src/store/useCitasStore"
import { CitaCard } from "./citas/CitaCard";
import { useCitasDetalladas } from "src/hooks/useCitasDetalladas";
import { useState } from "react";
import { EstadoConsulta } from "src/types/EstadosConsulta";
import { ActualizarEstadoModal } from "./citas/ActualizarEstadoModal";
import { ReprogramarCitaModal } from "./citas/ReprogramarCitaModal";

export function CitasProximas(){
    const { citasDetalladasProximas } = useCitasDetalladas()
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

    const citasProximas = [...citasDetalladasProximas].splice(0,3)


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
        <article>
            {estadoModal && <ActualizarEstadoModal id={dataEstado.id} estado={dataEstado.estado} closeModal={setEstadoModal} />}
            {showModal && <ReprogramarCitaModal citaId={dataCita.id} fecha={dataCita.fecha} hora={dataCita.hora} medicoId={dataCita.medicoId} closeModal={setShowModal}  />}
            <h4 className="text-indigo-600 font-semibold">Proximas Citas</h4>
            <div className="grid grid-cols-3 gap-2">
                {citasProximas.map((c) => <CitaCard key={c.id} cita={c} reprogramarCita={handleReprogramarCita} cambiarEstado={handleCambiarEstado} eliminarCita={handleDelete} />)}
                {citasProximas.length === 0 && <p className="text-zinc-500">No hay citas proximas</p>}
            </div>
        </article>
    )
}