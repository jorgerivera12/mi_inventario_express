const Producto = require('../models/Producto');
const Usuario = require('../models/Usuario');

exports.index = async (req, res) => {
  const [totalProductos, productos] = await Promise.all([
    Producto.countDocuments(),
    Producto.find().lean().sort({ createdAt: -1 }).limit(5)
  ]);

  const valorInventario = await Producto.aggregate([
    { $group: { _id: null, total: { $sum: '$precio' } } }
  ]);

  res.render('index', {
    title: 'Dashboard',
    totalProductos,
    valorInventario: valorInventario[0]?.total || 0,
    productos
  });
};

exports.perfil = async (req, res) => {
  const usuario = await Usuario.findById(req.session.usuarioId).lean();
  res.render('perfil', { title: 'Mi perfil', usuario });
};
