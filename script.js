const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameActive = true;

let board = ["","","","","","","","",""];

const winningConditions = [

[0,1,2],
[3,4,5],
[6,7,8],
[0,3,6],
[1,4,7],
[2,5,8],
[0,4,8],
[2,4,6]

];

function cellClicked(){

const index = this.dataset.index;

if(board[index] !== "" || !gameActive)
return;

board[index] = currentPlayer;
this.textContent = currentPlayer;
this.classList.add(currentPlayer.toLowerCase());

checkWinner();

}

function checkWinner(){

let roundWon = false;

for(let condition of winningConditions){

const a = board[condition[0]];
const b = board[condition[1]];
const c = board[condition[2]];

if(a==="" || b==="" || c==="")
continue;

if(a===b && b===c){

roundWon = true;
break;

}

}

if(roundWon){

statusText.innerHTML = `🎉 Player ${currentPlayer} Wins!`;
gameActive = false;
return;

}

if(!board.includes("")){

statusText.innerHTML = "🤝 It's a Draw!";
gameActive = false;
return;

}

currentPlayer = currentPlayer==="X" ? "O":"X";

statusText.innerHTML = `Player ${currentPlayer}'s Turn`;

}

function restartGame(){

board = ["","","","","","","","",""];
currentPlayer="X";
gameActive=true;

statusText.innerHTML="Player X's Turn";

cells.forEach(cell=>{

cell.textContent="";
cell.classList.remove("x");
cell.classList.remove("o");

});

}

cells.forEach(cell=>cell.addEventListener("click",cellClicked));

restartBtn.addEventListener("click",restartGame);