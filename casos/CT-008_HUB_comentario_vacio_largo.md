#### **Tipo de prueba**
Funcional negativo

#### **Precondiciones**
Usuario autenticado

#### **Datos de entrada**
comentario='' y comentario='x'*5000 (si hay límite)

#### **Pasos**
1. Intentar enviar vacío
2. Intentar enviar excediendo límite

#### **Resultados esperados**
Rechazo con mensajes claros; no se guarda nada; sin errores 5xx
