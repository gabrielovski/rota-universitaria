// services/busService.js

// Função para simular o rastreamento de localização de um ônibus
function trackBusLocation(callback) {
    // Simulação de coordenadas de localização, que poderiam ser reais
    setInterval(() => {
        const location = {
            latitude: (Math.random() * (90 - (-90)) + (-90)).toFixed(6),
            longitude: (Math.random() * (180 - (-180)) + (-180)).toFixed(6)
        };
        callback(location);
    }, 5000); // Atualiza a cada 5 segundos
}

module.exports = { trackBusLocation };
