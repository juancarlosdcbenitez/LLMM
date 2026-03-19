function mostrarNombre() {
    var nombre = document.getElementById("nombreInput").value;
    document.getElementById("nombreResultado").innerHTML = "Tu nombre es: " + nombre;
}

function mostrarNumero() {
    var numero = document.getElementById("numeroInput").value;
    document.getElementById("numeroResultado").innerHTML = "El número introducido es: " + numero;
}

function sumar() {
    var n1 = document.getElementById("num1").value;
    var n2 = document.getElementById("num2").value;
    var resultado = Number(n1) + Number(n2);
    document.getElementById("sumaResultado").innerHTML = "La suma es: " + resultado;
}
