// Se requiere de express, mongoose, y dotenv 

require('dotenv').config() // Importamos dotenv
const express = require('express')
const server = express()
const mongoose = require('mongoose') // Importamos mongoose para la conexión a la base de datos
const KoderController = require('./koder.controller')
const { DB_HOST, DB_USER, DB_PASS, DB_NAME } = process.env
const uri = `mongodb+srv://${DB_USER}:${DB_PASS}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority&appName=Kodemia`

mongoose.connect(uri)

server.use(express.json())

server.get('/', (request, response) => {
   response.json({status: true})
})
server.get('/koders', async (request, response) => {
   const koders = await KoderController.index()
   response.json({ koders: koders })
})
server.post('/koders', async (request, response) => {
   const koder = await KoderController.store(request)
   if (koder.errors) {
      response.json({ errors: koder.errors })
   }
   else {
      response.json({ koders: koder })
   }
})

server.listen('8080', () => {
   console.log(`Server listen on http://localhost:8080`);
})
