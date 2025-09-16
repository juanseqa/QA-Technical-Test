# HU A — Registro y Login

## Vacíos/Ambigüedades (≥8)
1. ¿Requisitos exactos de complejidad de contraseña?
2. ¿Longitud mínima/máxima de username/password?
3. ¿Formato permitido de username (espacios, mayúsculas, símbolos)?
4. ¿Mensajes exactos ante usuario existente / credenciales inválidas?
5. ¿Persistencia de sesión tras cerrar y reabrir navegador?
6. ¿Bloqueo por intentos fallidos (rate limiting/captcha)?
7. ¿Política de expiración de sesión?
8. ¿Compatibilidad de navegadores móviles?
9. ¿Campos adicionales requeridos por AUT (email)?

## NFR propuestos
- Rendimiento: feedback ≤ 2s
- Seguridad: no revelar existencia de usuario; no loggear contraseñas; HTTPS
- UX: mensajes claros, accesibles y consistentes
- Accesibilidad: roles/nombres accesibles; foco visible
- Observabilidad: logs de eventos de auth sin datos sensibles

## Riesgos y mitigación
- Colisión de username → Implementar validaciones en backend para verificar si el username ya existe y mostrar un mensaje claro.
- Mensajes inconsistentes → Crear un catálogo centralizado de mensajes.
- Sesiones no persistentes → Validar que se use un token/cookie seguro y que la sesión se mantenga hasta que expire o se cierre.
- Rate limiting ausente (si no hay un límite de intentos de login, un atacante podría hacer fuerza bruta para adivinar contraseñas.) → Recomendar implementación de rate limiting o CAPTCHA después de varios intentos.