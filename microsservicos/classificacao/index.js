const axios = require('axios')
const express = require('express')
const app = express()
app.use(express.json())
const portBarramento = '10000'
const urlBase = 'localhost'

/*
{
    1: {
        id: 1,
        texto: 'ver um filme',
        observações:[
            {
                id: 1000
                texto: 'comprar pipoca'
                lembreteId: 1,
                status: 'aguardando'
            }
        
        ]
    },
    2: {
        id: 2,
        texto: 'ir a feira'
    }
}
*/

const palavraChave = "importante"

const funcoes = {
    ObservacaoCriada: async (observacao) => {
        if(palavraChave in observacao.texto){
            observacao.status = "importante"
        }
        else{
            observacao.status = "comum"
        }
        await axios.post(`http://${urlBase}:${portBarramento}/eventos`, {
            tipo: 'ObservacaoClassificada',
            dados: observacao
        })
    }
}

app.post('/eventos', async function(req, res){
    try{
        const evento = req.body
        console.log(evento)
        await funcoes[evento.tipo](evento.dados)
    }
    finally{
        res.end()
    }
    
})

const port = 7000
app.listen(
    port,
    () => console.log(`Classificação. Porta ${port}.`)
)