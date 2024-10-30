const express = require('express');
const router = express.Router();

// Rota para registrar um usuário
router.post('/register', (req, res) => {
    // Lógica para registrar o usuário
    const { username, password } = req.body; // Obtenha os dados do corpo da requisição

    // Aqui você pode implementar a lógica de registro (por exemplo, salvar no banco de dados)
    if (username && password) {
        // Suponha que o registro foi bem-sucedido
        return res.status(201).json({ message: 'Usuário registrado com sucesso!', user: { username } });
    }
    return res.status(400).json({ message: 'Dados de registro inválidos.' });
});

// Rota para login do usuário
router.post('/login', (req, res) => {
    // Lógica para autenticar o usuário
    const { username, password } = req.body;

    // Aqui você pode implementar a lógica de autenticação
    if (username === 'test' && password === 'password') { // Apenas um exemplo
        return res.status(200).json({ message: 'Login realizado com sucesso!', user: { username } });
    }
    return res.status(401).json({ message: 'Credenciais inválidas.' });
});

module.exports = router;
