import type { IMedicoInfo } from "src/types/IMedicoInfo";
import { Persona } from "./Persona";

export class Medico extends Persona {
    constructor(
        id : string,
        nombre : string,
        apellido : string,
        dui : string,
        telefono: string,
        direccion:string,
        sexo: string,
        public especialidad : string
    ){
        super(id, nombre, apellido, dui, telefono, direccion, sexo)
    }

    override mostrarInfo() : IMedicoInfo {
        return { 
            id : this.id,
            nombre: this.nombre,
            apellido : this.apellido,
            dui : this.dui,
            telefono : this.telefono,
            direccion : this.direccion,
            sexo: this.sexo,
            especialidad : this.especialidad
        }
    }
}