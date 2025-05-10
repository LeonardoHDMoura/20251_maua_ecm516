const axios = require('axios')
const express = require('express')
const app = express()
const {v4: uuidv4} = require('uuid')
const urlBase = "localhost"
const portBarramento = "10000"
app.use(express.json())
/*
{
    1: [
        {
            id: 1001,
            idLembrete: 1,
            texto: "Sem açúcar"
        },
        {
            id: 1002, idLembrete: 1, texto: "Comprar o pó"
        }
    ],
    2: []
}
*/
const baseObservacoes = {}

//GET /lembretes/1/observacoes
app.get('/lembretes/:idLembrete/observacoes', function(req,res){
    const idLembrete = req.params.idLembrete
    res.json(baseObservacoes[idLembrete] || [])
})

//POST /lembretes/1/observacoes
app.post('/lembretes/:idLembrete/observacoes', async (req,res) => {
    const idObservacao = uuidv4()
    const { texto } = req.body
    const { idLembrete } = req.params
    const observacao = {
        id: idObservacao,
        texto: texto,
        idLembrete: idLembrete
    }
    const observacoes = baseObservacoes[idLembrete] || []
    observacoes.push(observacao)
    baseObservacoes[idLembrete] = observacoes
    await axios.post(`http://${urlBase}:${portBarramento}/eventos`, {
        tipo: "ObservacaoCriada",
        dados: observacao
    })
    res.status(201).json(observacoes)
})

//POST /eventos
app.post('/eventos', (req,res) => {
    const evento = req.body
    console.log(evento)
    res.end()
})


const port = 5000
app.listen(port, () => {
    console.log(`Observações. Porta ${port}.`)
})