import { EstadoConsulta } from "@src/types/EstadosConsulta"

export const INITIAL_STATE_MEDICO_FORM = {
    id : crypto.randomUUID(),
    nombre :  '',
    apellido : '',
    dui : '',
    telefono : '',
    direccion : '',
    sexo: '',
    especialidad : '',
}

export const INITIAL_STATE_CITA_FORM = {
    id: crypto.randomUUID(),
    pacienteId: '',
    medicoId: '',
    fecha: new Date(),
    hora: '',
    motivoConsulta: '',
    estado : EstadoConsulta.Pendiente
}

export const INITIAL_STATE_CITA_FORM_ERRORS = {
    fechaError : '',
    horaError : '',
    medicoHorariosError: '',
}

export const INITIAL_STATE_PACIENTE_FORM = {
    id : crypto.randomUUID(),
    nombre :  '',
    apellido : '',
    dui : '',
    edad : 1,
    telefono : '',
    direccion : '',
    sexo : '',
    peso : 1,
    altura : 1
}

export const INITIAL_STATE_PACIENTE_FORM_ERRORS = {
    duiError : '',
    edadError : '',
    telefonoError : '',
    pesoError : '',
    alturaError : ''
}