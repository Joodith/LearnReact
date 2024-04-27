const nextPlayerDesc = "Next Player : ";
const winnerDesc = "Winner : ";

Cypress.Commands.add("clickSquareAndValidateSymbol", (testid, symbol) => {
  cy.checkPlayerStatus(symbol);
  cy.get("[data-testid=" + testid + "]").should("have.text", "");
  cy.get("[data-testid=" + testid + "]").click();
  cy.get("[data-testid=" + testid + "]").should("have.text", symbol);
});

Cypress.Commands.add("checkPlayerStatus", (player) => {
  let desc = nextPlayerDesc + player;
  cy.contains(desc);
});

Cypress.Commands.add("checkPlayedSquareImmutability", (testid, symbol) => {
  cy.clickSquareAndValidateSymbol(testid, symbol);
  cy.get("[data-testid=" + testid + "]").click();
  cy.get("[data-testid=" + testid + "]").should("have.text", symbol);
});

Cypress.Commands.add("playWinnerMoves", (winnerMoves) => {
  cy.reload();
  cy.checkWinnerStatus(winnerMoves);
});

Cypress.Commands.add("checkWinnerStatus", (winnerMoves) => {
  let player, moveNum, nextSquare;
  let moves = winnerMoves.moves;
  let winner = winnerMoves.winner;
  let left_out_squares = winnerMoves.left_out_squares;
  let currentSquare = Array(9).fill(null);
  let history = [currentSquare];

  cy.checkForGameStartInfo();
  const playGame = () => {
    for (let i = 0; i < moves.length; i++) {
      if (i % 2 == 0) {
        player = "X";
      } else {
        player = "O";
      }
      moveNum = i + 1;
      let sq = parseInt(moves[i]);
      nextSquare = currentSquare.slice();
      nextSquare[sq] = player;
      cy.clickSquareAndValidateSymbol(moves[i], player);
      history = [...history.slice(0, moveNum), nextSquare];
      currentSquare = nextSquare;
      cy.checkForGameMoveInfoUpdate(moveNum);
    }
  };
  playGame();
  cy.checkPostWinConditions(winner, left_out_squares);
  cy.checkTimeTravel(history, moves);
});

Cypress.Commands.add("checkForGameStartInfo", () => {
  cy.get('[data-testid="moveItemStart"]').contains("Go to game start!");
});

Cypress.Commands.add("checkForGameMoveInfoUpdate", (moveNum) => {
  cy.get("[data-testid=move" + moveNum + "]").contains(
    "Go to move #" + moveNum
  );
});
Cypress.Commands.add("checkTimeTravel", (history, moves) => {
  let max = moves.length + 1;
  let min = 0;
  let moveBackIndex = Math.floor(Math.random() * (max - min) + min);
  cy.checkMoveReset(history, moveBackIndex);
});
Cypress.Commands.add("checkMoveReset", (history, moveBackIndex) => {
  cy.get("[data-testid=move" + moveBackIndex + "]").click();
  let currentSquares = history[moveBackIndex];
  for (let i = 0; i < currentSquares.length; i++) {
    if (currentSquares[i]) {
      cy.get("[data-testid=" + i + "]").should("have.text", currentSquares[i]);
    } else {
      cy.get("[data-testid=" + i + "]").should("have.text", "");
    }
  }
});

Cypress.Commands.add("checkPostWinConditions", (winner, left_out_squares) => {
  cy.contains(winnerDesc + winner);
  cy.contains(nextPlayerDesc + "X").should("not.exist");
  cy.contains(nextPlayerDesc + "O").should("not.exist");
  if (left_out_squares.length > 0) {
    let testid = left_out_squares[0];
    cy.get("[data-testid=" + testid + "]").click();
    cy.get("[data-testid=" + testid + "]").should("have.text", "");
  }
});
