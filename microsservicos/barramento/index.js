const axios = require('axios')
const express = require('express')
const app = express()
const portLembretes = "4000"
const portObservacoes = "5000"
const portConsulta = "6000"
const portClassificacao = "7000"
app.use(express.json())

const baseEventos = []
app.post('/eventos', async (req,res) =>{
    //1. pegar o evento
    const evento = req.body
    console.log(evento)
    baseEventos.push(evento)
    try{
        //await axios.post(`http://${urlBase}:${portLembretes}/eventos`, evento)
        await axios.post(`http://ecm516-lembretes-clusterip-service:${portLembretes}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }
    try{
        await axios.post(`http://ecm516-observacoes-clusterip-service:${portObservacoes}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }
    try{
        await axios.post(`http://ecm516-consulta-clusterip-service:${portConsulta}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }
    try{
        await axios.post(`http://ecm516-classificacao-clusterip-service:${portClassificacao}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }

    res.end()
})

app.get('/eventos', (req,res) =>{
    res.json(baseEventos)
})

const port = 10000
app.listen(port, ()=>{
    console.log(`Barramento. Porta ${port}.`)
})