import { useEffect, useMemo, useState } from 'react'
import { producto, leyes, heuristicas, escala } from './data.js'

function useRuta() {
  const leer = () => window.location.hash.replace('#', '') || '/'
  const [ruta, setRuta] = useState(leer)
  useEffect(() => {
    const on = () => { setRuta(leer()); window.scrollTo(0, 0) }
    window.addEventListener('hashchange', on)
    return () => window.removeEventListener('hashchange', on)
  }, [])
  return ruta
}

function Captura({ archivo, alt, onAbrir }) {
  const [falta, setFalta] = useState(false)
  if (!archivo) return null
  if (falta) {
    return (
      <div className="captura captura-falta">
        <span>Captura pendiente</span>
        <code>public/capturas/{archivo}</code>
      </div>
    )
  }
  return (
    <button className="captura" onClick={() => onAbrir(archivo, alt)} aria-label={`Ampliar captura: ${alt}`}>
      <img src={`/capturas/${archivo}`} alt={alt} loading="lazy" onError={() => setFalta(true)} />
      <span className="captura-zoom">Ampliar</span>
    </button>
  )
}

function Lightbox({ img, onCerrar }) {
  useEffect(() => {
    if (!img) return
    const k = (e) => e.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [img, onCerrar])
  if (!img) return null
  return (
    <div className="lightbox" onClick={onCerrar} role="dialog" aria-modal="true" aria-label={img.alt}>
      <img src={`/capturas/${img.archivo}`} alt={img.alt} />
      <p>{img.alt} · <span>tocá en cualquier lado o Esc para cerrar</span></p>
    </div>
  )
}

function Nav({ ruta }) {
  const items = [
    { href: '/', label: 'Resumen' },
    { href: '/leyes', label: 'Leyes UX' },
    { href: '/heuristicas', label: 'Heurísticas' },
  ]
  return (
    <header className="nav">
      <a href="#/" className="marca">
        <span className="marca-logo">UX</span>
        <span>Evaluación <strong>{producto.nombre}</strong></span>
      </a>
      <nav>
        {items.map((i) => (
          <a key={i.href} href={`#${i.href}`} className={ruta === i.href ? 'activo' : ''}>{i.label}</a>
        ))}
      </nav>
    </header>
  )
}

function Veredicto({ v }) {
  return <span className={`badge badge-${v}`}>{v === 'cumple' ? '✓ Cumple' : '✕ Rompe'}</span>
}

function Severidad({ s, grande }) {
  const e = escala.find((x) => x.v === s)
  return (
    <span className={`sev sev-${s} ${grande ? 'sev-grande' : ''}`} title={`Severidad ${s}: ${e.etiqueta}`}>
      <b>{s}</b> {e.etiqueta}
    </span>
  )
}

function Resumen() {
  const evaluadas = leyes.filter((l) => l.evaluada)
  const cumple = evaluadas.filter((l) => l.veredicto === 'cumple').length
  const rompe = evaluadas.length - cumple
  const conteo = escala.map((e) => ({ ...e, n: heuristicas.filter((h) => h.severidad === e.v).length }))
  const max = Math.max(...conteo.map((c) => c.n), 1)
  const peores = [...heuristicas].sort((a, b) => b.severidad - a.severidad).slice(0, 3)
  const media = (heuristicas.reduce((s, h) => s + h.severidad, 0) / heuristicas.length).toFixed(1)

  return (
    <main className="contenedor">
      <section className="hero">
        <p className="kicker">Evaluación de usabilidad · {producto.fecha}</p>
        <h1>{producto.nombre} web, bajo la lupa de 14 leyes UX y las 10 heurísticas de Nielsen</h1>
        <p className="lead">{producto.descripcion}</p>
        <a className="link-externo" href={producto.url} target="_blank" rel="noreferrer">{producto.url.replace('https://', '')} ↗</a>
      </section>

      <section className="tarjetas-resumen">
        <a href="#/leyes" className="panel panel-link">
          <p className="panel-titulo">Tablero 1 · Leyes UX</p>
          <p className="numero">{evaluadas.length}<span>/14 documentadas</span></p>
          <div className="barra-dividida" aria-label={`${cumple} cumplen, ${rompe} rompen`}>
            <span className="b-cumple" style={{ flex: cumple }} />
            <span className="b-rompe" style={{ flex: rompe }} />
          </div>
          <p className="leyenda"><i className="d-cumple" /> {cumple} cumplen <i className="d-rompe" /> {rompe} rompen</p>
          <span className="ir">Ver tablero →</span>
        </a>

        <a href="#/heuristicas" className="panel panel-link">
          <p className="panel-titulo">Tablero 2 · Heurísticas de Nielsen</p>
          <p className="numero">{media}<span> severidad media (0–4)</span></p>
          <div className="histo" role="img" aria-label="Cantidad de heurísticas por nivel de severidad">
            {conteo.map((c) => (
              <div key={c.v} className="histo-col">
                <span className="histo-n">{c.n}</span>
                <span className={`histo-barra sev-bg-${c.v}`} style={{ height: `${(c.n / max) * 64 + 4}px` }} />
                <span className="histo-v">{c.v}</span>
              </div>
            ))}
          </div>
          <span className="ir">Ver tablero →</span>
        </a>
      </section>

      <section className="dos-col">
        <div className="panel">
          <p className="panel-titulo">Problemas más graves</p>
          <ol className="lista-peores">
            {peores.map((h) => (
              <li key={h.n}>
                <Severidad s={h.severidad} />
                <div><strong>{h.nombre}</strong><p>{h.quePasa}</p></div>
              </li>
            ))}
          </ol>
        </div>
        <div className="panel">
          <p className="panel-titulo">Método</p>
          <p>Recorrimos los flujos públicos de la web app como lo haría una persona que llega por primera vez:</p>
          <ul className="lista-flujos">{producto.flujos.map((f) => <li key={f}>{f}</li>)}</ul>
          <p className="nota">Leyes: cumple o rompe en el punto analizado. Heurísticas: escala de severidad de Nielsen, de 0 (no es un problema) a 4 (catástrofe de usabilidad). Cada hallazgo tiene su captura.</p>
        </div>
      </section>
    </main>
  )
}

function Filtros({ opciones, valor, onCambio, etiqueta }) {
  return (
    <div className="filtros" role="group" aria-label={etiqueta}>
      {opciones.map((o) => (
        <button key={o.v} className={valor === o.v ? 'activo' : ''} onClick={() => onCambio(o.v)} aria-pressed={valor === o.v}>
          {o.label} <span className="cuenta">{o.n}</span>
        </button>
      ))}
    </div>
  )
}

function TableroLeyes({ abrir }) {
  const [filtro, setFiltro] = useState('todas')
  const evaluadas = leyes.filter((l) => l.evaluada)
  const opciones = [
    { v: 'todas', label: 'Todas', n: evaluadas.length },
    { v: 'cumple', label: 'Cumple', n: evaluadas.filter((l) => l.veredicto === 'cumple').length },
    { v: 'rompe', label: 'Rompe', n: evaluadas.filter((l) => l.veredicto === 'rompe').length },
  ]
  const visibles = evaluadas.filter((l) => filtro === 'todas' || l.veredicto === filtro)
  const noEval = leyes.filter((l) => !l.evaluada)

  return (
    <main className="contenedor">
      <section className="cabecera">
        <p className="kicker">Tablero 1</p>
        <h1>Leyes UX</h1>
        <p className="lead">Recorrimos las navegaciones principales con las 14 leyes de la ficha como checklist. Documentamos {evaluadas.length} con evidencia real; cada una responde su pregunta guía.</p>
        <Filtros opciones={opciones} valor={filtro} onCambio={setFiltro} etiqueta="Filtrar por veredicto" />
      </section>

      <div className="grilla">
        {visibles.map((l) => (
          <article key={l.id} className="ficha" id={l.id}>
            <Captura archivo={l.captura} alt={`${l.nombre} · ${l.pantalla}`} onAbrir={abrir} />
            <div className="ficha-cuerpo">
              <div className="ficha-top">
                <h2>{l.nombre}</h2>
                <Veredicto v={l.veredicto} />
              </div>
              <p className="pregunta">{l.pregunta}</p>
              <p className="donde">📍 {l.pantalla}</p>
              <p>{l.explicacion}</p>
            </div>
          </article>
        ))}
      </div>

      {noEval.length > 0 && (
        <section className="panel no-eval">
          <p className="panel-titulo">Leyes sin evidencia clara en este producto</p>
          <ul>
            {noEval.map((l) => <li key={l.id}><strong>{l.nombre}</strong> — {l.pregunta}</li>)}
          </ul>
          <p className="nota">La consigna permite priorizar las más evidentes. Estas no se documentaron porque en el recorrido no apareció un punto concreto que las muestre con claridad.</p>
        </section>
      )}
    </main>
  )
}

function TableroHeuristicas({ abrir }) {
  const [filtro, setFiltro] = useState('todas')
  const [orden, setOrden] = useState('numero')
  const opciones = [
    { v: 'todas', label: 'Todas', n: heuristicas.length },
    ...escala.map((e) => ({ v: e.v, label: `${e.v} · ${e.etiqueta}`, n: heuristicas.filter((h) => h.severidad === e.v).length })).filter((o) => o.n > 0),
  ]
  const visibles = useMemo(() => {
    const f = heuristicas.filter((h) => filtro === 'todas' || h.severidad === filtro)
    return orden === 'severidad' ? [...f].sort((a, b) => b.severidad - a.severidad || a.n - b.n) : f
  }, [filtro, orden])

  return (
    <main className="contenedor">
      <section className="cabecera">
        <p className="kicker">Tablero 2</p>
        <h1>Heurísticas de Nielsen</h1>
        <p className="lead">Evaluación heurística completa: las 10, sin excepción. La severidad sigue la escala de Nielsen; con severidad 0 mostramos dónde se cumple bien.</p>
        <div className="escala" aria-label="Escala de severidad">
          {escala.map((e) => <Severidad key={e.v} s={e.v} />)}
        </div>
        <div className="controles">
          <Filtros opciones={opciones} valor={filtro} onCambio={setFiltro} etiqueta="Filtrar por severidad" />
          <label className="orden">
            Ordenar por
            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="numero">Número de heurística</option>
              <option value="severidad">Severidad (mayor primero)</option>
            </select>
          </label>
        </div>
      </section>

      <div className="lista-h">
        {visibles.map((h) => (
          <article key={h.n} className={`fila-h borde-sev-${h.severidad}`} id={`h${h.n}`}>
            <div className="fila-h-texto">
              <div className="ficha-top">
                <h2><span className="num">{String(h.n).padStart(2, '0')}</span>{h.nombre}</h2>
                <Severidad s={h.severidad} grande />
              </div>
              <p className="donde">📍 {h.pantalla}</p>
              <dl>
                <dt>Qué pasa</dt><dd>{h.quePasa}</dd>
                <dt>{h.severidad === 0 ? 'Por qué cumple' : 'Por qué rompe'}</dt><dd>{h.porQue}</dd>
                <dt>Impacto en la persona usuaria</dt><dd>{h.impacto}</dd>
              </dl>
            </div>
            <Captura archivo={h.captura} alt={`H${h.n} ${h.nombre} · ${h.pantalla}`} onAbrir={abrir} />
          </article>
        ))}
      </div>
    </main>
  )
}

export default function App() {
  const ruta = useRuta()
  const [img, setImg] = useState(null)
  const abrir = (archivo, alt) => setImg({ archivo, alt })
  return (
    <>
      <Nav ruta={ruta} />
      {ruta === '/leyes' ? <TableroLeyes abrir={abrir} /> : ruta === '/heuristicas' ? <TableroHeuristicas abrir={abrir} /> : <Resumen />}
      <footer className="pie contenedor">
        Trabajo práctico · Leyes UX y heurísticas de Nielsen · Producto evaluado: {producto.nombre} ({producto.url.replace('https://', '')})
      </footer>
      <Lightbox img={img} onCerrar={() => setImg(null)} />
    </>
  )
}
