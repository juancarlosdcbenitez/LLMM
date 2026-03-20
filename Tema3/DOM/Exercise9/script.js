let temporizador = setTimeout(mostrarMensaje, 5000);

function mostrarMensaje() {
    alert("Han pasado 5 segundos");
}

function detener() {
    clearTimeout(temporizador);
    alert("El temporizador ha sido detenido");
}