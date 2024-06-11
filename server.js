import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const PORT = 3000;

import { agregar,
    getData, 
    eliminarPorId,
    actualizarDeporte
} from './services/deportes.js';

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});


app.post('/agregar', async (req, res) => {
    const { nombre, precio } = req.body;

    try {
        const deportesActualizados = await agregar(nombre, precio);
        res.json({ message: "Deporte agregado con éxito", deportes: deportesActualizados });
    } catch (error) {
        res
            .status(error?.status || 500)
            .send({ status: "FAILED", data: { error: error?.message || error } });
    }
});



app.get('/deportes', async (req, res) => {
    try {
        const response = await getData();
        res.json({ status: 'OK', data: response }); 
    } catch (error) {
        console.error("Error al obtener los deportes:", error);
        res.status(500).json({ status: "FAILED", data: { error: error.message } });
    }
});



app.delete('/eliminar/:id', async (req, res) => { 
    try {
        const deporteiD = req.params.id; 
        await eliminarPorId(deporteiD); 
        res.status(200).send({ status: 'OK', message: 'Deporte eliminado exitosamente' });
    } catch (error) {
        console.error("Error al eliminar el deporte:", error);
        res.status(500).json({ status: "FAILED", data: { error: error.message } });
    }
});


app.put('/editar/:id', async (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;

    try {
        const deportesActualizados = await actualizarDeporte(id, updatedData);
        res.status(200).json({ status: 'OK', message: 'Deporte actualizado exitosamente', deportes: deportesActualizados });
    } catch (error) {
        console.error("Error al actualizar el deporte:", error);
        res.status(500).json({ status: "FAILED", message: 'Error al actualizar el deporte', error: error.message });
    }
});

app.listen(PORT, () => console.log('Servidor encendido'));
