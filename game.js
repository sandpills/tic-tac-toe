// player: red X, opponent: blue O

const readlineSync = require('readline-sync');
const chalk = require('chalk');

console.log("tic tac toe <3");

let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

let currentPlayer = 'X';
let gameActive = true;

// game loop
function startGame() {
  if (gameActive) {
    displayBoard();
    playerMove();
  }
}

function displayBoard() {
  console.clear(); // <---
  console.log(chalk.yellow('=== tic tac toe <3 ===\n'));

  console.log(chalk.gray('  A   B   C'));

  for (let i = 0; i < 3; i++) {
    let row = chalk.gray(i + 1 + ' ');

    for (let j = 0; j < 3; j++) {
      if (board[i][j] == 'X') {
        row += chalk.red('X');
      } else if (board[i][j] == 'O') {
        row += chalk.blue('O');
      } else {
        row += ' ';
      }

      // vertical seperator
      if (j < 2) {
        row += chalk.gray(' | ');
      }
    }

    console.log(row);

    // horizontal seperator
    if (i < 2) {
      console.log(chalk.gray('  --+---+--'));
    }
  }

  //current player
  let playerDisplay;
  if (currentPlayer == 'X') {
    playerDisplay = chalk.red('X');
  } else {
    playerDisplay = chalk.blue('O');
  }

  console.log(chalk.yellow('\nCurrent player: ') + playerDisplay);
}

function playerMove() {
  // ask for position
  const input = readlineSync.question(`player ${currentPlayer}, enter position (e.g. A1, B2, C3): `).toUpperCase();

  // input format
  function isValidPos(input) {
    const validRows = ['A', 'B', 'C'];
    const validCols = ['1', '2', '3'];

    if (input.length !== 2) return false;
    if (!validRows.includes(input[0])) return false;
    if (!validCols.includes(input[1])) return false;

    return true;
  }

  if (!isValidPos(input)) {
    console.log("DUmmY that's WrOnG! WhAt did I tell you? OnLY use format like 'A1', 'B2', etc.");
    return playerMove();
  }


  // convert chess notation to array
  const colIndex = input.charCodeAt(0) - 'A'.charCodeAt(0);
  const rowIndex = parseInt(input[1]) - 1;

  // check if spot is occupied
  if (board[rowIndex][colIndex] !== ' ') {
    console.log("DUmmY this sPot iz tAkEn! Try agAiN anD be bEttEr >:0");
    return playerMove(); // try again same player
  }

  // update board
  board[rowIndex][colIndex] = currentPlayer;

  checkWinning();

  if (checkWinning()) {
    displayBoard(); // show board one last time
    console.log(currentPlayer + ' has won, try again i guess');
    gameActive = false;
    gameEnd();
    return; // exit
  }

  // if no win, change player
  switchPlayer();
  displayBoard();

  if (gameActive) {
    playerMove(); // loop
  }
}

function switchPlayer() {
  if (currentPlayer == 'X') {
    currentPlayer = 'O'
  } else {
    currentPlayer = 'X'
  }
}

function checkWinning() {
  //row check
  for (let i = 0; i < 3; i++) {
    if (board[i][0] == currentPlayer && board[i][1] == currentPlayer && board[i][2] == currentPlayer) {
      return true;
    }
  }

  //column check
  for (let i = 0; i < 3; i++) {
    if (board[0][i] == currentPlayer && board[1][i] == currentPlayer && board[2][i] == currentPlayer) {
      return true;
    }
  }

  //diagnal check
  if (board[0][0] == currentPlayer && board[1][1] == currentPlayer && board[2][2] == currentPlayer) {
    return true;
  }

  if (board[0][2] == currentPlayer && board[1][1] == currentPlayer && board[2][0] == currentPlayer) {
    return true;
  }

  return false;
}

function gameEnd() {
  // ask for restart
  const input = readlineSync.question(`Would you like to TrY aGain? say Y or N `).toUpperCase();

  if (input == 'Y') {
    console.log('Mmmk, here we go aGaiN...')
    // reset board
    board = [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' ']
    ];
    gameActive = true;
    startGame();
  } else {
    console.log('ok, nEveR come bAck!');
    return;
  }
}

startGame();