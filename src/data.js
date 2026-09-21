// Contenido de la evaluación. Todo el análisis vive acá: para corregir un texto,
// cambiar una severidad o reemplazar una captura, se edita este archivo.
// Las capturas van en /public/capturas con el nombre indicado en `captura`.

export const producto = {
  nombre: 'Blinkay',
  url: 'https://webapp.blinkay.app',
  descripcion:
    'Web app de Blinkay para pagar estacionamiento en la vía pública, comprar abonos y pagar infracciones. Es el canal web del sistema que reemplazó a los parquímetros en CABA.',
  fecha: 'Septiembre 2026',
  flujos: [
    'Inicio de sesión y cambio de idioma',
    'Alta de usuario (registro en 2 pasos)',
    'Pago de infracciones ("Pay ticket")',
    'Compra de abonos comerciales ("Buy Coupons")',
    'Recuperar contraseña',
    'Condiciones del servicio',
  ],
}

// Las 14 leyes de la ficha de referencia. `pregunta` es la pregunta guía.
// `evaluada: false` = no se documentó con evidencia en este producto.
export const leyes = [
  {
    id: 'jakob',
    nombre: 'Ley de Jakob',
    pregunta: '¿La interfaz se comporta como otras que la persona ya usa?',
    evaluada: true,
    veredicto: 'rompe',
    pantalla: 'Inicio de sesión',
    captura: '02-login-tras-espanol.png',
    explicacion:
      'En cualquier sitio, elegir "Español" traduce la pantalla. Acá se hace clic y el login sigue en inglés ("Log On", "Add New User"); solo cambia "Pay ticket" por "Pay notice". El selector no cumple lo que la persona espera de un selector de idioma.',
  },
  {
    id: 'fitts',
    nombre: 'Ley de Fitts',
    pregunta: '¿Los elementos importantes son fáciles de alcanzar y tocar?',
    evaluada: true,
    veredicto: 'rompe',
    pantalla: 'Pago de infracciones',
    captura: '05-denuncias-formulario.png',
    explicacion:
      'Para buscar la infracción es obligatorio tildar el checkbox de términos, pero el objetivo táctil es el checkbox nativo del navegador, de pocos píxeles, muy por debajo de los 44 px recomendados para tocar con el dedo. En un celular, parado en la calle, es fácil errarle.',
  },
  {
    id: 'hick',
    nombre: 'Ley de Hick',
    pregunta: '¿La cantidad de opciones hace más lenta la decisión?',
    evaluada: true,
    veredicto: 'rompe',
    pantalla: 'Pago de infracciones · Ciudad',
    captura: '04-denuncias-selector-ciudad.png',
    explicacion:
      'El selector "Ciudad" despliega casi 100 opciones de Canadá, México, EE.UU. y Honduras, sin buscador ni agrupación por país, e incluye entradas marcadas "(inactive)". Elegir la propia ciudad obliga a recorrer toda la lista.',
  },
  {
    id: 'miller',
    nombre: 'Ley de Miller',
    pregunta: '¿La información se presenta en bloques que la memoria de trabajo puede manejar?',
    evaluada: true,
    veredicto: 'rompe',
    pantalla: 'Abono comercial · Importe',
    captura: '08-abono-importes.png',
    explicacion:
      '"Importe unitario por abono" ofrece 19 montos sin agrupar (0.01, 1, 2, 3, 4, 5, 10, 20, 20.40, 25, 40.80…). Valores como 20.40 o 40.80 mezclados con redondos hacen imposible compararlos de un vistazo.',
  },
  {
    id: 'tesler',
    nombre: 'Ley de Tesler',
    pregunta: '¿La complejidad inevitable la absorbe el sistema o la persona?',
    evaluada: true,
    veredicto: 'cumple',
    pantalla: 'Registro · Paso 1',
    captura: '03-registro-paso1.png',
    explicacion:
      'El alta se divide en dos pasos (e-mail y contraseña) con un indicador arriba, y cada paso pide un solo dato con un texto que explica para qué se usa. La complejidad de crear la cuenta queda repartida y a cargo del sistema.',
  },
  {
    id: 'postel',
    nombre: 'Ley de Postel',
    pregunta: '¿El sistema es flexible con lo que acepta de la persona?',
    evaluada: true,
    veredicto: 'rompe',
    pantalla: 'Abono comercial · Datos de empresa',
    captura: '07-abono-datos-empresa.png',
    explicacion:
      'El formulario pide un "RFC" (identificador fiscal mexicano) con el texto de ayuda "escriba el DNI/Pasaporte", y exige escribir el e-mail dos veces. Es rígido en lo que pide y contradictorio sobre qué dato acepta.',
  },
  {
    id: 'doherty',
    nombre: 'Umbral de Doherty',
    pregunta: '¿El sistema responde en menos de 400 ms o da feedback mientras carga?',
    evaluada: false,
  },
  {
    id: 'pico-final',
    nombre: 'Regla pico-final',
    pregunta: '¿Cómo terminan los momentos más intensos de la experiencia?',
    evaluada: true,
    veredicto: 'rompe',
    pantalla: 'Condiciones del servicio',
    captura: '10-condiciones-404.png',
    explicacion:
      'El enlace "See service conditions" del login termina en un "404 - Server Error" genérico, sin marca, en inglés y sin salida. Es el final que se lleva quien quiere entender a qué se compromete antes de registrarse.',
  },
  {
    id: 'posicion-serial',
    nombre: 'Efecto de posición serial',
    pregunta: '¿Lo más importante está al principio o al final?',
    evaluada: false,
  },
  {
    id: 'von-restorff',
    nombre: 'Efecto Von Restorff',
    pregunta: '¿Lo que se destaca visualmente es lo que tiene que destacarse?',
    evaluada: true,
    veredicto: 'rompe',
    pantalla: 'Pago de infracciones · Botones',
    captura: '05-denuncias-formulario.png',
    explicacion:
      '"Limpiar formulario" y "Buscar" tienen el mismo tamaño, la misma forma y están lado a lado. Nada distingue la acción destructiva (borrar todo) de la principal, así que no se recuerda ni se evita.',
  },
  {
    id: 'estetica',
    nombre: 'Efecto estética-usabilidad',
    pregunta: '¿El diseño transmite confianza y hace que la interfaz parezca más fácil?',
    evaluada: true,
    veredicto: 'cumple',
    pantalla: 'Inicio de sesión',
    captura: '01-login-inicial.png',
    explicacion:
      'El login es prolijo: tarjeta blanca centrada, logo, un solo botón lleno y mucho aire. Para un servicio que pide datos de pago, esa primera impresión transmite confianza y predispone a tolerar pequeños problemas.',
  },
  {
    id: 'gradiente-meta',
    nombre: 'Efecto de gradiente de meta',
    pregunta: '¿La persona ve cuánto le falta para terminar?',
    evaluada: true,
    veredicto: 'cumple',
    pantalla: 'Pago de infracciones · Pasos',
    captura: '05-denuncias-formulario.png',
    explicacion:
      'El pago muestra tres pestañas de progreso (Parámetros de búsqueda, Pago, Pago completo) con la actual subrayada. Ver que faltan dos pasos da una meta clara y motiva a completar.',
  },
  {
    id: 'proximidad',
    nombre: 'Ley de proximidad',
    pregunta: '¿Los elementos relacionados están cerca y los distintos, separados?',
    evaluada: true,
    veredicto: 'cumple',
    pantalla: 'Inicio de sesión',
    captura: '01-login-inicial.png',
    explicacion:
      'Los campos de acceso, "Log On" y "Add New User" forman un bloque; debajo de una línea divisoria quedan "Buy Coupons" y "Pay ticket". La separación deja claro que son dos caminos distintos: entrar a la cuenta o hacer un trámite sin cuenta.',
  },
  {
    id: 'similitud',
    nombre: 'Ley de similitud',
    pregunta: '¿Los elementos que se ven parecidos funcionan parecido?',
    evaluada: true,
    veredicto: 'rompe',
    pantalla: 'Registro vs. Pago de infracciones',
    captura: '03-registro-paso1.png',
    explicacion:
      'La misma marca usa un encabezado azul en el login y en pago de infracciones, y uno verde en registro, abonos y recuperar contraseña. Pantallas del mismo producto no se reconocen como parte de un mismo sistema.',
  },
]

// Las 10 heurísticas de Nielsen. Severidad 0 a 4.
export const heuristicas = [
  {
    n: 1,
    nombre: 'Visibilidad del estado del sistema',
    severidad: 3,
    pantalla: 'Inicio de sesión',
    captura: '02-login-tras-espanol.png',
    quePasa:
      'Al elegir "Español" la página se recarga pero sigue en inglés, y ninguno de los cuatro idiomas aparece marcado como activo.',
    porQue:
      'El sistema no informa qué idioma está usando ni si la acción funcionó. La persona no sabe si hizo algo mal o si el sitio no tiene traducción.',
    impacto:
      'Quien no maneja inglés arranca el trámite sin entender los botones ("Log On", "Add New User") y probablemente vuelva a intentar o abandone.',
  },
  {
    n: 2,
    nombre: 'Correspondencia entre el sistema y el mundo real',
    severidad: 3,
    pantalla: 'Pago de infracciones',
    captura: '04-denuncias-selector-ciudad.png',
    quePasa:
      'La multa se llama "denuncia", la lista de ciudades muestra etiquetas internas como "(inactive)" o "(CWP)" y el formulario de abonos pide "RFC" y cobra en MXN.',
    porQue:
      'Es el vocabulario del operador y de otros mercados, no el de una persona en Buenos Aires. En Argentina una "denuncia" es otra cosa y el RFC no existe.',
    impacto:
      'La persona duda de si está en el lugar correcto para pagar su multa y no puede completar un dato que no tiene.',
  },
  {
    n: 3,
    nombre: 'Control y libertad del usuario',
    severidad: 3,
    pantalla: 'Condiciones del servicio',
    captura: '10-condiciones-404.png',
    quePasa:
      'La página de error no tiene logo, menú, enlace al inicio ni botón para volver. Tampoco registro, abonos ni recuperar contraseña tienen un "volver al login" visible.',
    porQue:
      'No hay salidas de emergencia claramente marcadas: la única forma de volver es el botón atrás del navegador.',
    impacto:
      'En el celular, sin la barra del navegador a la vista, la persona queda atrapada y tiene que volver a escribir la dirección.',
  },
  {
    n: 4,
    nombre: 'Consistencia y estándares',
    severidad: 3,
    pantalla: 'Pago de infracciones',
    captura: '05-denuncias-formulario.png',
    quePasa:
      'En una misma pantalla conviven etiquetas en español ("Número de denuncia") con textos de ayuda en inglés ("Your ticket number", "Confirm your email"). Además, el encabezado cambia de azul a verde según la sección.',
    porQue:
      'Palabras, idiomas y colores cambian sin razón dentro del mismo producto, así que la persona tiene que preguntarse si significan lo mismo.',
    impacto:
      'Baja la confianza justo en un formulario de pago: parece un sitio armado con partes de distintos lados.',
  },
  {
    n: 5,
    nombre: 'Prevención de errores',
    severidad: 2,
    pantalla: 'Pago de infracciones · Botones',
    captura: '05-denuncias-formulario.png',
    quePasa:
      '"Limpiar formulario" está a la izquierda de "Buscar", con el mismo tamaño y peso, y borra todo sin pedir confirmación.',
    porQue:
      'La acción destructiva está en el camino natural de la principal. El diseño invita al error en lugar de evitarlo.',
    impacto:
      'Un toque equivocado borra ciudad, número y los dos e-mails, y hay que volver a cargarlos.',
  },
  {
    n: 6,
    nombre: 'Reconocimiento antes que recuerdo',
    severidad: 2,
    pantalla: 'Inicio de sesión',
    captura: '01-login-inicial.png',
    quePasa:
      'Los campos de e-mail y contraseña no tienen etiqueta: el nombre está solo como texto de ejemplo gris, que desaparece al empezar a escribir. En pago de infracciones no se indica dónde encontrar el "número de denuncia" en el acta.',
    porQue:
      'La persona tiene que recordar qué va en cada campo y buscar sola el dato que se le pide, en vez de reconocerlo en pantalla.',
    impacto:
      'Más errores al completar y más consultas: especialmente al buscar el número de una multa en un papel que no se sabe leer.',
  },
  {
    n: 7,
    nombre: 'Flexibilidad y eficiencia de uso',
    severidad: 2,
    pantalla: 'Pago de infracciones · Ciudad',
    captura: '04-denuncias-selector-ciudad.png',
    quePasa:
      'El selector de ciudad no permite escribir para filtrar, no recuerda la última ciudad usada y no la detecta por ubicación.',
    porQue:
      'No hay aceleradores: quien paga seguido en la misma ciudad hace el mismo recorrido largo que quien entra por primera vez.',
    impacto:
      'Cada pago suma pasos innecesarios en un contexto (la calle, el celular) donde se busca resolver rápido.',
  },
  {
    n: 8,
    nombre: 'Diseño estético y minimalista',
    severidad: 0,
    pantalla: 'Registro · Paso 1',
    captura: '03-registro-paso1.png',
    quePasa:
      'El primer paso del registro muestra solo el indicador de pasos, un campo, una línea de ayuda y el botón "Next".',
    porQue:
      'No hay información irrelevante que compita con la tarea: todo lo que aparece sirve para completar ese paso.',
    impacto:
      'La persona entiende de inmediato qué tiene que hacer. Se cumple la heurística.',
  },
  {
    n: 9,
    nombre: 'Ayudar a reconocer, diagnosticar y recuperarse de los errores',
    severidad: 4,
    pantalla: 'Condiciones del servicio / Buscar vacío',
    captura: '10-condiciones-404.png',
    quePasa:
      'El enlace a las condiciones devuelve "404 - File or directory not found" de un servidor, en inglés técnico. Y al tocar "Buscar" con el formulario vacío no aparece ningún mensaje: solo se enfoca un campo.',
    porQue:
      'Los errores no están en lenguaje llano, no dicen qué pasó ni proponen cómo seguir.',
    impacto:
      'La persona no puede leer las condiciones de un servicio que le cobra, y ante un formulario que "no hace nada" no sabe qué corregir. Impide completar la tarea.',
  },
  {
    n: 10,
    nombre: 'Ayuda y documentación',
    severidad: 3,
    pantalla: 'Inicio de sesión · Pie',
    captura: '10-condiciones-404.png',
    quePasa:
      'No hay sección de ayuda ni preguntas frecuentes. Los únicos enlaces de apoyo son "See service conditions" (roto) y "Why use Blinkay?", que lleva al sitio comercial.',
    porQue:
      'La ayuda no es fácil de encontrar ni está orientada a las tareas reales: pagar, entender una multa, recuperar la cuenta.',
    impacto:
      'Ante cualquier duda la persona no tiene dónde consultar dentro del producto y depende de soporte externo.',
  },
]

export const escala = [
  { v: 0, etiqueta: 'No es un problema' },
  { v: 1, etiqueta: 'Cosmético' },
  { v: 2, etiqueta: 'Menor' },
  { v: 3, etiqueta: 'Mayor' },
  { v: 4, etiqueta: 'Catástrofe' },
]
