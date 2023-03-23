const Usuario = require('../models/usuario')
const { request, response} = require('express')


// crear
const createUsuario = async (req = request,
    res = response) => {
        try{
            const data = req.body
            const email = data.email
            console.log(data)
            const usuarioDB = await Usuario.findOne({ email })
            if(usuarioDB){
                return res.status(400).json({msg: 'Ya existe usuario'})
            }
            const usuario = new Usuario(data)
            console.log(usuario)
            await usuario.save()
            return res.status(201).json(usuario)
        }catch(e){
            console.log(e)
            return res.status(500).json({e})
        }
    }    

//listar todos
const getUsuarios = async (req = request, 
    res = response) => {
        try{
            const { estado } = req.query
            const usuarioDB = await Usuario.find({estado})//select * from usuario where estado=?
            return res.json(usuarioDB)
        }catch(e){
            return res.status(500).json({
                msg: 'Error general ' + e
            })
        }
}
module.exports = {createUsuario, getUsuarios}