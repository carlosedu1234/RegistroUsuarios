export function valida(input) {
    const tipoDeInput = input.dataset.tipo;
    if (validaciones[tipoDeInput]) { validaciones[tipoDeInput](input); }


    if (input.validity.valid) {

        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }
    else {
        input.parentElement.classList.add("input-container--invalid");

    } input.parentElement.querySelector(".input-message-error").innerHTML =
        MostrarMensajeDeError(tipoDeInput, input);
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeDeError = {

    nombre: {

        valueMissing: "Nombre no puede estar vacio"
    },
    email: {
        valueMissing: "Email no puede estar vacio",
        typeMismatch: "Este correo no es valido"
    }
    , password: {
        valueMissing: "Contraseña no puede estar vacio",
        patternMismatch: "Mínimo ocho caracteres, al menos una letra, un número y un carácter especial"
    },
    nacimiento: {
        valueMissing: "Fecha de nacimiento no puede estar vacio",
        customError: "Debes tener mas de 18 años"
    }

}

const MostrarMensajeDeError = (tipoDeInput, input) => {

    let mensaje = "";
    tipoDeErrores.forEach(error => {
        if (input.validity[error]) {

            mensaje = mensajeDeError[tipoDeInput][error];
        }

    });

return mensaje;

}




const validaciones = {

    nacimiento: input => edadMinima(input)

}


const edadMinima = (evento) => {
    let dateCliente = new Date(evento.value);
    let mensaje = "";
    if (validarEdad(dateCliente)) {
        mensaje = "El usuario debe ser mayor de edad";
    }

    evento.setCustomValidity(mensaje);
};




const validarEdad = (fechaRegistrada) => {
    let fechaActual = new Date();
    let diferenciaFecha = new Date(
        fechaRegistrada.getUTCFullYear() + 18,
        fechaRegistrada.getUTCMonth(),
        fechaRegistrada.getUTCDate()
    );

    return fechaActual < diferenciaFecha;
};
