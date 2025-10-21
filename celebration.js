// Configurar volume do áudio
document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('celebrationAudio');
    if (audio) {
        audio.volume = 0.8; // Volume alto (80%)

        // Tentar tocar o áudio (alguns navegadores bloqueiam autoplay)
        audio.play().catch(error => {
            console.log('Autoplay bloqueado. Clique na página para tocar o áudio.');
            // Tocar quando o usuário interagir com a página
            document.body.addEventListener('click', () => {
                audio.play();
            }, { once: true });
        });
    }

    // Criar confetes
    criarConfetes();

    // Carregar comentários salvos
    carregarComentarios();
});

// Criar efeito de confetes
function criarConfetes() {
    const container = document.getElementById('confettiContainer');
    const cores = ['#ff6b6b', '#51cf66', '#ffd93d', '#667eea', '#f093fb', '#4ecdc4'];

    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confete = document.createElement('div');
            confete.className = 'confetti';
            confete.style.left = Math.random() * 100 + '%';
            confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
            confete.style.animationDelay = Math.random() * 3 + 's';
            confete.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(confete);

            // Remover confete após animação
            setTimeout(() => {
                confete.remove();
            }, 5000);
        }, i * 100);
    }

    // Continuar criando confetes
    setInterval(() => {
        const confete = document.createElement('div');
        confete.className = 'confetti';
        confete.style.left = Math.random() * 100 + '%';
        confete.style.backgroundColor = cores[Math.floor(Math.random() * cores.length)];
        confete.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(confete);

        setTimeout(() => {
            confete.remove();
        }, 5000);
    }, 300);
}

// Sistema de comentários
function carregarComentarios() {
    const comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
    const lista = document.getElementById('commentsList');

    lista.innerHTML = '';
    comentarios.forEach(comentario => {
        adicionarComentarioNaLista(comentario.texto, comentario.data);
    });
}

function salvarComentario(texto) {
    const comentarios = JSON.parse(localStorage.getItem('comentarios') || '[]');
    const novoComentario = {
        texto: texto,
        data: new Date().toLocaleString('pt-BR')
    };
    comentarios.push(novoComentario);
    localStorage.setItem('comentarios', JSON.stringify(comentarios));
}

function adicionarComentarioNaLista(texto, data) {
    const lista = document.getElementById('commentsList');
    const comentarioDiv = document.createElement('div');
    comentarioDiv.className = 'comment';
    comentarioDiv.innerHTML = `
        <p>${texto}</p>
        <div class="comment-time">${data}</div>
    `;
    lista.insertBefore(comentarioDiv, lista.firstChild);
}

// Botão adicionar comentário
document.getElementById('btnAddComment').addEventListener('click', () => {
    const commentBox = document.getElementById('commentBox');
    const texto = commentBox.value.trim();

    if (texto) {
        const data = new Date().toLocaleString('pt-BR');
        salvarComentario(texto);
        adicionarComentarioNaLista(texto, data);
        commentBox.value = '';

        // Feedback visual
        commentBox.style.borderColor = '#51cf66';
        setTimeout(() => {
            commentBox.style.borderColor = '#ddd';
        }, 1000);
    } else {
        commentBox.style.borderColor = '#ff6b6b';
        setTimeout(() => {
            commentBox.style.borderColor = '#ddd';
        }, 1000);
    }
});

// Botão compartilhar
document.getElementById('btnShare').addEventListener('click', () => {
    const texto = 'A MOTO DO MATHEUS FINALMENTE SAIU DA OFICINA! 🎉🏍️';

    if (navigator.share) {
        navigator.share({
            title: 'Ela voltou!',
            text: texto,
            url: window.location.href
        }).catch(err => console.log('Erro ao compartilhar:', err));
    } else {
        // Fallback: copiar para clipboard
        navigator.clipboard.writeText(texto + ' ' + window.location.href).then(() => {
            alert('Link copiado para a área de transferência!');
        }).catch(err => {
            console.log('Erro ao copiar:', err);
        });
    }
});

// Permitir enviar comentário com Enter (Ctrl+Enter)
document.getElementById('commentBox').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        document.getElementById('btnAddComment').click();
    }
});
