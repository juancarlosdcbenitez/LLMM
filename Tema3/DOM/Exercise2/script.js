function mostrarMensaje() {
    let formulario = document.forms["miFormulario"];
    let nombre = formulario.nombre.value;
    let apellidos = formulario.apellidos.value;
    let mensaje = "hola " + nombre + " " + apellidos + ", gracias por completar el formulario.";
    document.getElementById("resultado").innerHTML = mensaje;
}
