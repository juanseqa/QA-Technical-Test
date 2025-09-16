# Prueba Técnica QA – Starter Kit (Buggy Cars Rating)

Este repositorio está listo para ejecutar las actividades solicitadas: análisis, diseño de pruebas, automatización Playwright, API, carga con k6, accesibilidad, compatibilidad, seguridad y CI.

## Apps de práctica
- **Web AUT**: https://buggy.justtestit.org/
- **API práctica**: https://reqres.in/

## Requisitos
- Node.js ≥ 18
- npm o pnpm
- (Opcional) k6 ≥ 0.46
- (Opcional) GitHub Actions para CI

## Instalación
```bash
npm i
npx playwright install --with-deps
```

## Ejecutar pruebas
```bash
# E2E (todos)
npx playwright test

# Ver reporte HTML
npx playwright show-report

# Ejecutar un archivo
npx playwright test tests/flow-vote-comment.spec.ts

# k6 (local)
k6 run performance/k6-script.js
```

## Estructura
- `analysis/` – HU A/B/C/D con vacíos, NFRs y riesgos
- `casos/` – 16+ casos funcionales (1 archivo por caso)
- `automation/playwright/` – código y config Playwright
- `api/` – colección Postman e (opcional) schemas para contract testing
- `performance/` – script k6 y reporte
- `a11y/`, `compat/`, `security/`, `exploratorias/`, `red/` – entregables de accesibilidad, compatibilidad, seguridad, exploratorias e intercepción
- `.github/workflows/ci.yml` – pipeline de CI con Playwright + matriz de navegadores

## Supuestos y limitaciones
- El sitio demo podría estar intermitente; los tests incluyen *timeouts* y *retries* básicos.
- Los usuarios creados se basan en un sufijo aleatorio para evitar colisiones.

---

**Nota:** Este kit es un punto de partida práctico para completar la prueba en tiempos razonables.
