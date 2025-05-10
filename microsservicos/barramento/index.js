const axios = require('axios')
const express = require('express')
const app = express()
const urlBase = "localhost"
const portLembretes = "4000"
const portObservacoes = "5000"
const portConsulta = "6000"
app.use(express.json())

app.post('/eventos', async (req,res) =>{
    //1. pegar o evento
    const evento = req.body
    console.log(evento)

    try{
        await axios.post(`http://${urlBase}:${portLembretes}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }
    try{
        await axios.post(`http://${urlBase}:${portObservacoes}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }
    try{
        await axios.post(`http://${urlBase}:${portConsulta}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }

    res.end()
})

const port = 10000
app.listen(port, ()=>{
    console.log(`Barramento. Porta ${port}.`)
})