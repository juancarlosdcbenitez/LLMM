function borrarElemento() {
    let lista = document.getElementById("lista");

    if (lista.children.length > 0) {
        let primerElemento = lista.children[0];
        lista.removeChild(primerElemento);
    }
}