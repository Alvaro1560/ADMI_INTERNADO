// schemas.js
const mongoose = require('mongoose');

const internadoSchema = new mongoose.Schema({
    id_studiante: {
        type: String,
        required: true
    },
    id_admin: {
        type: String,
        required: true
    },
    numero_cuarto: {
        type: Number,
        required: false
    },
    precio: {
        type: Number,
        required: false
    },
});

module.exports = { internadoSchema };
