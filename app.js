require('dotenv').config();
const express = require('express');
const { engine } = require('express-handlebars');
const { createServer } = require('http');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const session = require('express-session');
const path = require('path');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error MongoDB:', err));

// Handlebars
app.engine('hbs', engine({
  extname: '.hbs',
  defaultLayout: 'main',
  helpers: {
    eq:         (a, b)      => a === b,
    startsWith: (str, pre)  => typeof str === 'string' && str.startsWith(pre)
  }
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Sesiones
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 1000 * 60 * 60 * 24 }
}));

// Variables globales para vistas
app.use((req, res, next) => {
  res.locals.usuario     = req.session.usuarioNombre || null;
  res.locals.currentPath = req.path;
  next();
});

// Rutas
app.use('/', require('./routes/index'));
app.use('/', require('./routes/auth'));
app.use('/productos', require('./middleware/autenticado'), require('./routes/productos'));

// Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);
  socket.on('disconnect', () => console.log('Cliente desconectado:', socket.id));
});

const PORT = process.env.PORT || 3000;
httpServer.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
