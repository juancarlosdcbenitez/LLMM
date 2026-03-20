function max(x, y) {
    if (x > y) {
        return x;
    } else {
        return y;
    }
}

function maxOfThree(a, b, c) {
    let maximo = a;

    if (b > maximo) {
        maximo = b;
    }
    if (c > maximo) {
        maximo = c;
    }

    return maximo;
}

function isVowel(ch) {
    ch = ch.toLowerCase();

    if (ch === "a" || ch === "e" || ch === "i" || ch === "o" || ch === "u") {
        return true;
    } else {
        return false;
    }
}

function translate(texto) {
    let resultado = "";
    let vocales = "aeiou ";

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];
        let esVocal = false;

        for (let j = 0; j < vocales.length; j++) {
            if (c.toLowerCase() === vocales[j]) {
                esVocal = true;
            }
        }

        if (esVocal) {
            resultado += c;
        } else {
            resultado += c + "o" + c;
        }
    }

    return resultado;
}

function sum(arr) {
    let total = 0;

    for (let i = 0; i < arr.length; i++) {
        total = total + arr[i];
    }

    return total;
}

function multiply(arr) {
    let total = 1;

    for (let i = 0; i < arr.length; i++) {
        total = total * arr[i];
    }

    return total;
}

function reverse(texto) {
    let r = "";

    for (let i = texto.length - 1; i >= 0; i--) {
        r += texto[i];
    }

    return r;
}

function sortWords(arr) {
    return arr.sort();
}

function findLongestWord(arr) {
    let longest = arr[0];

    for (let i = 1; i < arr.length; i++) {
        if (arr[i].length > longest.length) {
            longest = arr[i];
        }
    }

    return longest.length;
}

function filterLongWords(arr, i) {
    let resultado = [];

    for (let j = 0; j < arr.length; j++) {
        if (arr[j].length > i) {
            resultado.push(arr[j]);
        }
    }

    return resultado;
}

function charFreq(texto) {
    let freq = {};

    for (let i = 0; i < texto.length; i++) {
        let c = texto[i];

        if (freq[c] === undefined) {
            freq[c] = 1;
        } else {
            freq[c] = freq[c] + 1;
        }
    }

    return freq;
}

function mostrarMax() {
    let x = Number(document.getElementById("a1").value);
    let y = Number(document.getElementById("a2").value);
    document.getElementById("resA").innerHTML = max(x, y);
}

function mostrarMaxTres() {
    let a = Number(document.getElementById("b1").value);
    let b = Number(document.getElementById("b2").value);
    let c = Number(document.getElementById("b3").value);
    document.getElementById("resB").innerHTML = maxOfThree(a, b, c);
}

function mostrarVocal() {
    let ch = document.getElementById("c1").value;
    document.getElementById("resC").innerHTML = isVowel(ch);
}

function mostrarRovar() {
    let t = document.getElementById("d1").value;
    document.getElementById("resD").innerHTML = translate(t);
}

function mostrarSuma() {
    let arr = document.getElementById("e1").value.split(",");
    for (let i = 0; i < arr.length; i++) arr[i] = Number(arr[i]);
    document.getElementById("resE").innerHTML = sum(arr);
}

function mostrarMultiplica() {
    let arr = document.getElementById("e1").value.split(",");
    for (let i = 0; i < arr.length; i++) arr[i] = Number(arr[i]);
    document.getElementById("resE").innerHTML = multiply(arr);
}

function mostrarReverse() {
    let t = document.getElementById("f1").value;
    document.getElementById("resF").innerHTML = reverse(t);
}

function mostrarSort() {
    let arr = document.getElementById("g1").value.split(",");
    document.getElementById("resG").innerHTML = sortWords(arr).join(", ");
}

function mostrarLongest() {
    let arr = document.getElementById("h1").value.split(",");
    document.getElementById("resH").innerHTML = findLongestWord(arr);
}

function mostrarFilter() {
    let arr = document.getElementById("i1").value.split(",");
    let min = Number(document.getElementById("i2").value);
    document.getElementById("resI").innerHTML = filterLongWords(arr, min).join(", ");
}

function mostrarFreq() {
    let t = document.getElementById("j1").value;
    document.getElementById("resJ").innerHTML = JSON.stringify(charFreq(t));
}
