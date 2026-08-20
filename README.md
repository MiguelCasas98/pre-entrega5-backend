# Administrador de Servicios y Reservas

Proyecto backend desarrollado en Node.js + Express utilizando ESM (import/export) y arquitectura por capas.
Permite administrar servicios y reservas, incluyendo la asignación de servicios a cada reserva y el manejo de cantidades.
La persistencia se realiza mediante archivos JSON.

---

# Arquitectura del Proyecto
### Estructura de carpetas

```
src/
├── config/
│   └── env.config.js
├── controllers/
│   ├── bookings.controller.js
│   └── services.controller.js
├── dao/
│   ├── bookings.dao.js
│   └── services.dao.js
├── data/
│   ├── bookings.json
│   └── services.json
├── repositories/
│   ├── bookings.repository.js
│   └── services.repository.js
├── routes/
│   ├── bookings.router.js
│   └── services.router.js
├── services/
│   ├── bookings.service.js
│   └── services.service.js
├── app.js
└── server.js
```

### Routers
Definen las rutas y delegan la lógica a los controllers.
No contienen validaciones ni acceso a archivos.

### Controllers
Reciben req y res, validan datos y llaman a los services.
Son responsables de devolver las respuestas HTTP.

### Services
Contienen la lógica de negocio: validaciones, reglas, incrementos de cantidad, filtros y manejo de errores.

### Repositories
Capa intermedia que delega en los DAOs.
No contiene lógica de negocio.

### DAOs
Acceden directamente a los archivos JSON.
Se encargan de leer, escribir y generar IDs.

### Data
Archivos JSON que actúan como almacenamiento persistente.

---

# Instalación

### Instalar dependencias

```
npm install
```

### Crear archivo .env

```
PORT=3000
NODE_ENV=development
```

El archivo .env no se sube al repositorio.

---

# Ejecutar el proyecto

```
npm start
```

El servidor se inicia en el puerto definido en .env.

---

# Variables de entorno

* PORT → puerto del servidor

* NODE_ENV → entorno de ejecución

Existe un archivo .env.example con los nombres de las variables.

---

# Servicios
### Clase ServicesService (DAO + Repository + Service)
Administra los servicios almacenados en services.json.

### Funcionalidades

* Crear servicios

* Listar servicios

* Buscar por ID

* Actualizar

* Eliminar

* Validar campos

* Generar ID automáticamente

### Estructura de un servicio

* id

* name

* description

* duration

* price

* category

* available
---

# Métodos principales

* getServices()

* getServiceById(id)

* createService(data)

* updateService(id, data)

* deleteService(id)
---

# Validaciones

Campos obligatorios para POST y PUT:

* name (string)

* description (string)

* duration (number)

* price (number)

* category (string)

* available (boolean)

Errores:

* 400 → faltan campos

* 404 → servicio no encontrado
---

# Generación de ID

El ID se genera automáticamente dentro del DAO.
No puede enviarse desde el cliente.

---

# Filtros en GET /api/services
Query params disponibles:

* ?category=salud

* ?available=true

Se pueden combinar.

---

# Endpoints REST — Servicios
### GET /api/services
Devuelve todos los servicios (con filtros opcionales).

### GET /api/services/:sid
Devuelve un servicio por ID.

* 200 si existe

* 404 si no existe

### POST /api/services
Crea un servicio nuevo.

* 201 si se crea

* 400 si faltan campos

### PUT /api/services/:sid
Actualiza un servicio.

* 200 si existe

* 404 si no existe

### DELETE /api/services/:sid
Elimina un servicio.

* 200 si existe

* 404 si no existe

---

# Ejemplo de creación (POST)

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
```

Respuesta:

```
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
### Clase BookingManager (DAO + Repository + Service)
Administra las reservas almacenadas en bookings.json.

### Funcionalidades

* Crear reservas

* Listar reservas

* Buscar por ID

* Agregar servicios a una reserva

* Incrementar cantidad si el servicio ya existe

### Estructura de una reserva

* id

* clientName

* clientEmail

* date

* time

* status

* services (array)
---

### Métodos principales

* getBookingById(id)

* createBooking(data)

* addServiceToBooking(bid, sid)
---

# Endpoints REST — Reservas
### GET /api/bookings
Devuelve todas las reservas.

### GET /api/bookings/:bid
Devuelve una reserva por ID.

* 200 si existe

* 404 si no existe

### POST /api/bookings
Crea una reserva nueva.
Campos obligatorios:

* clientName

* clientEmail

* date

* time

* status

### POST /api/bookings/:bid/services/:sid

Agrega un servicio a una reserva.
Si ya existe, incrementa quantity.

---

# Ejemplo de agregar servicio

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
Configura Express, middlewares y rutas base.

# server.js
Levanta el servidor en el puerto definido en .env.

---

# Rutas base

```
/api/services
/api/bookings
```
---

# Notas importantes
No se sube node_modules ni .env al repositorio.

IDs de servicios y reservas se generan automáticamente.

Persistencia en archivos JSON (sin base de datos).

Arquitectura por capas implementada correctamente:
router → controller → service → repository → DAO → JSON

---