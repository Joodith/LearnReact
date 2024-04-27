describe("Setting up Tic Tac Toe Board", () => {
  it("Displays the board with symbols when clicked", () => {
    let squareTestIdOne = {
      id: 0,
      symbol: "X",
    };
    let squareTestIdTwo = {
      id: 1,
      symbol: "O",
    };
    let winnerMovesVertical = {
      moves: [0, 1, 3, 2, 6],
      left_out_squares: [4, 5, 7, 8],
      winner: "X",
    };
    let winnerMovesHorizontal = {
      moves: [6, 3, 1, 4, 2, 5],
      left_out_squares: [0, 7, 8],
      winner: "O",
    };
    let winnerMovesDiagonal = {
      moves: [0, 1, 6, 3, 8, 7, 4],
      left_out_squares: [2, 5],
      winner: "X",
    };

    cy.visit("http://localhost:3000");
    checkBoardConfig();
    cy.checkPlayedSquareImmutability(
      squareTestIdOne.id,
      squareTestIdOne.symbol
    );
    cy.playWinnerMoves(winnerMovesVertical);
    // cy.playWinnerMoves(winnerMovesHorizontal);
    // cy.playWinnerMoves(winnerMovesDiagonal);
  });
});

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
