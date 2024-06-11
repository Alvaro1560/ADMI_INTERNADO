const express = require("express");
const uri = 'mongodb+srv://ricoybarato2024:alvaro1560@tiendabd.uvlqd42.mongodb.net/?retryWrites=true&w=majority&appName=tiendaBD'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8081

const {internadoModel} = require("./models");

const {studentModel} = require("./model-alumno/models");

app.get('/', (req, res) => {
    res.send('Bienvenido al api de internado api');
});

app.get('/internados', async (req, res)=> {
    const internados = await internadoModel.find({});
    res.json(internados);
});

app.get('/internado/:code', async (req, res)=> {
    const internado = await internadoModel.find({code:req.params.code});
    res.json(internado);
});

app.post('/agregar-alumno', async (req, res)=> {
    console.log(req.body)
    try{

        const id_studiante = req.body.id_studiante;
        const userEstudiante = await studentModel.findById(id_studiante);
        if (!userEstudiante) {
            return res.status(200).json("User not exists");
        }


        const id_admin = req.body.id_admin;
        const userAdmin = await studentModel.findById(id_admin);
        if (!userAdmin) {
            return res.status(200).json("User created not exists");
        }

        if (userAdmin.role !== 1) {
            return res.status(200).json("User created not is admin");
        }

        const numero_cuarto = req.body.numero_cuarto;
        const precio = req.body.precio;
        const internado = new internadoModel({ id_studiante, id_admin, numero_cuarto, precio});
        const data = await internado.save();
        return res.status(200).json(data);
    }catch(error){
        console.log('Error: ', error);
        return res.status(500).json({mesage: 'Error interno: ' + error});
    }
});


app.delete('/delete/:id', async (req, res) => {
    try {
        const internadoId = req.params.id;

        const deletedinternado = await internadoModel.findByIdAndDelete(internadoId);
        if (!deletedinternado) {
            return res.status(404).json({ message: 'internado not found' });
        }
        return res.status(200).json({ message: 'internado deleted successfully' });
    } catch (error) {
        console.log('Error: ', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(port, () => {
    console.log("Servidor escuchando en http://localhost:" + port);
});