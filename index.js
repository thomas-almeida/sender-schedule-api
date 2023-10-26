const venom = require('venom-bot');
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('public'))
app.use(cors())

let clientInstance

// Função para inicializar o Venom Bot
async function initializeVenom() {
    try {
        const client = await venom.create({
            session: 'api-test',
            multidevice: true
        });
        return client;
    } catch (error) {
        console.error('Erro ao inicializar o Venom Bot:', error);
        throw error;
    }
}

// Inicialize o Venom Bot antes de iniciar o servidor Express
initializeVenom()
    .then((clientInstance) => {
        // O Venom Bot foi inicializado com sucesso, você pode usá-lo agora
        start(clientInstance);

        // Inicie o servidor Express
        app.listen(port, () => {
            console.log('API rodando...');
        });
    })
    .catch((error) => {
        // Manipule erros de inicialização do Venom Bot
        console.error('Erro de inicialização:', error);
    });

function start(client) {
    client.onAnyMessage((message) => {
        if (message.body === 'Oi' && message.isGroupMsg === false) {
            client
                .sendText(message.from, 'Welcome Venom 🕷')
                .then((result) => {
                    console.log('Result: ', result);
                })
                .catch((erro) => {
                    console.error('Error when sending: ', erro);
                });
        }
    });
}

app.post('/send-schedule', (req, res) => {
    const { message } = req.body
    const number = '5511949098312@c.us'

    if (clientInstance) {
        clientInstance
            .sendText(number, message)
            .then((result) => {
                res.json({ success: true, message: 'Mensagem enviada!' })
            })
            .catch((error) => {
                res.status(500).json({ success: false, message: 'Falha ao enviar a mensagem' })
                console.log(error)
            })
    } else {
        res.status(500).json({ success: false, message: 'Venom client não disponivel' })
    }
})

app.get('/cowsay', (req, res) => {
    res.send('Muu 🐮')
})

app.listen(port, () => {
    console.log('API rodando...')
})