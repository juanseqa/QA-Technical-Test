# Compatibilidad

Se ejecutaron pruebas con **Playwright** en los tres navegadores soportados y en dos tamaños de viewport.

- **Navegadores:** Chromium, Firefox, WebKit  
- **Viewports probados:**  
  - **Móvil:** 360×640  
  - **Desktop:** 1280×800 (o superior)

## Resultados por combinación

| Navegador | 360×640 (móvil) | 1280×800 (desktop) | Observaciones |
|-----------|------------------|--------------------|---------------|
| **Chromium** | ✅ OK | ✅ OK | Flujo completo **Login → Overall → View more → Votar → Comentar** pasa sin incidentes. |
| **Firefox** | ❌ Falla (timeout) | ❌ Falla (timeout) | La página queda **cargando indefinidamente** al abrir **View more** del modelo; el test `flow-vote-comment.spec.ts` excede `60s` (**Test timeout of 60000ms exceeded**). |
| **WebKit** | ❌ Falla (timeout) | ❌ Falla (timeout) | Mismo comportamiento que Firefox: **spinner/carga infinita** al ingresar a **View more**; el test finaliza por **timeout**. |

## Detalle del problema (Firefox / WebKit)

- **Síntoma:** al hacer clic en **“View more”** de un auto en la tabla de *Overall*, la vista de detalle no termina de cargar (spinner infinito).  
- **Impacto en pruebas:** el caso `Login → Overall → Votar → Comentar` no puede continuar y falla por **timeout (60s)** en ambos viewports.  
- **Alcance:** reproducible en **Firefox** y **WebKit**; **no** se observa en **Chromium**.

## Hipótesis técnica (para el equipo)
- Diferencias de compatibilidad de **fetch/XHR** o manejo de **CORS** en FF/WebKit para el endpoint del detalle.  
- Dependencia en APIs/propiedades **no estandarizadas** (solo soportadas por Chromium).  
- Esperas basadas en `load`/`networkidle` que nunca se cumplen por **peticiones long-polling** o recursos bloqueados en esos motores.

## Recomendaciones
- Revisar en FF/WebKit la **pestaña Network** al abrir **View more** para ver si hay XHR pendientes/4xx/ bloqueos CORS.  
- Asegurar que el detalle **no dependa** de APIs específicas de Chromium.  
- Implementar **fallbacks de carga** y manejo de **errores de red**; si la API falla, mostrar contenido de error y permitir continuar.  
- En tests, evitar depender de `networkidle` si hay long-polling; preferir **aserciones por elementos clave** del DOM con `await expect(locator).toBeVisible()`.

## Conclusión
- **Compatibilidad confirmada en Chromium** (móvil y desktop).  
- **Bloqueante** en **Firefox/WebKit**: la vista **View more** no carga y provoca timeouts; requiere ajuste en frontend/API para garantizar soporte multi-navegador.

