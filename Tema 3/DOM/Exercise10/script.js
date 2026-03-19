let tablero = document.getElementById("tablero");
let movimientos = 0;
let celdas = [];
let target = 7;
let segundos = 0;
let temporizador = null;

document.getElementById("target").innerHTML = target;
document.getElementById("movs").innerHTML = movimientos;
document.getElementById("tiempo").innerHTML = "0:00";

for (let fila = 0; fila < 5; fila++) {
    celdas[fila] = [];

    for (let col = 0; col < 5; col++) {
        let celda = document.createElement("div");
        celda.className = "celda";
        celda.onclick = function() {
            if (temporizador === null) {
                iniciarTiempo();
            }
            pulsarCelda(fila, col);
        };
        tablero.appendChild(celda);
        celdas[fila][col] = celda;
    }
}

function iniciarTiempo() {
    temporizador = setInterval(function() {
        segundos++;
        document.getElementById("tiempo").innerHTML = formatearTiempo(segundos);
    }, 1000);
}

function detenerTiempo() {
    clearInterval(temporizador);
    temporizador = null;
}

function formatearTiempo(totalSegundos) {
    let minutos = Math.floor(totalSegundos / 60);
    let seg = totalSegundos % 60;

    if (seg < 10) {
        return minutos + ":0" + seg;
    } else {
        return minutos + ":" + seg;
    }
}

function cambiar(celda) {
    if (celda) {
        celda.classList.toggle("encendida");
    }
}

function pulsarCelda(f, c) {
    cambiar(celdas[f][c]);

    if (f > 0) {
        cambiar(celdas[f - 1][c]);
    }

    if (f < 4) {
        cambiar(celdas[f + 1][c]);
    }

    if (c > 0) {
        cambiar(celdas[f][c - 1]);
    }

    if (c < 4) {
        cambiar(celdas[f][c + 1]);
    }
    movimientos++;
    document.getElementById("movs").innerHTML = movimientos;
    comprobarTarget();
}

function comprobarTarget() {
    let encendidas = 0;
    for (let f = 0; f < 5; f++) {
        for (let c = 0; c < 5; c++) {
            if (celdas[f][c].classList.contains("encendida")) {
                encendidas++;
            }
        }
    }

    if (encendidas === target) {
        detenerTiempo();
        alert("¡Has alcanzado el target en " + movimientos + " movimientos y " + formatearTiempo(segundos) + "!");
    }
}

function reiniciar() {
    for (let f = 0; f < 5; f++) {
        for (let c = 0; c < 5; c++) {
            celdas[f][c].classList.remove("encendida");
        }
    }
    movimientos = 0;
    segundos = 0;
    document.getElementById("movs").innerHTML = movimientos;
    document.getElementById("tiempo").innerHTML = "0:00";
    detenerTiempo();
    document.getElementById("target").innerHTML = target;
}
