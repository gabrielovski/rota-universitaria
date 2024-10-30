document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const cpf = document.getElementById('cpf').value;
    const password = document.getElementById('password').value;

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cpf, password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Espera a resposta como JSON
        } else {
            throw new Error('Falha no login. Verifique suas credenciais.');
        }
    })
    .then(data => {
        // Se o login for bem-sucedido, redireciona para a página do dashboard
        window.location.href = './dashboard.html'; // Certifique-se de que o caminho está correto
    })
    .catch(error => {
        // Exibe a mensagem de erro
        document.getElementById('error-msg').innerText = error.message;
    });
});
