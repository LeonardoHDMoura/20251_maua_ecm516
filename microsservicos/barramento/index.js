const axios = require('axios')
const express = require('express')
const app = express()
const urlBase = "localhost"
const portLembretes = "4000"
const portObservacoes = "5000"
app.use(express.json())

app.post('/eventos', async (req,res) =>{
    //1. pegar o evento
    evento = req.body
    //2. enviar o evento para o mss de lembretes
    
    try{
        await axios.post(`http://${urlBase}:${portLembretes}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }
    //3. enviar o evento para o mss de observacoes
    try{
        await axios.post(`http://${urlBase}:${portObservacoes}/eventos`, evento)
    }
    catch(e){
        console.log(e)
    }
    //4. "responder"
    res.end()
})

const port = 10000
app.listen(port, ()=>{
    console.log(`Barramento. Porta ${port}.`)
})