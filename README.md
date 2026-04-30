# Mi Inventario Express

Sistema de inventario desarrollado con Node.js, Express y MongoDB siguiendo el patrón MVC.

## Estructura del proyecto

```
mi_inventario_express/
├── app.js               ← servidor Express + Socket.io
├── models/              ← M (Model) → esquemas de Mongoose
├── routes/              ← rutas HTTP
│   └── index.js
├── controllers/         ← lógica del CRUD y login
│   └── indexController.js
├── views/               ← V (View) → plantillas Handlebars (.hbs)
│   ├── layouts/
│   │   └── main.hbs
│   ├── partials/
│   └── index.hbs
├── public/              ← archivos estáticos (CSS, JS del cliente)
│   ├── css/
│   │   └── style.css
│   └── js/
│       └── main.js
└── uploads/             ← imágenes subidas por el usuario
```

## Tecnologías

- **Node.js** + **Express** — servidor HTTP
- **MongoDB** + **Mongoose** — base de datos
- **Handlebars** — motor de vistas
- **Socket.io** — comunicación en tiempo real
- **bcrypt** — hash de contraseñas
- **express-session** — manejo de sesiones
- **multer** — subida de archivos
- **express-validator** — validación de formularios
- **dotenv** — variables de entorno

## Instalación

```bash
npm install
```

## Uso

```bash
# Desarrollo (con recarga automática)
npm run dev

# Producción
npm start
```

El servidor corre en `http://localhost:3000`
