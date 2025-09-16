# HU C — Ordenamiento y Paginación

## Vacíos/Ambigüedades
1. Columnas ordenables exactas
2. Orden asc/desc persistente al cambiar de página
3. Tamaño de página y límites
4. Estado vacío: texto e iconografía
5. Estabilidad del orden ante empates
6. Paginación accesible (teclado/aria-current)
7. Criterio por defecto al entrar
8. Límite superior de páginas y comportamiento al cambiar filtros

## NFR propuestos
- Rendimiento: cambio de orden/página ≤ 2s
- Accesibilidad: indicador visible de sort
- UX: mostrar página actual/total; mantener contexto
- Observabilidad: métricas de navegación/paginación

## Riesgos y mitigación
- Orden inestable → normalizar comparadores
- Duplicados/fantasmas → pruebas navegando ida/vuelta
- Falta de foco visible → chequeos de a11y y correcciones CSS
- Paginación rota en móvil → matriz de compatibilidad
