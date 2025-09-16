# HU B — Votar y Comentar

## Vacíos/Ambigüedades
1. ¿Límite de votos por usuario y por periodo? - sin reglas claras, puede haber abuso del sistema de votos.
2. ¿el contador debe subir inmediatamente (live update) o solo al refrescar la página? - afecta la experiencia de usuario
3. ¿Longitud mínima/máxima del comentario? - sin reglas, pueden entrar comentarios inútiles (vacíos) o muy largos que dañen la base de datos/UX.
4. ¿el sistema debe bloquear groserías, spam, o solo validar que no haya código malicioso? - sin sanitización, hay riesgo de ataques de seguridad o mala calidad del contenido.
5. ¿Mensajería exacta en doble voto? - inconsistencia en UX si no hay un mensaje definido.
6. ¿Soporte offline/reintentos? - sin definición, la experiencia puede ser frustrante.
7. ¿Orden de comentarios (reciente/antiguo)? - confusión para usuarios y testers si no hay un criterio claro.
8. ¿Permisos para editar/borrar comentario propio? - cambia totalmente la funcionalidad y los casos de prueba necesarios.

## NFR propuestos
- Accesibilidad teclado/lectores
- Seguridad: escapado del contenido (anti-XSS)
- Usabilidad: feedback visible del registro de voto/comentario
- Rendimiento: respuesta ≤ 2s

## Riesgos y mitigación
- Doble voto por race condition → usar locks, validación de unicidad de voto por usuario/modelo, y rechazar peticiones duplicadas.
- si el sistema permite insertar HTML/JavaScript en los comentarios (ej. <script>alert(1)</script>), se produce un ataque de Cross-Site Scripting que afecta a otros usuarios. → sanitizar y escapar el contenido antes de guardarlo/mostrarlo, incluir pruebas con payloads maliciosos (XSS, HTML, emojis extremos, etc.) para confirmar que se bloquea o limpia el contenido.
- Tras votar o comentar, el usuario no recibe confirmación (mensaje, notificación, cambio en la UI). Esto deja la duda de si la acción funcionó o no. → Implementar UI states claros: toasts, mensajes inline, cambio visual en botones.
- el número total de votos o comentarios puede no coincidir entre sesiones/páginas → alidar que el backend devuelva el valor correcto siempre.
