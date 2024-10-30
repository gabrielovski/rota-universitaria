const socket = io.connect('http://localhost:3000');

// Exibir a localização em tempo real do ônibus
socket.on('busLocationUpdate', (location) => {
    busMarker.setPosition(location);
    if (distanceToSchool < 1000) {
        new Notification("O ônibus está próximo da faculdade!");
    }
});

async function reserveSeat(seatId) {
    const response = await fetch(`/api/reserve-seat/${seatId}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });

    const data = await response.json();
    if (data.success) {
        alert(`Assento ${seatId} reservado!`);
        document.getElementById(`seat-${seatId}`).classList.add('reserved');
    } else {
        alert('Erro ao reservar assento.');
    }
}
