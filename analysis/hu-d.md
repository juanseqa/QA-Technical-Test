# HU D — Perfil / Cambio de contraseña

## Vacíos/Ambigüedades
1. No está definido qué campos del perfil se pueden editar (¿solo nombre y apellido?, ¿también email, teléfono?). Tampoco qué validaciones aplicar. - QA no sabe qué probar y devs pueden implementar de más o de menos.
2. No se especifica si la nueva contraseña debe tener mayúsculas, números, caracteres especiales, ni la longitud mínima/máxima. - Riesgo de contraseñas débiles o de rechazos inesperados.
3. Invalida sesiones previas tras cambio de contraseña - Si no se define, un atacante que ya inició sesión puede seguir con acceso.
4. No está definido qué mensajes mostrar tras un cambio exitoso o al fallar (ej. “Contraseña cambiada con éxito” o genérico). - Mala UX o mensajes inconsistentes.
5. No se aclara si para cambiar la contraseña siempre se debe ingresar la contraseña actual, o si basta con estar logueado.no se aclara si para cambiar la contraseña siempre se debe ingresar la contraseña actual, o si basta con estar logueado. - Sin esto, hay riesgo de que alguien con acceso físico pueda cambiarla sin saber la anterior.
6. Tasa límite de intentos de cambio - Un atacante podría usar fuerza bruta para probar contraseñas actuales hasta acertar.
7. Confirmación de email/notificación - Sin confirmación, el usuario no sabría si su cuenta fue comprometida.
8. No está claro si los formularios cumplen accesibilidad (ej. cada input con label, errores asociados a campos, navegación por teclado). - Puede excluir a usuarios con lector de pantalla y afecta cumplimiento de normas WCAG.

## NFR propuestos
- Seguridad: no eco de password, no logs sensibles
- UX: confirmación visible y clara
- Accesibilidad: foco, roles, lectura de errores
- Observabilidad: eventos auditables sin datos sensibles

## Riesgos y mitigación
- Que el sistema guarde solo algunos campos y deje el perfil en un estado inconsistente (ej. cambia el nombre pero no actualiza la contraseña). → implementar validación atómica en backend (o se guardan todos los cambios juntos (transacción), o ninguno).
- Que los mensajes de error den demasiada información (ej. “La contraseña debe tener al menos 8 caracteres, una mayúscula, un número y un símbolo”). Eso ayuda a un atacante a deducir las reglas de seguridad. → Mostrar mensajes genéricos al usuario (“La contraseña no cumple los requisitos”) y mantener la documentación interna para soporte/QA.
- Si el usuario cambia la contraseña pero las sesiones abiertas en otros dispositivos siguen activas, un atacante que ya tenía acceso conserva control. → Hacer pruebas multi-sesión (cambiar contraseña y revisar si las demás sesiones se cierran). A nivel técnico, invalidar tokens/cookies anteriores.
- Un atacante podría hacer un Cross-Site Request Forgery (CSRF): engañar al usuario para que envíe una petición maliciosa que cambia su perfil o contraseña sin darse cuenta. → Usar tokens CSRF en los formularios y verificar origen de la petición antes de aceptar cambios.
