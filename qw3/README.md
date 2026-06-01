# Práctica de final de evaluación - Concurso de preguntas con XML y AJAX

## Descripción
Aplicación web que muestra un concurso de 20 preguntas sobre cine de terror cargadas dinámicamente desde archivos XML y estructuradas mediante un DTD.

La aplicación permite elegir idioma, responder las preguntas en formato de presentación, medir el tiempo empleado, calcular la puntuación final y revisar las respuestas correctas e incorrectas.

## Tecnologías utilizadas
- HTML5
- CSS
- JavaScript
- DOM
- AJAX / Fetch API
- XML
- DTD

## Funcionalidades
- Carga dinámica de preguntas desde `preguntas_es.xml` o `preguntas_en.xml`.
- Interfaz bilingüe en español e inglés.
- Presentación de una pregunta por pantalla.
- Respuestas y preguntas mezcladas aleatoriamente.
- Reloj con el tiempo empleado durante la prueba.
- Barra de progreso.
- Cálculo de aciertos, nota sobre 10 y mejor marca.
- Revisión final con respuesta elegida y respuesta correcta.
- Validación básica desde JavaScript: 20 preguntas, 4 opciones por pregunta y una única respuesta correcta.
- Diseño responsive adaptado a escritorio y móvil.

## Archivos del proyecto
```text
qw3/
├── index.html
├── style.css
├── script.js
├── test.dtd
├── preguntas_es.xml
├── preguntas_en.xml
└── README.md
```

## Validación XML
Los archivos XML declaran el DTD mediante:

```xml
<!DOCTYPE test SYSTEM "test.dtd">
```

El DTD obliga a que cada pregunta tenga:
- un enunciado,
- un bloque de respuestas,
- exactamente 4 opciones,
- un identificador único,
- y el atributo opcional `correct`, que puede valer `yes` o `no`.

Además, el JavaScript comprueba que cada pregunta tenga exactamente una respuesta correcta.

## Cómo ejecutar el proyecto
Por seguridad, algunos navegadores bloquean la carga de archivos XML si se abre el HTML directamente con doble clic. Lo recomendable es ejecutar el proyecto con una extensión como **Live Server** en Visual Studio Code.

Pasos:
1. Abrir la carpeta del proyecto en Visual Studio Code.
2. Instalar la extensión Live Server si no está instalada.
3. Hacer clic derecho sobre `index.html`.
4. Seleccionar `Open with Live Server`.

## Autor
Juan Carlos Del Carmen Benítez
