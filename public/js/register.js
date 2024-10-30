document.getElementById('register-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Previne o comportamento padrão do formulário

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const cpf = document.getElementById('cpf').value;
    const birthDate = document.getElementById('birthDate').value;
    const password = document.getElementById('password').value;

    fetch('/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, cpf, birthDate, password }),
    })
    .then(response => {
        if (response.ok) {
            return response.json(); // Espera a resposta como JSON
        } else {
            throw new Error('Falha ao registrar. Verifique os dados e tente novamente.');
        }
    })
    .then(data => {
        // Se o registro for bem-sucedido, redireciona para a página de login ou dashboard
        window.location.href = './login.html'; // Redireciona para a página de login
    })
    .catch(error => {
        // Exibe a mensagem de erro
        document.getElementById('error-msg').innerText = error.message;
    });
});
