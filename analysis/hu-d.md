# HU D — Perfil / Cambio de contraseña

## Vacíos/Ambigüedades
1. Campos editables exactos y validaciones
2. Reglas de complejidad y longitud de nueva contraseña
3. Invalida sesiones previas tras cambio de contraseña
4. Mensajería exacta de éxito/error
5. ¿Se requiere contraseña actual siempre?
6. Tasa límite de intentos de cambio
7. Confirmación de email/notificación
8. Accesibilidad de formularios (labels, errores por campo)

## NFR propuestos
- Seguridad: no eco de password, no logs sensibles
- UX: confirmación visible y clara
- Accesibilidad: foco, roles, lectura de errores
- Observabilidad: eventos auditables sin datos sensibles

## Riesgos y mitigación
- Cambios parciales → validación atómica en backend
- Mensajes que revelan reglas → genéricos + documentación interna
- Sesiones no invalidadas → pruebas multi-sesión
- CSRF al guardar perfil → tokens y verificación
