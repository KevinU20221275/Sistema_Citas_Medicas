import { usePacienteStore } from "src/store/usePacientesStore"
import { PacienteCard } from "./PacienteCard"
import { useMemo, useState } from "react"

export function PacientesDashboard(){
    const [search, setSearch] = useState<string>('')

    const pacientes = usePacienteStore((state) => state.pacientes)
    const eliminarPaciente = usePacienteStore((state) => state.eliminarPaciente)

    const pacientesFiltrados = useMemo(() => {
        if (search && search.length > 0){
            return pacientes.filter((p) => 
                p.nombre.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || 
                p.apellido.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        } else {
            return pacientes
        }
    }, [search, pacientes])

    const handleDelete = (id:string) => {
        eliminarPaciente(id)
    }

    return (
        <section className="grid grid-cols-4 gap-2">
            <div className="col-span-4">
                <input type="text" placeholder="Buscar paciente por Nombre o Apellido" className="px-4 bg-white py-2 rounded-md w-96"
                onChange={(e) => setSearch(e.target.value)}
                defaultValue={search}
                />
            </div>
            {
                pacientesFiltrados.map((p) => <PacienteCard key={p.id} paciente={p} eliminar={handleDelete} />)
            }
            {pacientesFiltrados.length === 0 && <p>Sin resultados</p>}
        </section>
    )
}