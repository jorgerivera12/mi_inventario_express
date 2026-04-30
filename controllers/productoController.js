const Producto = require('../models/Producto');

exports.listar = async (req, res) => {
  const productos = await Producto.find().lean().sort({ createdAt: -1 });
  res.render('productos/lista', { title: 'Productos', productos });
};

exports.formNuevo = (req, res) => {
  res.render('productos/nuevo', { title: 'Nuevo Producto' });
};

exports.crear = async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;
  const imagen = req.file ? req.file.filename : '';
  await Producto.create({ nombre, descripcion, precio, stock, categoria, imagen });
  res.redirect('/productos');
};

exports.formEditar = async (req, res) => {
  const producto = await Producto.findById(req.params.id).lean();
  if (!producto) return res.redirect('/productos');
  res.render('productos/editar', { title: 'Editar Producto', producto });
};

exports.actualizar = async (req, res) => {
  const { nombre, descripcion, precio, stock, categoria } = req.body;
  const data = { nombre, descripcion, precio, stock, categoria };
  if (req.file) data.imagen = req.file.filename;
  await Producto.findByIdAndUpdate(req.params.id, data);
  res.redirect('/productos');
};

exports.eliminar = async (req, res) => {
  await Producto.findByIdAndDelete(req.params.id);
  res.redirect('/productos');
};
