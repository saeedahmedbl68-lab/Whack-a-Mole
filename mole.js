const holes = document.querySelectorAll('.hole');
const scores = document.getElementById('score');
const Pscores= document.getElementById('Pscore');
const pop = document.querySelector('.popup');
const time = document.getElementById('time');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById("ResetBtn");

let score = 0;
let currentHole;
let timeLeft = 30;
let moleTimer = null;
let gameTimer = null;
let gameRunning = false;

let btn = document.createElement('button');
btn.style.width = "70px";
btn.style.marginLeft = "15px";
btn.style.border = "none";
btn.style.borderRadius = "12px"
btn.style.color ="green";
btn.style.fontSize = "x-large"
btn.style.height = "35px";
btn.textContent = "OK";
btn.style.backgroundColor = "white";
pop.append(btn);


btn.addEventListener("click", removepop);

function removepop()
{
    pop.classList.remove('show');
    score = 0;
    timeLeft = 30;
    scores.textContent = score;
    time.textContent = timeLeft;
}

function MoleRandom() {
  for (let i = 0; i < holes.length; i++) 
    {
        holes[i].classList.remove('mole');
    }

    let randomIdx = Math.floor(Math.random() * holes.length);
    currentHole = holes[randomIdx];
    currentHole.classList.add('mole');
}

function CountDown()
{
    timeLeft--;
    time.textContent = timeLeft;

    if (timeLeft === 0) 
    {
      clearInterval(moleTimer);
      clearInterval(gameTimer);
      gameRunning = false;
        for (let i = 0; i < holes.length; i++) 
        {
            holes[i].classList.remove('mole');
        }
    Pscores.textContent = "  " + score;
    pop.classList.add('show');
      
    }
}

for(let i=0; i<holes.length; ++i) 
{
    holes[i].addEventListener('click', scoreupdation);
}
 function scoreupdation()
{
    if (gameRunning && this === currentHole) 
    {
    score++;
    scores.textContent = score;
    currentHole.classList.remove('mole');
    }
}


startBtn.addEventListener('click', GameStart);
resetBtn.addEventListener('click', ResetGame);

function GameStart()
{
    score = 0;
    timeLeft = 30;
    scores.textContent = score;
    time.textContent = timeLeft;
    clearInterval(moleTimer);
    clearInterval(gameTimer);
    gameRunning = true;
    moleTimer = setInterval(MoleRandom, 1300);
    gameTimer = setInterval(CountDown, 1000);
}

function ResetGame()
{
  score = 0;
  timeLeft = 30;
  scores.textContent = score;
  time.textContent = timeLeft;
  clearInterval(moleTimer);
  clearInterval(gameTimer);
  pop.classList.remove('show');
   for (let i = 0; i < holes.length; i++) 
    {
    holes[i].classList.remove('mole');
  }
}
