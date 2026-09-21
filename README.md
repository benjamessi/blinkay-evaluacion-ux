# Evaluación UX de Blinkay web

Webapp con dos tableros de evaluación sobre [webapp.blinkay.app](https://webapp.blinkay.app):

- **Leyes UX** (`/#/leyes`): 12 de las 14 leyes de la ficha, con cumple/rompe, captura y explicación.
- **Heurísticas de Nielsen** (`/#/heuristicas`): las 10, con severidad 0–4, captura y análisis de impacto.

Contenido estático. Todo el análisis está en `src/data.js`; las capturas en `public/capturas/`.

## Correr local
```bash
npm install
npm run dev
```

## Deploy
Importar el repo en Vercel (framework: Vite, sin configuración extra).
