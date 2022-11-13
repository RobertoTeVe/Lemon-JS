# Rest API Exercise
---
# Laboratorio Módulo 4 API REST
---
Crea un repositorio en Github y sube todo el código de la práctica.
# Básico
---
## Descripción aplicación
---
Se quiere implementar la aplicación backend para un portal de reservas de casas, donde vamos a tener 2 páginas:
- Listado de casas:
En esta página se va a pedir a la aplicación backend un listado de las casas disponibles por país, es decir, el usuario introducirá el país en la caja de búsqueda y hará la llamada a servidor para recuperar el listado.
- Detalle de una casa:
Al seleccionar una casa, recuperará el detalle de ella, en concreto, título, imagen, descripción, dirección, número de habitaciones, número de camas, número de baños y un listado de las últimas 5 reseñas.
## Objetivos
---
A partir de la base de datos restaurada en el punto anterior se pide:
- Instalar y configurar las librerias necesarias que vamos a utilizar en el proyecto, Express, TypeScript, Babel, etc.
- Montar el proyecto de backend utilizando la estructura de pods.
- Exponer 3 endpoints:
    - Obtener listado de casas
    - Obtener detalle de una casa
    - Añadir una review: Nombre y comentario. La fecha se calcula automaticamente cuando el usuario inserta la review.
- En cada endpoint, se pide que se devuelva solamente los campos necesarios que se utilicen en la aplicación front (pista: Api Model <-> mapper <-> Model)
- Implementar los endpoints en modo mock.
- Implementar los endpoints con MongoDB (utilizando el mongo driver).
- Añadir unit tests de los ficheros mappers y helpers utilizados.
- Añadir paginación al enpdoint de listado de casas.
# Opcional
---
- Implementar los endpoints con Mongoose:
    - Crea una nueva rama en el repositorio: feature/mongoose e implementa la versión en mongoose.
- Añadir un endpoint para el login
- Añadir endpoint para actualizar el detalle de una casa.
- Securizar el endpoint anterior para que solamente un usuario admin pueda utilizarlo.
- Añadir test de integración de algún endpoint.
- Crear un console runner para restaurar el backup. 

