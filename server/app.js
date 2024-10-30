// Carrega as variáveis do .env no process.env
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const helmet = require('helmet');
const { rateLimiter } = require('./middlewares/authMiddleware'); // Certifique-se de que rateLimiter está exportado em authMiddleware.js
const userRoutes = require('./routes/userRoutes');
const { trackBusLocation } = require('./services/busService'); // Função para rastrear localização do ônibus
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Ajuste conforme necessário para seu ambiente
        methods: ["GET", "POST"]
    }
});

// Acessando as variáveis do .env no app.js
const port = process.env.PORT || 3000;
const dbURI = process.env.DB_URI;
const jwtSecret = process.env.JWT_SECRET;

if (!dbURI || !jwtSecret) {
    console.error('Erro: Verifique se DB_URI e JWT_SECRET estão definidos no arquivo .env');
    process.exit(1);
}

// Middlewares
app.use(express.json());
app.use(rateLimiter);
app.use(helmet());

// Servir arquivos estáticos a partir do diretório 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rota para o arquivo HTML principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Rotas de usuários
app.use('/api/users', userRoutes);

// Conexão com o MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado ao MongoDB'))
    .catch((err) => console.error('Erro ao conectar ao MongoDB', err));

// Socket.io para comunicação em tempo real
io.on('connection', (socket) => {
    console.log('Um usuário se conectou');

    // Enviar atualizações de localização do ônibus para os clientes conectados
    trackBusLocation((location) => {
        socket.emit('busLocationUpdate', location);
    });

    socket.on('disconnect', () => {
        console.log('Um usuário se desconectou');
    });
});

// Iniciar o servidor
server.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
