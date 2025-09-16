# HU C — Ordenamiento y Paginación

## Vacíos/Ambigüedades
1. No se sabe cuáles columnas de la tabla permiten ordenamiento (ej. ¿solo “Votes” y “Rank”, o también “Model”, “Brand”?). - Los testers no saben qué validar, y los usuarios podrían confundirse si intentan ordenar algo que no está definido.
2. Si el usuario ordena en la página 1 y luego va a la página 2, ¿se mantiene el orden elegido o se resetea? - Mala experiencia si el orden no es consistente; afecta validaciones de QA.
3. Tamaño de página y límites - Sin definirlo, pueden existir errores de paginación o expectativas distintas.
4. Si no hay registros en la tabla (por filtro o datos), ¿qué se muestra? (ej. “No hay resultados” + ícono). - Si no se define, la UI puede quedar rota o vacía sin feedback.
5. Si dos filas tienen el mismo valor en la columna de orden, ¿cómo se decide el orden entre ellas? (ej. ordenar alfabéticamente como criterio secundario). - La tabla puede verse inconsistente en cada recarga.
6. No se especifica si la paginación cumple accesibilidad: ¿se puede navegar con teclado? - Sin accesibilidad mínima, personas con lector de pantalla no podrán usar la funcionalidad.
7. Al abrir la pantalla, ¿la tabla se ordena por defecto por “Rank”, por “Votes”, o sin orden explícito? - Inconsistencia y confusión para usuario y QA.
8. ¿Qué pasa si hay muchísimas páginas? ¿se muestran todas o se limita a un rango (ej. 1…10…20)? ¿y si aplico un filtro, se reinicia a la página 1 o mantiene la página previa? - Puede romper la navegación o dar resultados inesperados.

## NFR propuestos
- Rendimiento: cambio de orden/página ≤ 2s
- Accesibilidad: indicador visible de sort
- UX: mostrar página actual/total; mantener contexto
- Observabilidad: métricas de navegación/paginación

## Riesgos y mitigación
- Cuando hay filas con valores iguales en la columna ordenada, el sistema no define un criterio secundario (ej. orden alfabético). Resultado: cada vez que recargas, las filas aparecen en orden distinto → “Normalizar comparadores”: definir reglas claras de desempate (ej. si dos autos tienen mismo rank, ordenar por nombre).
- Al navegar entre páginas, algunos registros pueden repetirse (duplicados) o desaparecer sin motivo (fantasmas), por errores en la paginación. → pruebas navegando ida/vuelta
- En la paginación, si un usuario usa teclado o lector de pantalla, puede no verse el estado de foco (qué página está seleccionada). Esto rompe accesibilidad. → QA debe hacer chequeos de accesibilidad (a11y) para confirmar que el foco es visible y que aria-current se aplica.
- Paginación rota en móvil → Probar en una matriz de compatibilidad (diferentes dispositivos, navegadores y resoluciones).
