let music = new Audio("./Assets/music.mp3");
let ting = new Audio("./Assets/ting.mp3");
let gameOver = new Audio("./Assets/gameOver.mp3");
let turn = "X";
let isGameOver = false;

let changeTurn = function () {
    return turn === "X" ? "O" : "X";
};

let checkWin = function() {
    let boxText = document.getElementsByClassName("box-text");
    let winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        let combination = winningCombinations[i];
        if (boxText[combination[0]].innerHTML === boxText[combination[1]].innerHTML && 
            boxText[combination[1]].innerHTML === boxText[combination[2]].innerHTML && 
            boxText[combination[0]].innerHTML !== "") {
            document.getElementById("info").innerHTML = boxText[combination[0]].innerHTML + " WON!";
            isGameOver = true;
            music.play();
            document.querySelector(".img-box img").style.width = "200px"; // Show winner image
            break; 
        }
    }
};

let resetGame = function() {
    let boxText = document.getElementsByClassName("box-text");
    Array.from(boxText).forEach(element => {
        element.innerHTML = "";
    });
    turn = "X";
    isGameOver = false;
    document.getElementById("info").innerHTML = "Turn for X";
    document.querySelector(".img-box img").style.width = "0"; // Hide image after reset
    music.currentTime = 0; // Reset music playback
    music.pause(); // Pause music if it was playing
};

let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
    let boxText = element.getElementsByClassName("box-text")[0];
    element.addEventListener("click", function() {
        if (boxText.innerText === "" && !isGameOver) {
            boxText.innerText = turn;
            ting.play();
            checkWin();
            if (!isGameOver) {
                turn = changeTurn();
                document.getElementById("info").innerHTML = "It's " + turn + "'s turn";
            }
        }
    });
});

document.getElementById("reset").addEventListener("click", resetGame);
