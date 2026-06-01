let preguntas = [];
let respuestasUsuario = [];
let indiceActual = 0;
let tiempo = 0;
let intervalo = null;
let idiomaActual = "es";

const $ = (selector) => document.querySelector(selector);

const textos = {
  es: {
    titulo: "Concurso de preguntas XML",
    descripcion: "Pon a prueba tus conocimientos sobre cine de terror con 20 preguntas cargadas dinámicamente.",
    idioma: "Idioma",
    comenzar: "Comenzar",
    detallePreguntas: "20 preguntas",
    detallePreguntasDesc: "Una respuesta correcta por pregunta",
    detalleTiempo: "Contrarreloj",
    detalleTiempoDesc: "Se registra el tiempo empleado",
    detalleRevision: "Revisión final",
    detalleRevisionDesc: "Comprueba tus aciertos y errores",
    pregunta: "Pregunta",
    de: "de",
    siguiente: "Siguiente",
    finalizar: "Finalizar",
    reiniciar: "Reiniciar",
    aviso: "Selecciona una respuesta antes de continuar.",
    cargando: "Cargando preguntas...",
    errorCarga: "No se han podido cargar las preguntas. Revisa la ruta del XML o abre el proyecto con Live Server.",
    errorXML: "El XML no tiene el formato esperado.",
    resultadoFinal: "Resultado final",
    aciertos: "Aciertos",
    nota: "Nota",
    tiempo: "Tiempo",
    record: "Mejor marca",
    repetir: "Volver a jugar",
    verRevision: "Ver revisión",
    ocultarRevision: "Ocultar revisión",
    tuRespuesta: "Tu respuesta",
    respuestaCorrecta: "Respuesta correcta",
    sinRespuesta: "Sin responder",
    correcto: "Correcta",
    incorrecto: "Incorrecta",
    mensajes: [
      "Necesitas repasar un poco más.",
      "Aprobado. Buen comienzo.",
      "Muy bien, vas por buen camino.",
      "Excelente. Nivel experto."
    ]
  },
  en: {
    titulo: "XML Quiz Contest",
    descripcion: "Test your knowledge about horror genre with 20 questions loaded dynamically.",
    idioma: "Language",
    comenzar: "Start",
    detallePreguntas: "20 questions",
    detallePreguntasDesc: "One correct answer per question",
    detalleTiempo: "Against the clock",
    detalleTiempoDesc: "Your time is recorded",
    detalleRevision: "Final review",
    detalleRevisionDesc: "Check your correct and wrong answers",
    pregunta: "Question",
    de: "of",
    siguiente: "Next",
    finalizar: "Finish",
    reiniciar: "Restart",
    aviso: "Choose an answer before continuing.",
    cargando: "Loading questions...",
    errorCarga: "The questions could not be loaded. Check the XML path or open the project with Live Server.",
    errorXML: "The XML does not have the expected structure.",
    resultadoFinal: "Final result",
    aciertos: "Correct answers",
    nota: "Grade",
    tiempo: "Time",
    record: "Best score",
    repetir: "Play again",
    verRevision: "Show review",
    ocultarRevision: "Hide review",
    tuRespuesta: "Your answer",
    respuestaCorrecta: "Correct answer",
    sinRespuesta: "Not answered",
    correcto: "Correct",
    incorrecto: "Wrong",
    mensajes: [
      "You need to study a little more.",
      "Passed. Good start.",
      "Very good, you are on the right track.",
      "Excellent. Expert level."
    ]
  }
};

function t(clave) {
  return textos[idiomaActual][clave];
}

function aplicarTraducciones() {
  document.documentElement.lang = idiomaActual;
  $("#titulo-app").textContent = t("titulo");
  $("#descripcion-app").textContent = t("descripcion");
  $("#label-idioma").textContent = t("idioma");
  $("#start").textContent = t("comenzar");
  $("#detalle-preguntas").textContent = t("detallePreguntas");
  $("#detalle-preguntas-desc").textContent = t("detallePreguntasDesc");
  $("#detalle-tiempo").textContent = t("detalleTiempo");
  $("#detalle-tiempo-desc").textContent = t("detalleTiempoDesc");
  $("#detalle-revision").textContent = t("detalleRevision");
  $("#detalle-revision-desc").textContent = t("detalleRevisionDesc");
  $("#reiniciar-durante").textContent = t("reiniciar");
  $("#resultado-label").textContent = t("resultadoFinal");
  $("#label-aciertos").textContent = t("aciertos");
  $("#label-nota").textContent = t("nota");
  $("#label-tiempo-final").textContent = t("tiempo");
  $("#label-record").textContent = t("record");
  $("#repetir").textContent = t("repetir");
  $("#ver-revision").textContent = t("verRevision");
}

function mostrarPantalla(idPantalla) {
  ["#pantalla-inicio", "#pantalla-quiz", "#pantalla-resultado"].forEach((id) => {
    $(id).classList.toggle("oculto", id !== idPantalla);
  });
}

function formatearTiempo(segundos) {
  const min = String(Math.floor(segundos / 60)).padStart(2, "0");
  const sec = String(segundos % 60).padStart(2, "0");
  return `${min}:${sec}`;
}

function iniciarReloj() {
  clearInterval(intervalo);
  tiempo = 0;
  $("#timer").textContent = formatearTiempo(tiempo);

  intervalo = setInterval(() => {
    tiempo++;
    $("#timer").textContent = formatearTiempo(tiempo);
  }, 1000);
}

async function cargarXML() {
  const archivo = idiomaActual === "es" ? "preguntas_es.xml" : "preguntas_en.xml";
  const respuesta = await fetch(archivo);

  if (!respuesta.ok) {
    throw new Error("No se pudo cargar el archivo XML.");
  }

  const texto = await respuesta.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(texto, "application/xml");

  if (xml.querySelector("parsererror")) {
    throw new Error("El XML contiene errores de sintaxis.");
  }

  return xml;
}

function barajar(arrayOriginal) {
  const array = [...arrayOriginal];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function convertirXMLAPreguntas(xml) {
  const nodosPregunta = Array.from(xml.querySelectorAll("question"));

  if (nodosPregunta.length !== 20) {
    throw new Error("El concurso debe tener exactamente 20 preguntas.");
  }

  return nodosPregunta.map((nodoPregunta) => {
    const id = nodoPregunta.getAttribute("id");
    const wording = nodoPregunta.querySelector("wording")?.textContent.trim();
    const choices = Array.from(nodoPregunta.querySelectorAll("choice")).map((choice) => ({
      texto: choice.textContent.trim(),
      correcta: choice.getAttribute("correct") === "yes"
    }));

    const correctas = choices.filter((choice) => choice.correcta).length;

    if (!id || !wording || choices.length !== 4 || correctas !== 1) {
      throw new Error("Cada pregunta debe tener id, enunciado, 4 respuestas y solo una correcta.");
    }

    return {
      id,
      wording,
      choices: barajar(choices)
    };
  });
}

function pintarPregunta() {
  const pregunta = preguntas[indiceActual];
  const total = preguntas.length;
  const numeroPregunta = indiceActual + 1;

  $("#contador-pregunta").textContent = `${t("pregunta")} ${numeroPregunta} ${t("de")} ${total}`;
  $("#enunciado").textContent = pregunta.wording;
  $("#barra-progreso").style.width = `${(numeroPregunta / total) * 100}%`;
  $("#siguiente").textContent = numeroPregunta === total ? t("finalizar") : t("siguiente");
  $("#aviso").textContent = "";

  const opciones = $("#opciones");
  opciones.innerHTML = "";

  pregunta.choices.forEach((choice, index) => {
    const label = document.createElement("label");
    label.className = "choice-card";

    const input = document.createElement("input");
    input.type = "radio";
    input.name = "respuesta";
    input.value = String(index);

    if (respuestasUsuario[indiceActual]?.indiceElegido === index) {
      input.checked = true;
    }

    const span = document.createElement("span");
    span.textContent = choice.texto;

    label.append(input, span);
    opciones.appendChild(label);
  });
}

function guardarRespuestaActual() {
  const seleccionada = document.querySelector('input[name="respuesta"]:checked');

  if (!seleccionada) {
    $("#aviso").textContent = t("aviso");
    return false;
  }

  const indiceElegido = Number(seleccionada.value);
  const pregunta = preguntas[indiceActual];
  const respuestaElegida = pregunta.choices[indiceElegido];
  const respuestaCorrecta = pregunta.choices.find((choice) => choice.correcta);

  respuestasUsuario[indiceActual] = {
    pregunta: pregunta.wording,
    elegida: respuestaElegida.texto,
    correcta: respuestaCorrecta.texto,
    acierto: respuestaElegida.correcta,
    indiceElegido
  };

  return true;
}

function siguientePregunta() {
  if (!guardarRespuestaActual()) return;

  if (indiceActual < preguntas.length - 1) {
    indiceActual++;
    pintarPregunta();
  } else {
    finalizarConcurso();
  }
}

function obtenerMensajeFinal(nota) {
  const mensajes = textos[idiomaActual].mensajes;
  if (nota < 5) return mensajes[0];
  if (nota < 7) return mensajes[1];
  if (nota < 9) return mensajes[2];
  return mensajes[3];
}

function guardarMejorMarca(aciertos, nota) {
  const clave = `proyectoXML_record_${idiomaActual}`;
  const recordAnterior = JSON.parse(localStorage.getItem(clave) || "null");

  if (!recordAnterior || aciertos > recordAnterior.aciertos || (aciertos === recordAnterior.aciertos && tiempo < recordAnterior.tiempo)) {
    const nuevoRecord = { aciertos, nota, tiempo };
    localStorage.setItem(clave, JSON.stringify(nuevoRecord));
    return nuevoRecord;
  }

  return recordAnterior;
}

function finalizarConcurso() {
  clearInterval(intervalo);

  const aciertos = respuestasUsuario.filter((respuesta) => respuesta.acierto).length;
  const total = preguntas.length;
  const nota = Number(((aciertos / total) * 10).toFixed(2));
  const record = guardarMejorMarca(aciertos, nota);

  $("#mensaje-final").textContent = obtenerMensajeFinal(nota);
  $("#score-final").textContent = `${aciertos} / ${total}`;
  $("#nota-final").textContent = `${nota} / 10`;
  $("#tiempo-final").textContent = formatearTiempo(tiempo);
  $("#mejor-marca").textContent = `${record.aciertos} / ${total} · ${formatearTiempo(record.tiempo)}`;
  $("#revision").innerHTML = "";
  $("#revision").classList.add("oculto");
  $("#ver-revision").textContent = t("verRevision");

  mostrarPantalla("#pantalla-resultado");
}

function pintarRevision() {
  const revision = $("#revision");
  revision.innerHTML = "";

  respuestasUsuario.forEach((respuesta, index) => {
    const item = document.createElement("article");
    item.className = `revision-item ${respuesta.acierto ? "correcta" : "incorrecta"}`;

    const titulo = document.createElement("h3");
    titulo.textContent = `${index + 1}. ${respuesta.pregunta}`;

    const estado = document.createElement("p");
    estado.innerHTML = `<strong>${respuesta.acierto ? t("correcto") : t("incorrecto")}</strong>`;

    const elegida = document.createElement("p");
    elegida.innerHTML = `<strong>${t("tuRespuesta")}:</strong> ${respuesta.elegida || t("sinRespuesta")}`;

    const correcta = document.createElement("p");
    correcta.innerHTML = `<strong>${t("respuestaCorrecta")}:</strong> ${respuesta.correcta}`;

    item.append(titulo, estado, elegida, correcta);
    revision.appendChild(item);
  });
}

function alternarRevision() {
  const revision = $("#revision");
  const estaOculta = revision.classList.contains("oculto");

  if (estaOculta && !revision.hasChildNodes()) {
    pintarRevision();
  }

  revision.classList.toggle("oculto");
  $("#ver-revision").textContent = estaOculta ? t("ocultarRevision") : t("verRevision");
}

async function comenzarConcurso() {
  idiomaActual = $("#idioma").value;
  aplicarTraducciones();
  $("#aviso").textContent = t("cargando");

  try {
    const xml = await cargarXML();
    preguntas = barajar(convertirXMLAPreguntas(xml));
    respuestasUsuario = [];
    indiceActual = 0;
    mostrarPantalla("#pantalla-quiz");
    iniciarReloj();
    pintarPregunta();
  } catch (error) {
    console.error(error);
    alert(`${t("errorCarga")}\n${t("errorXML")}`);
    mostrarPantalla("#pantalla-inicio");
  }
}

function reiniciarConcurso() {
  clearInterval(intervalo);
  tiempo = 0;
  $("#timer").textContent = "00:00";
  mostrarPantalla("#pantalla-inicio");
}

$("#idioma").addEventListener("change", () => {
  idiomaActual = $("#idioma").value;
  aplicarTraducciones();
});

$("#start").addEventListener("click", comenzarConcurso);
$("#siguiente").addEventListener("click", siguientePregunta);
$("#reiniciar-durante").addEventListener("click", reiniciarConcurso);
$("#repetir").addEventListener("click", reiniciarConcurso);
$("#ver-revision").addEventListener("click", alternarRevision);

aplicarTraducciones();
