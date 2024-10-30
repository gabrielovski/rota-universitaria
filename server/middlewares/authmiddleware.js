// middlewares/authMiddleware.js

const rateLimit = require('express-rate-limit');

// Configuração do rate limiter
const rateLimiter = rateLimit({
    windowMs: 1 * 60 * 1000, // Janela de 1 minuto
    max: 100, // Limite de 100 requisições por IP por janela
    message: {
        status: 429,
        error: 'Muitas requisições',
        message: 'Você excedeu o limite de requisições, tente novamente mais tarde.'
    },
    standardHeaders: true, // Retorna informações de rate limit nos headers `RateLimit-*`
    legacyHeaders: false, // Desativa os headers `X-RateLimit-*`
});

module.exports = { rateLimiter };
