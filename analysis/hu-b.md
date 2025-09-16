# HU B — Votar y Comentar

## Vacíos/Ambigüedades
1. ¿Límite de votos por usuario y por periodo?
2. ¿Actualización en tiempo real del contador?
3. ¿Longitud mínima/máxima del comentario?
4. ¿Criterios de moderación/sanitización?
5. ¿Mensajería exacta en doble voto?
6. ¿Soporte offline/reintentos?
7. ¿Orden de comentarios (reciente/antiguo)?
8. ¿Permisos para editar/borrar comentario propio?

## NFR propuestos
- Accesibilidad teclado/lectores
- Seguridad: escapado del contenido (anti-XSS)
- Usabilidad: feedback visible del registro de voto/comentario
- Rendimiento: respuesta ≤ 2s

## Riesgos y mitigación
- Doble voto por race condition → locks/chequeos de backend; pruebas concurrentes
- XSS en comentarios → pruebas con payloads y validaciones server-side
- Pérdida de feedback → pruebas de UI states y toasts
- Contador inconsistente → pruebas tras recarga y nuevas sesiones
