import { Medico } from "../Medico";

describe("Medico: informacion completa", () => {
    it("debe mostrar la informacion completa del medico", () => {
        const medico = new Medico(
            "med001",
            "Kevin",
            "Montano",
            "12345678-9",
            "7676-0000",
            "Berlin",
            "Masculino",
            "Medicina General"
        )


        const info = medico.mostrarInfo()

        expect(info).toEqual({
            id : "med001",
            nombre : "Kevin",
            apellido: "Montano",
            dui : "12345678-9",
            telefono : "7676-0000",
            direccion: "Berlin",
            sexo: "Masculino",
            especialidad: "Medicina General"
        })
    })
})