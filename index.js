const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Defina um endpoint que retorna a mensagem "Olá"
app.get('/ola', (req, res) => {
  res.send('Olá');
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor Express está rodando na porta ${port}`);
});
