# Administrador de Servicios y Reservas

Proyecto backend hecho en Node.js utilizando Express y ESM (import/export).  
Permite manejar un listado de servicios y un sistema básico de reservas, incluyendo la asignación de servicios a cada reserva.  
La aplicación está desarrollada con arquitectura por capas, separando responsabilidades en routers, controllers, managers y data.

---

# Arquitectura del Proyecto

```
src/
├── config/
│    └── env.config.js
├── controllers/
│    ├── bookings.controller.js
│    └── services.controller.js
├── data/
│    ├── bookings.json
│    └── services.json
├── managers/
│    ├── BookingManager.js
│    └── ServiceManager.js
├── routes/
│    ├── bookings.router.js
│    └── services.router.js
├── app.js
└── server.js
```

### Routers
Definen las rutas y delegan la lógica a los controllers.  
No contienen validaciones ni acceso a archivos.

### Controllers
Reciben `req` y `res`, validan datos de entrada y llaman a los managers.  
Son responsables de devolver las respuestas HTTP.

### Managers
Contienen la lógica de negocio.  
Manipulan los archivos JSON, generan IDs, validan campos y actualizan datos.

### Data
Archivos JSON que actúan como almacenamiento persistente.

---

# Instalación

Instalar dependencias:

```
npm install
```


Crear un archivo `.env` en la raíz del proyecto con:

```
PORT=3000
NODE_ENV=development
```


(El archivo `.env` no se sube al repositorio)

---

# Ejecutar el proyecto

```
npm start
```


El servidor se inicia en el puerto indicado en el archivo `.env`.

---

# Variables de entorno

El proyecto usa dos variables:

- PORT: puerto del servidor  
- NODE_ENV: entorno de ejecución  

En el archivo `.env.example` están los nombres sin valores.

---

# Servicios

## Clase ServiceManager

La clase se encarga de manejar un listado de servicios almacenados en un archivo JSON.  
Se ocupa de:

- Crear servicios nuevos  
- Listar todos los servicios  
- Buscar servicios por ID  
- Actualizar servicios existentes  
- Eliminar servicios  
- Validar campos obligatorios  
- Generar el ID automáticamente  

Cada servicio tiene:

- id  
- name  
- description  
- duration  
- price  
- category  
- available  

---

## Métodos

- getServices(): devuelve todos los servicios  
- getServiceById(id): busca un servicio por id  
- addService(data): agrega un servicio nuevo  
- updateService(id, data): actualiza un servicio existente  
- deleteService(id): elimina un servicio por id  

---

## Validaciones

Los métodos POST y PUT requieren los siguientes campos:

- name (string)  
- description (string)  
- duration (number)  
- price (number)  
- category (string)  
- available (boolean)  

Si falta algún campo → 400 Bad Request  
Si el servicio no existe → 404 Not Found  
El ID no puede modificarse manualmente.

---

## Generación de ID

El ID se genera automáticamente de forma incremental dentro del ServiceManager.  
No puede ser modificado ni enviado desde el cliente.

---

## Filtros en GET /api/services

El endpoint permite filtrar servicios usando query params:

- ?category=salud  
- ?available=true  

Si no se envía ningún filtro, se devuelven todos los servicios.  
Los filtros pueden combinarse.

---

# Endpoints REST — Servicios

### GET /api/services
Devuelve todos los servicios.  
Permite filtros opcionales por categoría y disponibilidad.

### GET /api/services/:sid
Devuelve un servicio por id.  
- 200 si existe  
- 404 si no existe  

### POST /api/services
Crea un servicio nuevo.  
- 201 si se crea  
- 400 si faltan campos  
El id se genera automáticamente.

### PUT /api/services/:sid
Actualiza un servicio existente.  
- 200 si existe  
- 404 si no existe  
No permite modificar el id.

### DELETE /api/services/:sid
Elimina un servicio.  
- 200 si existe  
- 404 si no existe  

---

## Ejemplo de creación de servicio (POST)

```
POST /api/services
{
"name": "Masaje descontracturante",
"description": "Sesión de 60 minutos",
"duration": 60,
"price": 7000,
"category": "salud",
"available": true
}

Código

Respuesta:

201 Created
{
"id": 3,
"name": "Masaje descontracturante",
"description": "Sesión de 60 minutos",
"duration": 60,
"price": 7000,
"category": "salud",
"available": true
}
```


---

# Reservas

## Clase BookingManager

Administra las reservas almacenadas en `bookings.json`.  
Permite:

- Crear reservas  
- Listar todas las reservas  
- Buscar reservas por ID  
- Agregar servicios a una reserva  
- Incrementar la cantidad de un servicio si ya existe en la reserva  

Cada reserva tiene:

- id  
- clientName  
- clientEmail  
- date  
- time  
- status  
- services (array)  

---

## Métodos

- getBookings(): devuelve todas las reservas  
- getBookingById(id): busca una reserva por id  
- createBooking(data): crea una reserva nueva  
- addServiceToBooking(bid, sid): agrega un servicio a la reserva o incrementa su cantidad  

---

# Endpoints REST — Reservas

### GET /api/bookings
Devuelve todas las reservas.

### GET /api/bookings/:bid
Devuelve una reserva por id.  
- 200 si existe  
- 404 si no existe  

### POST /api/bookings
Crea una reserva nueva.  
Campos obligatorios:

- clientName  
- clientEmail  
- date  
- time  
- status  

### POST /api/bookings/:bid/services/:sid
Agrega un servicio a una reserva.  
Si el servicio ya existe dentro de la reserva, incrementa `quantity`.

Ejemplo de respuesta:

```
{
"id": 1,
"clientName": "Miguel",
"clientEmail": "miguel@example.com",
"date": "2024-10-01",
"time": "15:00",
"status": "pendiente",
"services": [
{
"service": 1,
"quantity": 2
}
]
}
```

---

# app.js

Configura Express, los middlewares y las rutas del proyecto.  
Importa los routers y define las rutas base.

# server.js

Levanta el servidor en el puerto definido en el archivo `.env`.

---

# Rutas base

```
/api/services
/api/bookings
```

---

# Notas

- No se sube `node_modules` ni `.env` al repositorio.  
- El id de los servicios y reservas se genera automáticamente.  
- Proyecto sin base de datos, usando almacenamiento en archivos JSON.  
- Arquitectura por capas implementada correctamente (routers → controllers → managers → data).