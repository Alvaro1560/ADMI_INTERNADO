// schemas.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    role: {
        type: Number,
        required: false
    },
    id_user_created: {
        type: String,
        required: false
    },
});

module.exports = { studentSchema };
