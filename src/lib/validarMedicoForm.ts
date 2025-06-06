import type { IMedicoInfo } from "@src/types/IMedicoInfo";

export const validateMedicoForm = (medicoData : IMedicoInfo) => {
    let isValid = true
    const regexDui = /^\d{8}-\d{1}$/;
    const regexTelefono = /^\d{4}-\d{4}$/;

    const error = {
        duiError : '',
        telefonoError : '',
    }

    if (!regexDui.test(medicoData.dui)){
        isValid = false
        error.duiError = 'Formato de dui invalido: el formato debe ser 00000000-0'
    }


    if (!regexTelefono.test(medicoData.telefono)){
        isValid = false
        error.telefonoError = 'Formato de telefono invalido: el formato debe ser 0000-000'
    }

    return {isValid, error}
}