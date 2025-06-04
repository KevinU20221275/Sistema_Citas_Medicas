import type { Horario } from "src/models/Horario"

export const validarDiaSeleccionado = (fecha: Date, medicoHorarios : Horario[]) : {success:boolean, message? : string, horariosDelDia?: Horario[]} => {
    const dias = ["Lunes","Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"]
  
    const currentDate = new Date()
    const fechaCitaComparar = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const fechaCita = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate())


    if (fechaCita <= fechaCitaComparar){
        return {
            success: false,
            message : 'La fecha debe ser mayor a la fecha actual'
        }
    } 

    const dia = dias[fechaCita.getDay()]

    const horariosDelDia = medicoHorarios.filter((h) => h.dia === dia)

    if (!horariosDelDia || horariosDelDia.length === 0){
        return {
            success: false,
            message: `Fecha Incorrecta: El medico no atiende los dias ${dia}`
        }
    }

    return {
        success: true,
        horariosDelDia
    }   
}