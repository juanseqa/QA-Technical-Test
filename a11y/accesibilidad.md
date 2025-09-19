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

### Evidencia Axe (A11y)
Se ejecutó un análisis con **axe-core/playwright** en las vistas de Login y Detalle de modelo.  
El reporte completo está disponible en `a11y/a11y-report.json`.

**Hallazgos principales:**
- **Críticos:**
  - Inputs de login y password sin `label` explícito.
- **Serios:**
  - Contraste insuficiente en botones/links.
  - Falta de mecanismo para saltar navegación repetitiva.
- **Moderados:**
  - Landmarks duplicados (`banner`, `nav`).
  - Orden de headings inconsistente.
- **Menores:**
  - Imágenes sin `alt` adecuado (logos, spinner).

**Recomendaciones:**
- Asociar `label` visibles a todos los campos de formulario.
- Asegurar contraste mínimo 4.5:1 en textos y botones.
- Añadir skip links o landmarks `<main>` para navegación por teclado.
- Hacer únicos los landmarks con `aria-label`.
- Añadir `alt` a imágenes relevantes y `role="presentation"` a decorativas.

