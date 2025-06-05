import type { IPacienteInfo } from "src/types/IPacienteInfo";
import { Persona } from "./Persona";

export class Paciente extends Persona {
    constructor(
        id : string,
        nombre: string,
        apellido: string,
        dui : string,
        telefono:string,
        direccion:string,
        sexo:string,
        public edad: number,
        public peso: number,
        public altura: number
    ){
        super(id, nombre, apellido, dui, telefono, direccion, sexo);
    }


    override mostrarInfo() : IPacienteInfo {
        return { 
            id : this.id,
            nombre: this.nombre,
            apellido : this.apellido,
            dui : this.dui,
            edad: this.edad,
            telefono : this.telefono,
            direccion : this.direccion,
            sexo : this.sexo,
            peso : this.peso,
            altura: this.altura
         }
    }
}