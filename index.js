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

venom
    .create({
        session: 'api',
        multidevice: true
    })
    .then((client) => {
        clientInstance = client
        start(client)
    })
    .catch((erro) => {
        console.log(erro);
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