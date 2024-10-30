const gameCanvas = document.getElementById("gameWindow");
const gameContext = gameCanvas.getContext('2d');

const canvasMaxWidth = 1280;
const canvasMaxHeight = 800;

const objectSize = 20;
const moveIncrement = 20;

const snakeColor = "#64e764";
const appleColor = "#cc0000";

const DirectionEnum = {
    Up: 'Up',
    Down: 'Down',
    Left: 'Left',
    Right: 'Right'
  };

let snakeX = 320;
let snakeY = 400;
let appleX = 920;
let appleY = 400;
let currentDirection = DirectionEnum.Right;

document.onkeydown = function(event) {
    switch(event.key) {
        case "ArrowUp":
            currentDirection = DirectionEnum.Up;
            break;
        case "ArrowRight":
            currentDirection = DirectionEnum.Right;
            break;
        case "ArrowDown":
            currentDirection = DirectionEnum.Down;
            break;
        case "ArrowLeft":
            currentDirection = DirectionEnum.Left;
            break;
        default:
            currentDirection = DirectionEnum.Right;
            break;
    }    
}

function draw() {
    redrawBackground();

    drawApple();
    drawSnakeParent();

    moveSnake();

    setTimeout(() => {
        requestAnimationFrame(draw);
    }, 100);
}

function moveSnake() {
    switch(currentDirection) {
        case DirectionEnum.Up:
            snakeY -= moveIncrement;
            break;
        case DirectionEnum.Right:
            snakeX += moveIncrement;
            break;
        case DirectionEnum.Down:
            snakeY += moveIncrement;
            break;
        case DirectionEnum.Left:
            snakeX -= moveIncrement;
            break;
        default:
            snakeX += moveIncrement;
            break;
    }
}

function drawSnakeParent() {
    gameContext.beginPath();
    gameContext.fillStyle = snakeColor;
    gameContext.fillRect(snakeX, snakeY, objectSize, objectSize)
}

function drawApple() {
    gameContext.beginPath();
    gameContext.fillStyle = appleColor;
    gameContext.fillRect(appleX, appleY, objectSize, objectSize)
}

function redrawBackground() {
    gameContext.fillStyle = "rgb(0, 0, 0)";
    gameContext.fillRect(0, 0, canvasMaxWidth, canvasMaxHeight);
}

draw();