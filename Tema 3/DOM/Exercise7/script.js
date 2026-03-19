function agregarImagen() {
    let img = document.createElement("img");
    img.src = "image.jpg";
    img.width = 200;
    let div = document.getElementById("container");
    div.appendChild(img);
}
