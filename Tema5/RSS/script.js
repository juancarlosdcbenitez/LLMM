const RSS_URL = "https://feeds.elpais.com/mrss-s/pages/ep/site/elpais.com/portada";

async function cargarRSS() {
  const contenedor = document.getElementById("rss-container");

  try {
    const respuesta = await fetch(RSS_URL);
    const texto = await respuesta.text();

    const parser = new DOMParser();
    const xml = parser.parseFromString(texto, "application/xml");

    const items = xml.querySelectorAll("item");

    contenedor.innerHTML = "";

    items.forEach(item => {
      const titulo = item.querySelector("title")?.textContent || "Sin título";
      const link = item.querySelector("link")?.textContent || "#";
      const fecha = item.querySelector("pubDate")?.textContent || "";
      const descripcion = item.querySelector("description")?.textContent || "";

      const div = document.createElement("div");
      div.className = "item";

      div.innerHTML = `
        <h2><a href="${link}" target="_blank">${titulo}</a></h2>
        <p><strong>${fecha}</strong></p>
        <p>${descripcion}</p>
      `;

      contenedor.appendChild(div);
    });

  } catch (error) {
    contenedor.textContent = "Error al cargar el RSS (posible CORS).";
    console.error(error);
  }
}

cargarRSS();
