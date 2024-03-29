const playBoard = document.querySelector(".play-board");
const scoreElement = document.querySelector(".score");  
const highScoreElement = document.querySelector(".high-score");
const controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let snakeBody = [];
let setIntervalId;
let score = 0;

//Get High Score from local storage

let highScore = localStorage.getItem(".high-score") || 0;
highScoreElement.innerHTML = `High Score: ${highScore}`;



const updateFoodPositoon = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert("Game over! Press Ok to replay");
    location.reload()
}

const changeDirection = e => {
    if(e.key === "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }else if(e.key === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }else if(e.key === "ArrowLeft" && velocityX != 1){
        velocityX = -1
        velocityY = 0;
    }else if(e.key === "ArrowRight" && velocityX != 1){
        velocityX = 1
        velocityY = 0;
    }
}


controls.forEach(button => button.addEventListener("click", () => changeDirection({
    key: button.dataset.key
}) ))

const initGame = () => {
    if(gameOver) return handleGameOver();
    let html = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`;

    if(snakeX === foodX && snakeY === foodY){
        updateFoodPositoon();
        snakeBody.push([foodY, foodX]);
        score++;
        highScore = score >= highScore ? score : highScore;

        localStorage.setItem("high-score", highScore);
        highScoreElement.innerHTML = `High Score: ${highScore}`; 
    }

    snakeX += velocityX;
    snakeY += velocityY;


    for (let index = snakeBody.length - 1; index > 0; index--) {
        snakeBody[index] = snakeBody[index - 1]
    }


    snakeBody[0] = [snakeX, snakeY];


    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        return gameOver = true;
    }


    for (let index = 0; index < snakeBody.length; index++) {
        html += `<div class="head" style="grid-area: ${snakeBody[index][1]} / ${snakeBody[index][0]}"></div>`

        if(index !==0 && snakeBody[0][1] === snakeBody[index][1] && snakeBody[0][0] === snakeBody[index][0]){
            gameOver = true
        }
        
    }

    playBoard.innerHTML = html
}

updateFoodPositoon();
setIntervalId = setInterval(initGame, 100);
document.addEventListener("keyup", changeDirection)
