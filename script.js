// ============================================================
// ⚙️ CONFIGURAÇÕES
// ============================================================
const CONFIG = {
    // Nome dela
    nomeDela: "Alice",

    // Mensagem final
    mensagemFinal: `
        Você passou por TUDO isso... e ainda sobreviveu? 😂<br><br>
        Tá bom, admito: você me conhece sim. Pelo menos um pouco.<br><br>
        Alice, você é minha Barbie e eu sou seu Tobey Maguire —<br>
        o único Ken que balança de teia de um prédio <strong>só pra chegar mais rápido em você.</strong> 🕷️💗<br><br>
        Agora aceita sua surpresa com dignidade. 👇
    `,

    // Quantos taps no desafio final
    tapsNecessarios: 15,

    // Meta de corações no mini-game
    metaCoracoes: 10,

    // 🎬 Surpresa final: Tobey Maguire dancing meme
    videoUrl: "https://www.youtube.com/watch?v=1Bix44C1EzY",

    // 😈 Punições que aparecem a cada erro que ela cometer no quiz
    punicoes: [
        "Punição #1: Você acaba de ganhar uma dívida. Amanhã tem que me dar um beijaço logo que me ver. 👀",
        "Punição #2: Dívida acumulada: 15 minutos de massagem e cafuné obrigatório em mim. 💆‍♂️",
        "Punição #3: Punição grave: Vai ter que usar aquela roupa que eu adoro amanhã... 🔥",
        "Punição #4: A conta tá ficando cara. O que eu vou fazer com você amanhã não tá escrito... 😈"
    ]
};

// ============================================================
// QUIZ — A resposta correta é SEMPRE a primeira!
// ============================================================
const QUIZ_PERGUNTAS = [
    {
        pergunta: "🕷️ Qual ator é o Homem-Aranha favorito do seu Ken?",
        respostas: ["Tobey Maguire", "Andrew Garfield", "Tom Holland", "Nicolas Cage"],
        emoji_certo: "🎉 ISSO! O Tobey é o original e ponto final!",
        emoji_errado: "❌ QUE VEXAME! Como erra isso? kkkkk"
    },
    {
        pergunta: "🍕 Qual é a comida favorita do seu Ken?",
        respostas: ["Pizza", "Hambúrguer", "Sushi", "Lasanha"],
        emoji_certo: "🍕 ACERTOU! A pizza une casais kkk",
        emoji_errado: "❌ Hmm... você precisa prestar mais atenção 👀"
    },
    {
        pergunta: "🎬 Qual é o filme favorito do seu Ken?",
        respostas: ["Homem-Aranha do Tobey Maguire", "Homem-Aranha 2", "No Way Home", "Homem-Aranha Sem Volta"],
        emoji_certo: "🤩 Claro! O clássico dos clássicos. Bom gosto!",
        emoji_errado: "❌ COMO? São todos bons mas o primeiro é LENDÁRIO kkk"
    },
    {
        pergunta: "💗 O que o seu Ken faz quando está com saudade de você?",
        respostas: ["Dorme logo pra o dia acabar e ficar mais perto de você", "Imagina mil jeitos de tirar a sua roupa 👀", "Joga videogame", "Chora feio no travesseiro"],
        emoji_certo: "🥺 Exatamente isso... dormir é a forma mais rápida de ir até você ❤️",
        emoji_errado: "❌ Errou! Bom... essa pode até ser verdade em alguns dias, mas a certa era outra 😈"
    },
    {
        pergunta: "🎵 Qual tipo de música o seu Ken mais ouve?",
        respostas: ["Pop", "Funk", "Rock", "Sertanejo"],
        emoji_certo: "🎵 Isso! Você conhece meu gosto musical!",
        emoji_errado: "❌ Errou! Estuda mais sobre mim kkk"
    },
];

// ============================================================
// CÓDIGO DO JOGO — não precisa mexer daqui pra baixo!
// ============================================================

// Injeta nome dela
document.querySelectorAll('#barbie-name-intro, #barbie-name-reveal').forEach(el => el.textContent = CONFIG.nomeDela);
document.getElementById('game-goal-text').textContent = CONFIG.metaCoracoes;
document.getElementById('tap-count-needed').textContent = CONFIG.tapsNecessarios;
document.getElementById('tap-needed').textContent = CONFIG.tapsNecessarios;

// Placar global
let placar = { quiz: 0, erros: 0, jogo: 0, taps: 0 };

// =======================
// TELA — SISTEMA
// =======================
function goToScreen(n) {
    document.querySelectorAll('.screen').forEach(s => {
        s.classList.remove('active');
    });
    const next = document.getElementById(`screen-${n}`);
    next.style.animation = 'none';
    next.offsetHeight; // reflow
    next.style.animation = '';
    next.classList.add('active');
}

// =======================
// CANVAS — TEIA DE ARANHA
// =======================
const canvas = document.getElementById('web-canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    drawWebs();
}
function drawWebs() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = 'rgba(204,0,0,0.6)';
    ctx.lineWidth = 0.8;
    // Teia radial no canto superior esquerdo
    const cx = 0, cy = 0;
    for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * 400, cy + Math.sin(angle) * 400);
        ctx.stroke();
    }
    for (let r = 60; r <= 400; r += 60) {
        ctx.beginPath();
        for (let i = 0; i <= 8; i++) {
            const angle = (i / 8) * Math.PI / 2;
            const x = cx + Math.cos(angle) * r;
            const y = cy + Math.sin(angle) * r;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    // Teia radial no canto inferior direito
    const cx2 = canvas.width, cy2 = canvas.height;
    for (let i = 0; i < 8; i++) {
        const angle = Math.PI + (i / 8) * Math.PI / 2;
        ctx.beginPath();
        ctx.moveTo(cx2, cy2);
        ctx.lineTo(cx2 + Math.cos(angle) * 400, cy2 + Math.sin(angle) * 400);
        ctx.stroke();
    }
    for (let r = 60; r <= 400; r += 60) {
        ctx.beginPath();
        for (let i = 0; i <= 8; i++) {
            const angle = Math.PI + (i / 8) * Math.PI / 2;
            const x = cx2 + Math.cos(angle) * r;
            const y = cy2 + Math.sin(angle) * r;
            i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// =======================
// INTRO MINIMALISTA
// =======================
// Limpando referencias de names que removi do intro minimalista
document.querySelectorAll('#barbie-name-reveal').forEach(el => el.textContent = CONFIG.nomeDela);
document.getElementById('btn-start').addEventListener('click', () => {
    goToScreen(1);
    startQuiz();
});

// =======================
// QUIZ
// =======================
let quizIndex = 0;
let quizEmbalhadas = [];

function shuffleArray(arr) {
    return [...arr].sort(() => Math.random() - 0.5);
}

function startQuiz() {
    quizIndex = 0;
    placar.quiz = 0;
    quizEmbalhadas = QUIZ_PERGUNTAS.map(q => {
        const shuffled = shuffleArray(q.respostas);
        return { ...q, shuffledRespostas: shuffled, correctAnswer: q.respostas[0] };
    });
    document.getElementById('quiz-total').textContent = quizEmbalhadas.length;
    renderQuestion();
}

function renderQuestion() {
    if (quizIndex >= quizEmbalhadas.length) {
        document.getElementById('quiz-feedback').textContent = '';
        document.getElementById('quiz-feedback').className = 'quiz-feedback';
        goToScreen(2);
        return;
    }

    const q = quizEmbalhadas[quizIndex];
    const progress = ((quizIndex) / quizEmbalhadas.length) * 100;
    document.getElementById('quiz-progress-bar').style.width = progress + '%';
    document.getElementById('hearts-display').textContent = placar.quiz;
    document.getElementById('question-text').textContent = `Pergunta ${quizIndex + 1} de ${quizEmbalhadas.length}: ${q.pergunta}`;
    document.getElementById('quiz-feedback').textContent = '';
    document.getElementById('quiz-feedback').className = 'quiz-feedback';

    const optContainer = document.getElementById('quiz-options');
    optContainer.innerHTML = '';
    q.shuffledRespostas.forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'quiz-opt';
        btn.textContent = opt;
        btn.addEventListener('click', () => handleAnswer(btn, opt, q));
        optContainer.appendChild(btn);
    });
}

function handleAnswer(btn, chosen, q) {
    const allBtns = document.querySelectorAll('.quiz-opt');
    allBtns.forEach(b => b.disabled = true);

    const feedback = document.getElementById('quiz-feedback');
    const isCorrect = chosen === q.correctAnswer;

    if (isCorrect) {
        btn.classList.add('correct');
        placar.quiz++;
        feedback.textContent = q.emoji_certo;
        feedback.className = 'quiz-feedback correct';
        shakeCard(true);
    } else {
        btn.classList.add('wrong');
        placar.erros++;
        
        // Highlight correct
        allBtns.forEach(b => { if (b.textContent === q.correctAnswer) b.classList.add('correct'); });
        
        // Calcular nível da punição
        let punicaoTexto = "A conta tá ficando cara. Me aguarde amanhã... 🥵";
        if (placar.erros <= CONFIG.punicoes.length) {
            punicaoTexto = CONFIG.punicoes[placar.erros - 1];
        }
        
        // Mostrar a mensagem de erro da pergunta + a punição picante
        feedback.innerHTML = `❌ Errou!<br><span style="color:var(--barbie-pink);font-size:0.95rem;margin-top:8px;display:block;font-weight:700;">${punicaoTexto}</span>`;
        feedback.className = 'quiz-feedback wrong';
        shakeCard(false);
    }

    document.getElementById('hearts-display').textContent = placar.quiz;
    quizIndex++;
    setTimeout(() => renderQuestion(), 2800); // tempo maior pra ela ler a punição
}

function shakeCard(success) {
    const card = document.getElementById('quiz-card');
    card.style.animation = 'none';
    card.offsetHeight;
    card.style.transition = 'transform 0.1s';
    if (success) {
        card.style.transform = 'scale(1.03)';
        setTimeout(() => { card.style.transform = ''; }, 300);
    } else {
        card.style.transform = 'translateX(-10px)';
        setTimeout(() => { card.style.transform = 'translateX(10px)'; }, 100);
        setTimeout(() => { card.style.transform = ''; }, 200);
    }
}

// =======================
// MINI-GAME
// =======================
let gameScore = 0;
let gameInterval = null;
let timerInterval = null;
let timeLeft = 20;

document.getElementById('btn-start-game').addEventListener('click', startGame);

function startGame() {
    gameScore = 0;
    timeLeft = 20;
    document.getElementById('score-display').textContent = 0;
    document.getElementById('timer-display').textContent = 20;
    document.getElementById('game-instructions').style.display = 'none';
    document.getElementById('game-arena').style.display = 'block';
    document.getElementById('game-result').style.display = 'none';

    // Timer
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-display').textContent = timeLeft;
        if (timeLeft <= 5) document.getElementById('timer-display').style.color = '#e74c3c';
        if (timeLeft <= 0) endGame();
    }, 1000);

    // Spawn tokens
    gameInterval = setInterval(spawnToken, 800);
    spawnToken();
    spawnToken();
}

function spawnToken() {
    const arena = document.getElementById('game-arena');
    if (!arena || arena.style.display === 'none') return;

    const isSpider = Math.random() < 0.25; // 25% chance de aranha (perde ponto)
    const el = document.createElement('div');
    el.classList.add('game-token');
    el.textContent = isSpider ? '🕷️' : (Math.random() < 0.3 ? '💖' : '💗');
    el.dataset.type = isSpider ? 'spider' : 'heart';

    const left = Math.random() * (arena.offsetWidth - 60);
    el.style.left = left + 'px';
    const dur = Math.random() * 1.5 + 1.8;
    el.style.animationDuration = dur + 's';

    arena.appendChild(el);

    el.addEventListener('click', (e) => {
        if (el.dataset.type === 'heart') {
            gameScore++;
            placar.jogo = gameScore;
            document.getElementById('score-display').textContent = gameScore;
            showPopNumber(arena, e.offsetX || left + 30, e.offsetY || 50, '+1', 'pos');
        } else {
            gameScore = Math.max(0, gameScore - 1);
            placar.jogo = gameScore;
            document.getElementById('score-display').textContent = gameScore;
            showPopNumber(arena, e.offsetX || left + 30, e.offsetY || 50, '-1', 'neg');
        }
        el.remove();
    });

    el.addEventListener('animationend', () => el.remove());
}

function showPopNumber(parent, x, y, text, cls) {
    const pop = document.createElement('div');
    pop.classList.add('pop-num', cls);
    pop.textContent = text;
    pop.style.left = `${x}px`;
    pop.style.top = `${y}px`;
    parent.appendChild(pop);
    setTimeout(() => pop.remove(), 800);
}

function endGame() {
    clearInterval(timerInterval);
    clearInterval(gameInterval);
    document.getElementById('game-arena').style.display = 'none';
    document.getElementById('timer-display').style.color = 'white';

    const resultEl = document.getElementById('game-result');
    resultEl.style.display = 'block';
    const metaAtingida = gameScore >= CONFIG.metaCoracoes;

    resultEl.innerHTML = `
        <div style="font-size:2.5rem;margin-bottom:0.5rem">${metaAtingida ? '🎉' : '😅'}</div>
        <p style="font-size:1.1rem;font-weight:700;color:${metaAtingida ? 'var(--success)' : 'var(--barbie-pink)'}">
          ${metaAtingida ? `Incrível! Você pegou ${gameScore} corações!` : `Você pegou ${gameScore}/${CONFIG.metaCoracoes} corações...`}
        </p>
        <p style="color:#aaa;font-size:0.9rem;margin:0.5rem 0">${metaAtingida ? 'Tá passando de fase com chave! 🗝️' : 'Deu pra ver o esforço... pode ir! kkk'}</p>
        <button class="btn-start-game" style="margin-top:1rem" onclick="irParaFase3()">Próxima Fase →</button>
    `;
}

function irParaFase3() {
    goToScreen(3);
    startTapChallenge();
}

// =======================
// TAP CHALLENGE
// =======================
let tapCount = 0;
let tapDone = false;

function startTapChallenge() {
    tapCount = 0;
    tapDone = false;
    document.getElementById('tap-current').textContent = 0;
    document.getElementById('tap-progress-bar').style.width = '0%';
}

document.getElementById('tap-heart').addEventListener('click', handleTap);
document.getElementById('tap-heart').addEventListener('touchstart', (e) => { e.preventDefault(); handleTap(); });

function handleTap() {
    if (tapDone) return;
    tapCount++;
    placar.taps = tapCount;
    document.getElementById('tap-current').textContent = tapCount;
    const pct = Math.min(100, (tapCount / CONFIG.tapsNecessarios) * 100);
    document.getElementById('tap-progress-bar').style.width = pct + '%';

    // Anel de pulso
    const ring = document.getElementById('tap-ring');
    ring.classList.remove('ring-animate');
    ring.offsetHeight;
    ring.classList.add('ring-animate');

    // Animação do coração
    const heart = document.getElementById('tap-heart');
    heart.style.transform = 'scale(1.35) rotate(10deg)';
    setTimeout(() => { heart.style.transform = ''; }, 150);

    if (tapCount >= CONFIG.tapsNecessarios) {
        tapDone = true;
        heart.style.animation = 'none';
        setTimeout(() => {
            goToScreen(4); // Vai para a fase Picante
            initSpicyCards();
        }, 400);
    }
}

// =======================
// TELA 4 — FASE PICANTE
// =======================
function initSpicyCards() {
    const cards = document.querySelectorAll('.card-spicy');
    cards.forEach(card => {
        // Remover listeners antigos se houver
        const novoCard = card.cloneNode(true);
        card.parentNode.replaceChild(novoCard, card);
        
        novoCard.addEventListener('click', () => {
            // Desativar clique nas outras
            document.querySelectorAll('.card-spicy').forEach(c => {
                c.style.opacity = '0.4';
                c.style.pointerEvents = 'none';
            });
            // Destacar a escolhida
            novoCard.style.opacity = '1';
            novoCard.style.transform = 'scale(1.1)';
            novoCard.style.borderColor = 'var(--barbie-pink)';
            novoCard.querySelector('.lock-icon').textContent = '🔓';
            
            // Mostrar recompensa
            document.getElementById('spicy-reward-text').textContent = novoCard.dataset.reward;
            document.getElementById('spicy-reveal').style.display = 'block';
        });
    });
}

document.getElementById('btn-finish').addEventListener('click', () => {
    triggerConfetti();
    goToScreen(5);
    showFinalScreen();
});

// =======================
// TELA 5 — FINAL
// =======================
function showFinalScreen() {
    document.getElementById('reveal-message').innerHTML = CONFIG.mensagemFinal;
    document.getElementById('final-quiz-score').textContent = `${placar.quiz}/${QUIZ_PERGUNTAS.length}`;
    document.getElementById('final-game-score').textContent = placar.jogo;
    document.getElementById('final-tap-score').textContent = placar.taps;

    let count = 5;
    const el = document.getElementById('redirect-count');
    const countdown = setInterval(() => {
        count--;
        el.textContent = count;
        if (count <= 0) {
            clearInterval(countdown);
            openVideoOverlay();
        }
    }, 1000);
}

function openVideoOverlay() {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('surprise-video');
    overlay.classList.add('active');
    video.play().catch(() => {}); // tenta autoplay, ok se bloqueado
}

// Fechar overlay
document.getElementById('video-close').addEventListener('click', () => {
    const overlay = document.getElementById('video-overlay');
    const video = document.getElementById('surprise-video');
    video.pause();
    overlay.classList.remove('active');
});


// =======================
// CONFETTI
// =======================
function triggerConfetti() {
    const colors = ['#cc0000', '#ff69b4', '#ffffff', '#ffd700'];
    const end = Date.now() + 3500;
    (function frame() {
        confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0 }, colors });
        confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1 }, colors });
        if (Date.now() < end) requestAnimationFrame(frame);
    })();
}
