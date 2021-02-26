import mongoose from 'mongoose';

const nombreCollection = 'productos';

// -------------------------------------------------------------
//                         SCHEMA
// -------------------------------------------------------------
const productoSchema = mongoose.Schema({
    nombre: String,
    cantidad: Number,
    precio: Number
});

export const productos = mongoose.model(nombreCollection, productoSchema);

