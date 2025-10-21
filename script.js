// Data em que a moto foi para a oficina
// IMPORTANTE: Altere esta data para a data real!
const dataOficina = new Date('2025-01-15'); // Formato: AAAA-MM-DD

// Função para calcular tempo na oficina
function calcularTempo() {
    const hoje = new Date();
    const diferenca = hoje - dataOficina;

    if (diferenca < 0) {
        return { dias: 0, horas: 0, minutos: 0, segundos: 0 };
    }

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferenca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferenca % (1000 * 60)) / 1000);

    return { dias, horas, minutos, segundos };
}

// Atualizar contador
function atualizarContador() {
    const contador = document.getElementById('dayCounter');
    const tempo = calcularTempo();

    contador.innerHTML = `
        <div class="time-unit">
            <span class="time-value">${tempo.dias}</span>
            <span class="time-label">dias</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
            <span class="time-value">${String(tempo.horas).padStart(2, '0')}</span>
            <span class="time-label">horas</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
            <span class="time-value">${String(tempo.minutos).padStart(2, '0')}</span>
            <span class="time-label">minutos</span>
        </div>
        <div class="time-separator">:</div>
        <div class="time-unit">
            <span class="time-value">${String(tempo.segundos).padStart(2, '0')}</span>
            <span class="time-label">segundos</span>
        </div>
    `;
}

// Inicializar contador
document.addEventListener('DOMContentLoaded', () => {
    atualizarContador();

    // Atualizar contador a cada segundo
    setInterval(atualizarContador, 1000);
});

// Botão "Não"
document.getElementById('btnNo').addEventListener('click', () => {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = 'Nenhuma novidade. 😔';
    messageDiv.style.opacity = '0';

    setTimeout(() => {
        messageDiv.style.transition = 'opacity 0.5s';
        messageDiv.style.opacity = '1';
    }, 10);

    // Limpar mensagem após 3 segundos
    setTimeout(() => {
        messageDiv.style.opacity = '0';
    }, 3000);
});

// Botão "Sim!!!"
document.getElementById('btnYes').addEventListener('click', () => {
    // Redirecionar para página de celebração
    window.location.href = 'celebracao.html';
});

// Adicionar efeito de transição suave
document.querySelectorAll('.btn').forEach(btn => {
    btn.style.transition = 'all 0.3s ease';
});
