import type { IPacienteInfo } from "src/types/IPacienteInfo";

export const validatePacientForm = (pacienteData : IPacienteInfo) => {
    let isValid = true
    const regexDui = /^\d{8}-\d{1}$/;
    const regexTelefono = /^\d{4}-\d{4}$/;

    const error = {
        duiError : '',
        edadError : '',
        telefonoError : '',
        pesoError : '',
        alturaError : ''
    }

    if (!regexDui.test(pacienteData.dui)){
        isValid = false
        error.duiError = 'Formato de dui invalido: el formato debe ser ########-#'
    }

    if (isNaN(pacienteData.edad) || pacienteData.edad < 1){
        isValid = false
        error.edadError = 'Error: la edad debe ser un numero entero positivo'
    }

    if (!regexTelefono.test(pacienteData.telefono)){
        isValid = false
        error.telefonoError = 'Formato de telefono invalido: el formato debe ser ####-####'
    }

    if (isNaN(pacienteData.peso) || pacienteData.peso < 0){
        isValid = false
        error.pesoError = 'Error: el peso debe ser un valor numerico positivo'
    }

    if (isNaN(pacienteData.altura) || pacienteData.altura < 0){
        isValid = false
        error.alturaError = 'Error: la altura debe ser un valor numerico'
    }

    return {isValid, error}
}