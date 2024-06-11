// models.js
const mongoose = require('mongoose');
const { studentSchema } = require('./schemas');

const studentModel = mongoose.model('student', studentSchema);

module.exports = { studentModel };
