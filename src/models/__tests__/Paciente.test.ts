import { Paciente } from '../Paciente';

describe('Paciente: informacion completa', () => {
  it('debe mostrar la información completa del paciente correctamente', () => {
    const paciente = new Paciente(
      "pac001",
      "Juan",
      "Pérez",
      "12345678-9",
      "7890-1234",
      "San Salvador",
      "Masculino",
      30,
      70,
      1.75
    )

    const info = paciente.mostrarInfo();

    expect(info).toEqual({
      id: "pac001",
      nombre: "Juan",
      apellido: "Pérez",
      dui: "12345678-9",
      edad: 30,
      telefono: "7890-1234",
      direccion: "San Salvador",
      sexo: "Masculino",
      peso: 70,
      altura: 1.75
    })
  });
});
