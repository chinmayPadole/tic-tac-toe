var game = [0, 0, 0, 0, 0, 0, 0, 0, 0];

//updateBoard();

function updateBoard() {
  var board = document.getElementById("board");

  // Get all child elements of the div
  var childElements = board.querySelectorAll("*");

  childElements.forEach((element, i) => {
    element.innerHTML = game[i] === 0 ? "" : game[i] === -1 ? "X" : "O";
  });
}

const gameState = {};

const players = {
  X: -1,
  O: 1,
};

function newGame() {
  game = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  updateBoard();
}

function isGaveOver() {
  if (game[0] == game[1] && game[1] == game[2] && game[0] != 0) {
    return game[0];
  }
  if (game[0] == game[3] && game[3] == game[6] && game[0] != 0) {
    return game[0];
  }
  if (game[3] == game[4] && game[4] == game[5] && game[3] != 0) {
    return game[3];
  }
  if (game[1] == game[4] && game[4] == game[7] && game[1] != 0) {
    return game[1];
  }
  if (game[6] == game[7] && game[7] == game[8] && game[6] != 0) {
    return game[6];
  }
  if (game[2] == game[5] && game[5] == game[8] && game[2] != 0) {
    return game[2];
  }
  if (game[0] == game[4] && game[4] == game[8] && game[0] != 0) {
    return game[0];
  }
  if (game[2] == game[4] && game[4] == game[6] && game[2] != 0) {
    return game[2];
  }

  return 0;
}

function minimax(isMaximizing, player, depth, alpha, beta) {
  var result = isGaveOver();
  console.log(result);
  if (result !== 0) {
    return result;
  }

  if (isMaximizing) {
    var bestScore = -Infinity;
    game.forEach((element, i) => {
      if (element === 0) {
        game[i] = player;
        var score = minimax(false, player * -1, depth + 1, alpha, beta);
        game[i] = 0;
        bestScore = Math.max(score, bestScore);
      }
    });

    return bestScore;
  } else {
    var bestScore = Infinity;
    game.forEach((element, i) => {
      if (element === 0) {
        game[i] = player;
        var score = minimax(true, player * -1, depth + 1, alpha, beta);
        game[i] = 0;
        bestScore = Math.min(score, bestScore);
      }
    });

    return bestScore;
  }
}

function makeMove(position, player) {
  var playerId = players[player];

  if (game[position] === 0) {
    game[position] = playerId;
  }

  updateBoard();

  var result = isGaveOver();

  if (result != 0) {
    document.getElementById("result").innerText = `${player} wins!`;
  }

  if (playerId === -1) {
    // get move from minimax
    makeBotMove();
  }
}

function makeBotMove() {
  var bestScore = -Infinity;
  var position = -1;

  game.forEach((element, i) => {
    if (element === 0) {
      game[i] = 1;
      var score = minimax(false, -1, 0, 0, 0);
      if (score > bestScore) {
        bestScore = score;
        position = i;
      }

      game[i] = 0;
    }
  });

  makeMove(position, "O");
}
