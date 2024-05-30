const mongoose = require('mongoose') // Importamos mongoose para la conexión a la base de datos
const { Schema, model } = mongoose // Obtenemos las funciones de Schema y model

const KoderSchema = new Schema({
   firstName: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 100
   },
   lastName: {
      type: String,
      required: false,
      maxLength: 100
   },
   email: {
      type: String,
      required: true,
      match: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
   },
   birthdate: {
      type: Date,
      require: true
   },
   generation: {
      type: Number,
      min: 1,
      max: 100
   }
})
const Koder = model("koders", KoderSchema)

class KoderController {
   // Visualizar todos
   async index() {
      const koder = await Koder.find().exec()
      return koder
   }

   // Crear
   async store(request) {
      const { firstName, lastName, email, birthdate, generation } = request.body
      try {
         const koder = await Koder.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            birthdate: new Date(birthdate),
            generation: generation
         })
         return koder
      } catch (error) {
         return error
      }
   }
   // Ver 1 koder
}

module.exports = new KoderController()
