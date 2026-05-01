# Sistema de Gestión de Distritos - Tarea 06

Aplicación web full-stack para la gestión de distritos con operaciones CRUD utilizando procedimientos almacenados (rutinas) en MySQL.

## Arquitectura

### Cliente-Servidor
- **Cliente (Frontend)**: Aplicación web construida con Vite (HTML/JS vanilla)
  - Puerto: 5173 (por defecto)
  - Comunicación con el backend mediante fetch API (REST)

- **Servidor (Backend)**: API REST con Node.js y Express
  - Puerto: 3000
  - Procesa las peticiones HTTP y se comunica con la base de datos

### Patrón MVC (Model-View-Controller)

```
backend/
├── app.js                    # Punto de entrada (Configuración Express)
├── config/
│   └── db.js                # Conexión a base de datos (Model)
├── controllers/
│   └── distritoController.js # Lógica de negocio (Controller)
├── models/
│   └── distritoModel.js     # Acceso a datos y procedimientos (Model)
└── routes/
    └── distritoRoutes.js    # Definición de rutas (Router)

frontend/
├── views/
│   ├── index.html           # Lista de distritos (View)
│   ├── nuevo.html           # Crear distrito (View)
│   └── edit.html           # Editar distrito (View)
└── controllers/
    ├── main.js              # Lógica de vista principal
    ├── nuevo.js             # Lógica de creación
    └── edit.js              # Lógica de edición
```

## Uso de Rutinas (Procedimientos Almacenados)

La aplicación utiliza 6 procedimientos almacenados en MySQL:

| Procedimiento | Descripción | Parámetros |
|---------------|-------------|------------|
| `sp_crear_distrito` | Inserta un nuevo distrito | p_nom_dis, p_cod_postal, p_poblacion |
| `sp_actualizar_distrito` | Actualiza un distrito existente | p_id_dis, p_nom_dis, p_cod_postal, p_poblacion |
| `sp_eliminar_distrito` | Elimina un distrito por ID | p_id_dis |
| `sp_obtener_distrito` | Obtiene un distrito por ID | p_id_dis |
| `sp_listar_distritos` | Lista distritos con paginación y búsqueda | p_search, p_page, p_limit |
| `sp_contar_distritos` | Cuenta total de distritos (para paginación) | p_search |

## Instrucciones de Instalación y Ejecución

### Requisitos Previos
- Node.js (v16 o superior)
- MySQL Server en ejecucion
- phpMyAdmin o cliente MySQL
- Usuario MySQL configurado como esta en `backend/config/db.js`: host `localhost`, user `root`, password vacio, database `ventas_db`

### Paso 1: Configurar Base de Datos

1. Abre **phpMyAdmin** o tu cliente MySQL
2. Importa el archivo `ventas_db.sql` (ubicado en la raíz del proyecto)
3. Esto creará la base de datos `ventas_db` con la tabla `distritos` y las rutinas

Nota para ejecucion local: abre XAMPP/WAMP/Laragon, enciende MySQL, abre phpMyAdmin e importa `ventas_db.sql` desde la raiz del proyecto. Ese archivo elimina y vuelve a crear `ventas_db`, la tabla `distritos` y las rutinas. Si cambias `ventas_db.sql`, debes importarlo otra vez; editar el archivo no actualiza MySQL automaticamente.

### Paso 2: Configurar Backend

```bash
cd backend
npm install
node app.js
```

El servidor se ejecutará en `http://localhost:3000`

Para comprobar que la base y los procedimientos funcionan:

```bash
cd backend
node test-db.js
```

Resultado esperado:

```text
Testing stored procedures...
List results: 10 rows
Total: 29
All tests passed!
```

### Paso 3: Configurar Frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

La aplicación se ejecutará en `http://localhost:5173`

En Windows PowerShell, si aparece un error de politicas de ejecucion con `npm`, usa:

```bash
cd frontend
npm.cmd run dev
```

### Flujo local recomendado

1. Encender MySQL desde XAMPP/WAMP/Laragon.
2. Importar `ventas_db.sql` en phpMyAdmin si es la primera vez o si cambiaste el SQL.
3. Ejecutar el backend:

```bash
cd backend
node app.js
```

4. Ejecutar el frontend en otra terminal:

```bash
cd frontend
npm.cmd run dev
```

5. Abrir `http://localhost:5173/views/index.html`.

## API Endpoints (Rutas)

### Base URL: `http://localhost:3000/api/distritos`

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Lista distritos (parámetros: page, limit, search) |
| POST | `/` | Crea un nuevo distrito |
| GET | `/:id_dis` | Obtiene un distrito por ID |
| PUT | `/:id_dis` | Actualiza un distrito por ID |
| DELETE | `/:id_dis` | Elimina un distrito por ID |

### Ejemplos de uso:

```bash
# Listar distritos (página 1, 10 por página)
GET http://localhost:3000/api/distritos?page=1&limit=10

# Buscar distritos
GET http://localhost:3000/api/distritos?search=Miraflores

# Crear distrito
POST http://localhost:3000/api/distritos
Body: { "nom_dis": "San Borja", "cod_postal": "15036", "poblacion": 10000 }

# Obtener distrito por ID
GET http://localhost:3000/api/distritos/1

# Actualizar distrito
PUT http://localhost:3000/api/distritos/1
Body: { "nom_dis": "San Borja", "cod_postal": "15036", "poblacion": 15000 }

# Eliminar distrito
DELETE http://localhost:3000/api/distritos/1
```

## Tecnologías Utilizadas

### Backend
- **Node.js**: Entorno de ejecución
- **Express**: Framework web
- **MySQL2**: Cliente de MySQL con soporte para promesas
- **CORS**: Middleware para permitir peticiones cross-origin

### Frontend
- **Vite**: Herramienta de construcción rápida
- **Vanilla JavaScript**: Sin frameworks adicionales
- **HTML5/CSS3**: Estructura y estilos

### Base de Datos
- **MySQL**: Sistema de gestión de base de datos
- **Procedimientos Almacenados (Rutinas)**: Encapsulan la lógica de acceso a datos

## Estructura de la Base de Datos

### Tabla: distritos
| Campo | Tipo | Descripción |
|-------|------|-------------|
| id_dis | INT(11) AUTO_INCREMENT | Identificador único (Primary Key) |
| nom_dis | VARCHAR(100) | Nombre del distrito |
| cod_postal | VARCHAR(10) | Código postal |
| poblacion | INT | Población del distrito |

## Autor

Tarea 06 - Aplicación Full Stack
Gestión de Distritos con MVC y Rutinas MySQL
