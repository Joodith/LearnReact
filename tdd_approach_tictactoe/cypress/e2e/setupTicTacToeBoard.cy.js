describe("Setting up Tic Tac Toe Board", () => {
  it("Displays the board with symbols when clicked", () => {
    let squareTestIdOne = {
      id: 1,
      symbol: "X",
    };
    let squareTestIdTwo = {
      id: 2,
      symbol: "O",
    };
    let winnerMovesVertical = {
      moves: [1, 2, 4, 3, 7],
      left_out_squares: [5, 6, 8, 9],
      winner: "X",
    };
    let winnerMovesHorizontal = {
      moves: [7, 4, 2, 5, 3, 6],
      left_out_squares: [1, 8, 9],
      winner: "O",
    };
    let winnerMovesDiagonal = {
      moves: [1, 2, 7, 4, 9, 8, 5],
      left_out_squares: [3, 6],
      winner: "X",
    };

    cy.visit("http://localhost:3000");
    checkBoardConfig();
    // clickSquareAndValidateSymbol(squareTestIdOne.id, squareTestIdOne.symbol);
    // clickSquareAndValidateSymbol(squareTestIdTwo.id, squareTestIdTwo.symbol);
    checkPlayedSquareImmutability(squareTestIdOne.id, squareTestIdOne.symbol);
    playWinnerMoves(winnerMovesVertical);
    playWinnerMoves(winnerMovesHorizontal);
    playWinnerMoves(winnerMovesDiagonal);
  });
});

const nextPlayerDesc = "Next Player : ";
const winnerDesc = "Winner : ";

function playWinnerMoves(winnerMoves) {
  cy.reload();
  checkWinnerStatus(winnerMoves);
}

function clickSquareAndValidateSymbol(testid, symbol) {
  checkPlayerStatus(symbol);
  cy.get("[data-testid=" + testid + "]").should("have.text", "");
  cy.get("[data-testid=" + testid + "]").click();
  cy.get("[data-testid=" + testid + "]").should("have.text", symbol);
}

function checkPlayedSquareImmutability(testid, symbol) {
  clickSquareAndValidateSymbol(testid, symbol);
  cy.get("[data-testid=" + testid + "]").click();
  cy.get("[data-testid=" + testid + "]").should("have.text", symbol);
}

function checkPlayerStatus(player) {
  let desc = nextPlayerDesc + player;
  cy.contains(desc);
}
function checkBoardConfig() {
  const dimension = 3;
  for (let rowNum = 1; rowNum <= dimension; rowNum++) {
    cy.get("[data-testid=row" + rowNum + "]")
      .children()
      .should("have.length", 3);
    cy.get("[data-testid=row" + rowNum + "]")
      .children()
      .each(($element) => {
        cy.wrap($element).should("have.class", "square");
      });
  }
}

function checkWinnerStatus(winnerMoves) {
  let player;
  let moves = winnerMoves.moves;
  let winner = winnerMoves.winner;
  let left_out_squares = winnerMoves.left_out_squares;
  for (let i = 0; i < moves.length; i++) {
    if (i % 2 == 0) {
      player = "X";
    } else {
      player = "O";
    }
    clickSquareAndValidateSymbol(moves[i], player);
  }
  cy.contains(winnerDesc + winner);
  cy.contains(nextPlayerDesc + "X").should("not.exist");
  cy.contains(nextPlayerDesc + "O").should("not.exist");
  if (left_out_squares.length > 0) {
    let testid = left_out_squares[0];
    cy.get("[data-testid=" + testid + "]").click();
    cy.get("[data-testid=" + testid + "]").should("have.text", "");
  }
}
