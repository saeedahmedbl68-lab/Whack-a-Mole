const holes    = document.querySelectorAll('.hole');
const scores   = document.getElementById('score');
const Pscores  = document.getElementById('Pscore');
const pop      = document.querySelector('.popup');
const time     = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('ResetBtn');

let score       = 0;
let currentHole = null;
let timeLeft    = 30;
let moleTimer   = null;
let gameTimer   = null;
let gameRunning = false;

/* Build the OK button inside the popup (HTML now has a <p> tag) */
const btn = document.createElement('button');
btn.id = 'okBtn';
btn.textContent = 'OK';
pop.append(btn);

btn.addEventListener('click', removepop);

function removepop() {
    pop.classList.remove('show');
    score    = 0;
    timeLeft = 30;
    scores.textContent = score;
    time.textContent   = timeLeft;
}

function MoleRandom() {
    holes.forEach(h => h.classList.remove('mole'));
    const randomIdx = Math.floor(Math.random() * holes.length);
    currentHole = holes[randomIdx];
    currentHole.classList.add('mole');
}

function CountDown() {
    timeLeft--;
    time.textContent = timeLeft;

    if (timeLeft === 0) {
        clearInterval(moleTimer);
        clearInterval(gameTimer);
        gameRunning = false;
        holes.forEach(h => h.classList.remove('mole'));
        Pscores.textContent = score;
        pop.classList.add('show');
    }
}

/* Works for both click (desktop) and touchend (mobile) */
function scoreupdation(e) {
    e.preventDefault();           // stop ghost click on touch devices
    if (gameRunning && this === currentHole) {
        score++;
        scores.textContent = score;
        currentHole.classList.remove('mole');
    }
}

holes.forEach(hole => {
    hole.addEventListener('click',    scoreupdation);
    hole.addEventListener('touchend', scoreupdation, { passive: false });
});

startBtn.addEventListener('click', GameStart);
resetBtn.addEventListener('click', ResetGame);

function GameStart() {
    score    = 0;
    timeLeft = 30;
    scores.textContent = score;
    time.textContent   = timeLeft;
    clearInterval(moleTimer);
    clearInterval(gameTimer);
    gameRunning = true;
    moleTimer   = setInterval(MoleRandom, 1200);
    gameTimer   = setInterval(CountDown,  1000);
}

function ResetGame() {
    score    = 0;
    timeLeft = 30;
    scores.textContent = score;
    time.textContent   = timeLeft;
    clearInterval(moleTimer);
    clearInterval(gameTimer);
    gameRunning = false;
    pop.classList.remove('show');
    holes.forEach(h => h.classList.remove('mole'));
}
