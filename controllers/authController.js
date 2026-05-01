const { validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

exports.formRegistro = (req, res) => {
  res.render('auth/registro', { title: 'Registro' });
};

exports.registro = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('auth/registro', {
      title: 'Registro',
      errores: errores.array(),
      body: req.body
    });
  }

  const { nombre, email, password } = req.body;

  const existe = await Usuario.findOne({ email });
  if (existe) {
    return res.render('auth/registro', {
      title: 'Registro',
      errores: [{ msg: 'El email ya está registrado' }],
      body: req.body
    });
  }

  await Usuario.create({ nombre, email, password });
  res.redirect('/login');
};

exports.formLogin = (req, res) => {
  res.render('auth/login', { title: 'Iniciar sesión' });
};

exports.login = async (req, res) => {
  const errores = validationResult(req);
  if (!errores.isEmpty()) {
    return res.render('auth/login', {
      title: 'Iniciar sesión',
      errores: errores.array(),
      body: req.body
    });
  }

  const { email, password } = req.body;

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    return res.render('auth/login', {
      title: 'Iniciar sesión',
      errores: [{ msg: 'Credenciales incorrectas' }],
      body: req.body
    });
  }

  const valido = await usuario.compararPassword(password);
  if (!valido) {
    return res.render('auth/login', {
      title: 'Iniciar sesión',
      errores: [{ msg: 'Credenciales incorrectas' }],
      body: req.body
    });
  }

  req.session.usuarioId = usuario._id;
  req.session.usuarioNombre = usuario.nombre;
  res.redirect('/productos');
};

exports.logout = (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
};
