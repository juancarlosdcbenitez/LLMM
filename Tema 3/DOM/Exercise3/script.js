function agregarImagen() {
    let img = document.createElement("img");
    img.src = "image.jpg";
    img.width = 400;
    document.getElementById("contenedor").appendChild(img);
}
