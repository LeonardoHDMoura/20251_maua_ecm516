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
            texto: "Sem açúcar",
            status: 'aguardando'
        },
        {
            id: 1002, idLembrete: 1, texto: "Comprar o pó"
        }
    ],
    2: []
}
*/
const baseObservacoes = {}

const funcoes = {
    ObservacaoClassificada: async (observacao) => {
        final = baseObservacoes[observacao.idLembrete].findIndex((obs) => {
            return obs.id = observacao.id
        })
        final.status = observacao.status
        await axios.post(`http://${urlBase}:${portBarramento}/eventos`, {
        tipo: "ObservacaoAtualizada",
        dados: observacao
    })
    }
}

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
        idLembrete: idLembrete,
        status: 'aguardando'
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
app.post('/eventos', async (req,res) => {
    try{
        const evento = req.body
        console.log(evento)
        await funcoes[evento.tipo](evento.dados)
    }
    catch(e){
        console.log(e)
    }
    finally{
        res.end()
    }
})


const port = 5000
app.listen(port, () => {
    console.log(`Observações. Porta ${port}.`)
})