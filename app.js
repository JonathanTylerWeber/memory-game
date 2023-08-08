const cards = document.querySelectorAll('.card');
const board = document.querySelector('.board')
const button = document.getElementById('startBtn');
const startPage = document.querySelector('.start')
const endPage = document.querySelector('.end')
const refreshButton = document.querySelector('#retry');

let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let count = document.querySelector('#count')
let total = document.querySelector('#total')
let hiScore = document.querySelector('#hi-score')

function getHiScore() {
    let storedHiScore = localStorage.getItem('hiScore');
    if (storedHiScore) {
      hiScore.innerHTML = storedHiScore;
    } else {
      hiScore.innerHTML = '100';
    }
}

getHiScore();

refreshButton.addEventListener('click', function() {
    location.reload(); 
});

button.addEventListener('click', function() {
    startPage.style.visibility = 'hidden';
    board.style.visibility = 'visible';
})

board.addEventListener('click', function(e) {
    if(e.target.tagName === 'IMG'){
        count.innerHTML ++;
    }
})

function isItEnd() {
    let hasUnflippedCard = false;
    cards.forEach(card => {
        if (!card.classList.contains('flip')) {
            hasUnflippedCard = true;
            return;
        }
    });
    if (!hasUnflippedCard) {
        board.style.visibility = 'hidden';
        endPage.style.visibility = 'visible';
        total.innerHTML = count.innerHTML;
        let totalNum = parseInt(total.innerHTML);
        let hiScoreNum = parseInt(hiScore.innerHTML);
        if (totalNum < hiScoreNum) {
            alert('NEW HIGH SCORE!');
            hiScore.innerHTML = total.innerHTML;
            localStorage.setItem('hiScore', total.innerHTML);
        }
    }
}

function flipCard(e){
    if (lockBoard) return;
    if (this === firstCard) return;
    this.classList.add('flip');
    if (!hasFlippedCard){
        hasFlippedCard = true;
        firstCard = this;
        return;
    }
    else {
        secondCard = this;
        checkForMatch();
    }
    isItEnd();
}

function checkForMatch() {
    if(firstCard.dataset.frog === secondCard.dataset.frog){
        disableCards();
    }
    else {
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
        }, 1500)
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

(function shuffle() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    })
})()

cards.forEach(card => card.addEventListener('click', flipCard));