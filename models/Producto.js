const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre:      { type: String, required: true, trim: true },
  descripcion: { type: String, trim: true },
  precio:      { type: Number, required: true, min: 0 },
  stock:       { type: Number, default: 0, min: 0 },
  categoria:   { type: String, trim: true },
  imagen:      { type: String, default: '' }
}, { timestamps: true });

module.exports = mongoose.model('Producto', productoSchema);
