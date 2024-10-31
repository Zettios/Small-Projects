const gameCanvas = document.getElementById("gameWindow");
const gameContext = gameCanvas.getContext('2d');

const canvasMaxWidth = 1280;
const canvasMaxHeight = 800;

const gameFps = 5;
const fpsInterval = 1000 / gameFps;
let currentTime = performance.now();
let startTime = currentTime;
let prevTime = currentTime;
let elapsedTimeBetweenFrames;
let frameCount = 0;

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
let queuedDirection = undefined;

// When the window isn't focused functions such as requestAnimationFrame get limited/throttled, causing the FPS to not be accurate.
// Therefore I reset the values of currentTime, startTime, prevTime, and frameCount to essentially reset the FPS.
window.onfocus = function () {
    currentTime = performance.now();
    startTime = currentTime;
    prevTime = currentTime;
    frameCount = 0;
    startTime = performance.now();
};

document.onkeydown = function(event) {
    switch(event.key) {
        case "ArrowUp":
            (currentDirection === DirectionEnum.Right || currentDirection === DirectionEnum.Left) && (queuedDirection = DirectionEnum.Up);
            break;
        case "ArrowRight":
            (currentDirection === DirectionEnum.Up || currentDirection === DirectionEnum.Down) && (queuedDirection = DirectionEnum.Right);
            break;
        case "ArrowDown":
            (currentDirection === DirectionEnum.Right || currentDirection === DirectionEnum.Left) && (queuedDirection = DirectionEnum.Down);
            break;
        case "ArrowLeft":
            (currentDirection === DirectionEnum.Up || currentDirection === DirectionEnum.Down) && (queuedDirection = DirectionEnum.Left);
            break;
        default:
            (currentDirection === DirectionEnum.Up || currentDirection === DirectionEnum.Down) && (queuedDirection = DirectionEnum.Right);
            break;
    }    
}


function animate() {
    requestAnimationFrame(animate);

    currentTime = performance.now();
    elapsedTimeBetweenFrames = currentTime - prevTime;
    
    if (elapsedTimeBetweenFrames > fpsInterval) {
        prevTime = currentTime - (elapsedTimeBetweenFrames % fpsInterval);
        redrawBackground();
        drawFps();

        drawApple();
        drawSnakeParent();
        
        moveSnake();
    }
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

function drawFps() {
    gameContext.font = "25px arial";
    gameContext.fillStyle = snakeColor;
    gameContext.fillText(`${Math.round(1000 / ((currentTime - startTime) / ++frameCount))}fps`, canvasMaxWidth - 70, 30);
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

animate();