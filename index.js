const axios = require("axios");
const express= require('express');
const cors = require('cors');
let circuitos;
let temporadas;

const app = express()
const connection = require("./database/connection");

const User = require("./model/User");
const Circuit = require("./model/Circuit");
const salvarTemporada = require("./controller/seasonController");
const salvarCorridas = require("./controller/racerController");
const salvarCircuitos = require("./controller/circuitController");

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.post('/usr/add', (req,res) => {
    const user = User.create(
        {
            usuarioLogin: req.body.login,
            usuarioNome: req.body.nome,
            usuarioEmail: req.body.email,
            usuarioSenha: req.body.password,
            usuarioCelular: req.body.celular
        }
    )
    .then(() => {
        res.send('Sucesso')
    })
    .catch( () => {
        res.send('Ocorreu um erro')
    })
})

app.put('/usr/:id', (req,res) => {
    const usr = User.update(
        {
            usuarioLogin: req.body.login,
            usuarioNome: req.body.nome,
            usuarioEmail: req.body.email,
            usuarioSenha: req.body.password,
            usuarioCelular: req.body.celular
        },
        {
            where: {
                circuitoId: req.body.circuitoId
            }
        }
    )
    .then( () =>{
        res.send('Sucesso')
    })
    .catch(() =>{
        res.send('Ocorreu um erro')
    })
})

app.delete('/usr/delete/:id', (req, res) => {
    const usr = User.destroy({
        where:{ id: req.params.id }
    })
    .then(() =>{
        res.send('Sucesso')
    })
    .catch(() =>{
        res.send('Ocorreu um erro')
    })
})

//Parte Da API
app.post('/circuitos/add', (req,res) => {
    const circuito = Circuit.create(
        {
            circuitoRef: req.body.referencia,
            circuitoNome: req.body.nome,
            circuitoLocalizacao: req.body.localizacao,
            circuitoPais: req.body.pais,
            circuitoUrl: req.body.url,
            circuitoFoto: req.body.foto
        }
    )
    .then(() => {
        res.send('Sucesso')
    })
    .catch( () => {
        res.send('Ocorreu um erro')
    })
})

app.delete('/circuitos/delete/:id', (req, res) => {
    const circuito = Circuit.destroy({
        where:{ id: req.params.id }
    })
    .then(() =>{
        res.send('Sucesso')
    })
    .catch(() =>{
        res.send('Ocorreu um erro')
    })
})

app.get('/circuitos/get', (req,res)=>{
    Circuit.findAll()
    .then((registros)=>{
        res.json(registros)
    })
    .catch((erro)=>{
        res.send('ocorreu um erro')
    })
})

app.put('/circuitos/update', (req,res) => {
    const circuitoFoto = Circuit.update(
        {
            circuitoFoto: req.body.circuitoFoto
        },
        {
            where: {
                circuitoId: req.body.circuitoId
            }
        }
    )
    .then( () =>{
        res.send('Sucesso')
    })
    .catch(() =>{
        res.send('Ocorreu um erro')
    })
})

//porta que está sendo monitorada pela aplicação
app.listen(3001, () => {
    console.log("servidor iniciado na porta 3001")
})

/* salvarTemporada();
salvarCircuitos();
salvarCorridas();
 */