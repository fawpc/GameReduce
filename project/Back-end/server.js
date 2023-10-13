const express = require('express');
const path = require('path');
const app = express();

// Define o caminho para a pasta 'public'
const publicPath = path.join(__dirname, '../Front-end');

// Define o diretório 'public' como um diretório estático
app.use(express.static(publicPath));

// Configuração das rotas
app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.get('/focus', (req, res) => {
    res.sendFile(path.join(publicPath, 'focus.html'));
});

app.get('/form', (req, res) => {
    res.sendFile(path.join(publicPath, 'form.html'));
});

app.get('/metas', (req, res) => {
    res.sendFile(path.join(publicPath, 'metas.html'));
});

app.get('/moedas', (req, res) => {
    res.sendFile(path.join(publicPath, 'moedas.html'));
});

app.get('/premios', (req, res) => {
    res.sendFile(path.join(publicPath, 'premios.html'));
});

app.get('/stats', (req, res) => {
    res.sendFile(path.join(publicPath, 'stats.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});