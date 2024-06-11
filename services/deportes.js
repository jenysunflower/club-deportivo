import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const agregar = async (nombre, precio) => {
    let deportes = []; 
    try {
        const dataFromFile = await fs.readFile(__dirname + '/../data/deportes.json', 'utf8');
        deportes = JSON.parse(dataFromFile).deportes;
    } catch (error) {
        if (error.code === 'ENOENT') {
            deportes = []; 
        } else {
            throw error; 
        }
    }

    const nuevoDeporte = { id: deportes.length + 1, nombre, precio };
    deportes.push(nuevoDeporte);

    await fs.writeFile(__dirname + '/../data/deportes.json', JSON.stringify({ deportes }), 'utf8');
    return deportes;
};



export const eliminarPorId = async (id) => {
    console.log("ID del deporte a eliminar:", id);
    try {
        const data = await fs.readFile(__dirname + "/../data/deportes.json", "utf8");
        let deportes = JSON.parse(data).deportes || [];
        //console.log(deportes)
        id = parseInt(id); 
        const deporteIndex = deportes.findIndex(deporte => deporte.id === id);

        if (deporteIndex === -1) {
            throw new Error("Deporte no encontrado"); 
        }
        deportes.splice(deporteIndex, 1);
        await fs.writeFile(__dirname + "/../data/deportes.json", JSON.stringify({ deportes }), "utf8");
    } catch (error) {
        console.error("Error al eliminar deporte:", error);
        throw error;
    }
};



export const actualizarDeporte = async (id, updatedData) => {
    console.log('salida de id:', id)
    try {
        const data = await fs.readFile(__dirname + "/../data/deportes.json", "utf8");
        let deportes = JSON.parse(data).deportes || [];
        console.log(deportes)
        id = parseInt(id); 
        const deporteIndex = deportes.findIndex(deporte => deporte.id === id);
        if (deporteIndex === -1) {
            throw new Error("Deporte no encontrado");
        }

        deportes[deporteIndex].precio = updatedData.precio;
        await fs.writeFile(__dirname + "/../data/deportes.json", JSON.stringify({ deportes }), "utf8");
        return deportes;

    } catch (error) {
        console.error("Error al actualizar los deportes:", error);
        throw error;
    }
};


export const getData = async () => {
    const dataFromFile = await fs.readFile(__dirname + '/../data/deportes.json', 'utf8'); 
    return JSON.parse(dataFromFile).deportes; 
};