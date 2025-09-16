# Seguridad

## Revisiones
- No exponer contraseñas en UI ni logs
- Mensajes de error genéricos en autenticación
- Cabeceras de seguridad (CSP, X-Frame-Options, X-Content-Type-Options, HSTS si aplica)
- XSS: sanitizar comentarios (probar payloads como `<script>alert(1)</script>` deben ser escapados)

## Evidencia sugerida
- Capturas de DevTools (Network/Headers)
- Resultados básicos de ZAP Baseline (opcional)
