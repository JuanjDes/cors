const express = require('express');
const axios = require('axios');
const cors = require('cors');

// Inicializamos el express app
const app = express();

// Middleware para habilitar CORS
app.use(cors());

// Definimos el puerto
const PORT = 3000;

let characters = [];

const url = 'https://rickandmortyapi.com/api/character';

// Endpoint para obtener todos los personajes
app.get ('/characters', async (req, res) => {

    try {
        const response = await axios.get(url);
        const dataCharacters = response.data.results;

        for (const character of dataCharacters) {
            const {id, name, status, species, gender, origin: {name: originName}, image} = character;
            characters.push({id, name, status, species, gender, originName, image});
        }
        res.json(characters);


    } catch (err) {
        res.status(404).json({error: 'Error al obtener los personajes'});
        return;
    }
});

// Endpoint para obtener un personaje por nombre

app.get('/characters/:name', async (req, res) => {
    const characterName = req.params.name;
        
    try {
        const response = await axios.get(`${url}/?name=${characterName}`);
        const dataCharacters = response.data.results[0];
        
        if (!dataCharacters) {
            res.status(404).json({error: 'Personaje no encontrado'});
            return;
        }
        
        const {id, name, status, species, gender, origin: {name: originName}, image} = dataCharacters;
        res.json({id, name, status, species, gender, originName, image});

    } catch (error){
        res.status(404).json({error: 'Error al obtener los datos del personaje'});
        return;
    }
    
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});