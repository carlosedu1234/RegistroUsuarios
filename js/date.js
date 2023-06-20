export function valida(input) {
    const tipoDeInput = input.dataset.tipo;

    if (validaciones[tipoDeInput]) {
        validaciones[tipoDeInput](input);
    }

    if (input.validity.valid) {
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =
            MostrarMensajeDeError(tipoDeInput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajeDeError = {
    nombre: {
        valueMissing: "Nombre no puede estar vacío",
    },
    email: {
        valueMissing: "Email no puede estar vacío",
        typeMismatch: "Este correo no es válido",
    },
    password: {
        valueMissing: "Contraseña no puede estar vacía",
        patternMismatch: "Mínimo ocho caracteres, al menos una letra, un número y un carácter especial",
    },
    nacimiento: {
        valueMissing: "Fecha de nacimiento no puede estar vacía",
        customError: "Debes tener más de 18 años",
    },
    numero: {
        valueMissing: "Número no puede estar vacío",
        patternMismatch: "Debe cumplir con el formato de número telefónico",
    },
    direccion: {
        valueMissing: "Direccion no puede estar vacío",
        patternMismatch: "Debe contar entre 2 y 30 caracteres",
    },
    ciudad: {
        valueMissing: "Ciudad no puede estar vacío",
        patternMismatch: "Debe contar entre 2 y 30 letras",
    },
    departamento: {
        valueMissing: "Departamento no puede estar vacío",
        patternMismatch: "Debe contar entre 2 y 30 letras",
    },
};

const MostrarMensajeDeError = (tipoDeInput, input) => {
    let mensaje = "";

    tipoDeErrores.forEach((error) => {
        if (input.validity[error]) {
            mensaje = mensajeDeError[tipoDeInput][error];
        }
    });

    return mensaje;
};

const validaciones = {
    nacimiento: (input) => edadMinima(input),
};

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
