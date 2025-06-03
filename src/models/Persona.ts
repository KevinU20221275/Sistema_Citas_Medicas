export abstract class Persona {
    public id : string;

    public nombre : string;

    public apellido : string;

    public dui : string;

    public telefono : string;

    public direccion : string;

    public sexo: string;

    constructor(id : string, nombre : string, apellido : string, dui : string, telefono : string, direccion : string, sexo: string){
        this.id = id,
        this.nombre = nombre,
        this.apellido = apellido,
        this.dui = dui,
        this.telefono = telefono,
        this.direccion = direccion
        this.sexo = sexo
    }

    public mostrarInfo(){
        return {
            id : this.id,
            nombre: this.nombre,
            apellido : this.apellido,
            dui : this.dui,
            telefono : this.telefono,
            direccion : this.direccion,
            sexo : this.sexo
        }
    }
}