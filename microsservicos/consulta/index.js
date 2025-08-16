const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
const urlBase = 'host.docker.internal'
const portBarramento = '10000'

/*
{
    1: {
        id: 1,
        texto: 'ver um filme',
        observações:[
            {
                id: 1000
                texto: 'comprar pipoca'
                lembreteId: 1
            }
        
        ]
    },
    2: {
        id: 2,
        texto: 'ir a feira'
    }
}
*/
const baseConsolidada = {}

const funcoes = {
    LembreteCriado: async (lembrete) => {
        baseConsolidada[lembrete.id] = lembrete
    },
    ObservacaoCriada: async (observacao) => {
        const observacoes = 
            baseConsolidada[observacao.idLembrete]['observacoes'] || 
            []
        observacoes.push(observacao)
        baseConsolidada[observacao.idLembrete]['observacoes'] = observacoes
    },
    ObservacaoAtualizada: async (observacao) => {
        const observacoes = baseConsolidada[observacao.idLembrete]['observacoes']
        const observacaoAnterior = observacoes.findIndex((obs) => {
           return obs.id = observacao.id
        })
        observacoes[observacaoAnterior] = observacao
    }
}

app.get('/lembretes', (req,res) => {
    res.json(baseConsolidada)
})

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

const port = 6000
app.listen(port, async() => {
    console.log(`Consulta. Porta ${port}.`)
    //Pedindo a base de eventos na inicialização
    const { data } = await axios.get(`http://${urlBase}:${portBarramento}/eventos`)
    data.forEach(async (evento) => {
        try{
            await funcoes[evento.tipo](evento.dados)
        }
        catch(e){}
    });

})