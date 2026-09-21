# prompts_leyes_heuristicas

Registro de cómo iteramos con la IA para construir y completar los tableros.

---

## Prompt 1 · Planteo del trabajo

**Herramienta:** Claude (Cowork, app de escritorio)
**Objetivo:** que la IA entienda la consigna completa y proponga cómo armar los dos tableros.
**Prompt completo:**
> claude, tengo que hacer esta aplicacion. Algunas aclaraciones sobre la tarea de análisis de leyes y heurísticas. [se pegó la consigna completa de la cátedra: qué crear, Tablero 1 leyes UX, Tablero 2 heurísticas de Nielsen, documento de prompts y entregables]

**Resultado y ajustes:** antes de programar, la IA preguntó qué producto evaluar, cómo conseguir las capturas, si hacer uno o dos proyectos y dónde guardar el código. Respondimos: Blinkay web (y capturas de internet como apoyo), un solo proyecto con dos vistas, repo en la Mac. Buscó la ficha en el PDF del proyecto y marcó que no tenía el listado exacto de las 14 leyes.

## Prompt 2 · Relevamiento del producto

**Herramienta:** Claude (navegador integrado)
**Objetivo:** recorrer los flujos de Blinkay web y detectar hallazgos para ambos tableros.
**Prompt completo:**
> hace blinkay web y busca capturas en internet tambien

**Resultado y ajustes:** recorrió login, registro, pago de infracciones, abonos comerciales, recuperar contraseña y condiciones del servicio. Hallazgos principales: el selector de idioma no traduce, el encabezado cambia de azul a verde entre secciones, lista de casi 100 ciudades sin buscador, campo "RFC" mexicano con ayuda "DNI/Pasaporte", "Buscar" vacío sin mensaje de error y enlace de condiciones que termina en un 404. Problema: no pudo bajar las capturas como archivo porque el dominio está bloqueado en su entorno; quedaron como pendientes.

## Prompt 3 · Corrección de rumbo

**Herramienta:** Claude (Cowork)
**Objetivo:** asegurar que el entregable sea la webapp y no solo el análisis.
**Prompt completo:**
> claude, mira que tiene que ser una webapp que evalua leyes euristicas.

**Resultado y ajustes:** construyó la webapp (React + Vite) con tres vistas: resumen, tablero de leyes (filtro cumple/rompe) y tablero de heurísticas (filtro por severidad, orden por severidad). Todo el análisis quedó en un solo archivo (`src/data.js`) para poder corregirlo sin tocar el diseño. Las capturas muestran un recuadro "Captura pendiente" hasta que se agrega el PNG.
**Revisar nosotros:** [completar qué textos o severidades cambiamos después de revisar]

---

<!-- Agregar un bloque por cada prompt nuevo: herramienta, objetivo, prompt completo, resultado y ajustes. -->
