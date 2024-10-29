let ting = new Audio("ting.mp3");
let gameOver = new Audio("gameover.mp3");
let turn = "X";
let isGameOver = false;
let changeTurn = function () {
    return turn === "X" ? "O" : "X";
};

let checkWin = function() {
    let boxText = document.getElementsByClassName("box-text");
    let winningCombinations = [
        [0, 1, 2, 5, 5, 0],  // Row 1
        [3, 4, 5, 5, 15, 0], // Row 2
        [6, 7, 8, 5, 25, 0], // Row 3
        [0, 3, 6, -5, 15, 90], // Column 1
        [1, 4, 7, 5, 15, 90],  // Column 2
        [2, 5, 8, 15, 15, 90], // Column 3
        [0, 4, 8, 5, 15, 45],  // Diagonal 1
        [2, 4, 6, 5, 15, 135]   // Diagonal 2
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
        let combination = winningCombinations[i];
        if (boxText[combination[0]].innerHTML === boxText[combination[1]].innerHTML && 
            boxText[combination[1]].innerHTML === boxText[combination[2]].innerHTML && 
            boxText[combination[0]].innerHTML !== "") {
            document.getElementById("info").innerHTML = boxText[combination[0]].innerHTML + " WON!";
            isGameOver = true;
            gameOver.play();
            document.querySelector(".img-box img").style.width = "200px";
            const line = document.querySelector(".line");
            line.style.display = "block";
            document.querySelector(".line").style.transform = `translate(${combination[3]}vw, ${combination[4]}vw) rotate(${combination[5]}deg)`;
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
    document.querySelector(".img-box img").style.width = "0"; 
    document.querySelector(".line").style.display = "none";
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
