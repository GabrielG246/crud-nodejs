const express= require('express');
const router= express.Router();
const User= require('../models/crud.model')

//MIDDLEWARES
const getUser = async(req, res, next)=>{
    //Definimos una Variable que almacenará el dato obtenido y otra que capturará el id recibido por parámetro.
    let user;
    const {id} = req.params;

    //Verificamos que el id tenga el formato de id brindado por mongoose
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        return res.status(404).json({
            message: "El id del libro no es válido"
        })
    }

    //Intentamos encontrar el usuario específico que buscamos con el id.
    try {
        //Busqueda del usuario.
        user= await User.findById(id)

        //En caso de no encontrar el usuario.
        if(!book){
            return res.status(404).json({message: 'No se encontró este usuario'})
        }
    } catch (error) {
        //En caso de que el servidor no responda
        return res.status(500).json({message: error.message})
    }

    //Asignamos al response el valor que conseguimos
    res.user= user;
    //Avanzamos para que siga con la ejecución del método en donde usaremos el middlewarez
    next()
}

//Obtener todos los Datos
router.get('/', async(req,res)=>{
    try {
        const users= await User.find()
        if (users.length===0){
            return res.status(204).json([])
        }
    } catch (error) {
        return res.status(500).json({message: error.message})
    }
})

//Crear Dato (recurso)
router.post('/', async (req, res)=>{
    //Capturar valores de la petición con req.body
    const {fName, lName, nName, pass}= req?.body

    //Validar los Datos
    if(!fName || !lName || !nName || !pass){
        return res.status(400).json({
            message: 'Error, uno de los campos no es válido.'
        })
    }

    //Crear una Instancia del Modelo Book y asignarle los valores recibidos de la petición
    const user= new User({fName, lName, nName, pass});

    try {
        const newUser = await user.save()

        return res.status(201).json(newUser)
    } catch (error) {
        return res.status(400).json({message: error.message})
    }
})