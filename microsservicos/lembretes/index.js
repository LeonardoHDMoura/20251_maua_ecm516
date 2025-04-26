const axios = require('axios')
const express = require('express')
const app = express()
const urlBase = "localhost"
const portBarramento = "10000"
app.use(express.json())
/*
{
    1: {
        id: 1
        texto: 'fazer café'
    },
    2: {
        id: 2
        texto: 'ir a feira'
    }
}
*/
const baseLembretes = {}
let id = 1
//GET /lembretes () => {}
//localhost:4000/lembretes
app.get('/lembretes', (req, res) => {
    res.json(baseLembretes)
})

//localhost:4000/lembretes
//POST /lembretes () => {}
app.post('/lembretes', (req,res) => {
    const { texto } = req.body
    const lembrete = { id, texto }
    baseLembretes[id] = lembrete
    id++
    axios.post(`http://${urlBase}:${portBarramento}/eventos`, {
        tipo: "LembreteCriado",
        dados: lembrete
    })
    .then((resAxios)=>{
        console.log(resAxios.data)
    })
    .catch((e) => {
        console.log(e)
    })
    .finally(()=>{
        res.status(201).json(lembrete)
    })
    
})

//POST /eventos
app.post('/eventos', (req, res) => {
    console.log(req.body)
    res.end()
})

const port = 4000
app.listen(port, () => {
    console.log(`Lembretes. Porta ${port}.`)
})