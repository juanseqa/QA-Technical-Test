# Accesibilidad (A11y)

## Alcance
- Login
- Detalle del modelo

## Chequeos manuales mínimos
- Navegación por teclado y foco visible
- Nombres accesibles en botones y enlaces (role/name)
- Encabezados semánticos en formularios/tablas
- Contraste básico (spot-check)
- Resultados de `@axe-core/playwright` adjuntos al reporte

## Resultado de axe
Ejecuta:
```bash
npx playwright test automation/playwright/tools/axe-scan.spec.ts --project=chromium
```
Adjunta JSON relevante o conclusiones.
