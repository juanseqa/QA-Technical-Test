#### **Tipo de prueba**
Funcional positivo

#### **Precondiciones**
Visitante no autenticado; acceso a /register

#### **Datos de entrada**
username=random, firstName='QA', lastName='User', password='P4ssw0rd!'

#### **Pasos**
1. Ir a /register
2. Completar campos válidos
3. Enviar formulario

#### **Resultados esperados**
Cuenta creada; mensaje de éxito; se puede iniciar sesión con las credenciales
