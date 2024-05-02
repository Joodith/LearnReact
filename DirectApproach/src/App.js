import { useState } from "react";
function Square({ sqNum, value, onSquareClick }) {
  return (
    <button key={sqNum} className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ rows, cols, xIsNext, squares, onPlay, winningConfig }) {
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares, winningConfig)) return;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  function renderWinnerOrNextPlayerStatus(winner) {
    let status;
    if (winner === "X" || winner === "O") {
      status = "Winner: " + winner;
    } else if (winner === "=") {
      status = "Match: Draw";
    } else {
      status = "Next Player: " + (xIsNext ? "X" : "O");
    }
    return status;
  }

  const renderSquareBoardWithGivenRowsAndCols = () => {
    const arrayWhoseValuesAreRowIndices = Array.from(
      { length: rows },
      (_, index) => index
    );
    const arrayWhoseValuesAreColumnIndices = Array.from(
      { length: cols },
      (_, index) => index
    );
    let boardWithGivenConfig = null;
    if (rows === cols) {
      boardWithGivenConfig = arrayWhoseValuesAreRowIndices.map(
        (rowIndexVal) => {
          let rowKey = "SQR|" + rowIndexVal;
          let squaresInCurrentRow = arrayWhoseValuesAreColumnIndices.map(
            (colIndexVal) => {
              let currentSquareIndex1D = rowIndexVal * cols + colIndexVal;
              let currentSquareKey = "SQ|" + currentSquareIndex1D;
              return (
                <Square
                  sqNum={currentSquareKey}
                  value={squares[currentSquareIndex1D]}
                  onSquareClick={() => handleClick(currentSquareIndex1D)}
                />
              );
            }
          );
          return (
            <div key={rowKey} className="board-row">
              {squaresInCurrentRow}
            </div>
          );
        }
      );
    }
    return boardWithGivenConfig;
  };

  const winner = calculateWinner(squares, winningConfig);
  let status = renderWinnerOrNextPlayerStatus(winner);
  return (
    <>
      <div className="status">{status}</div>
      {renderSquareBoardWithGivenRowsAndCols}
    </>
  );
}

function BoardConfig({ rows, cols, onConfigChange }) {
  return (
    <>
      <h3>Board Configuration</h3>
      <div>
        <label htmlFor="rows">Rows : </label>
        <input
          id="rows"
          type="number"
          value={rows}
          onChange={(e) => onConfigChange(e.target.value, cols)}
        />
      </div>
      <div>
        <label htmlFor="cols">Columns : </label>
        <input
          id="cols"
          type="number"
          value={cols}
          onChange={(event) => onConfigChange(rows, event.target.value)}
        />
      </div>
    </>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [winningConfig, setWinningConfig] = useState(updateWinnerSquares(3, 3));
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  function handleBoardConfigChange(givenRow, givenCol) {
    console.log(givenRow, givenCol);
    if (givenRow !== rows) setRows(givenRow);
    if (givenCol != cols) setCols(givenCol);
    if (givenRow && givenCol && givenRow === givenCol) {
      const newSquares = Array(givenRow * givenCol).fill(null);
      const newHistory = [newSquares];
      setHistory(newHistory);
      setCurrentMove(newHistory.length - 1);
      const newWinningConfig = updateWinnerSquares(givenRow, givenCol);
      setWinningConfig(newWinningConfig);
    }
  }
  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <>
      <div className="game">
        <div className="game-board">
          <BoardConfig
            rows={rows}
            cols={cols}
            onConfigChange={handleBoardConfigChange}
          />
          <Board
            rows={rows}
            cols={cols}
            xIsNext={xIsNext}
            squares={currentSquares}
            onPlay={handlePlay}
            winningConfig={winningConfig}
          />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}

function updateWinnerSquares(rows, cols) {
  let victoryPaths = [];
  updateWinnerRowsAndDiags();
  updateWinnerCols();

  function updateWinnerRowsAndDiags() {
    const winningLeftDiagonalIndices = Array.from(
      { length: cols },
      (_, index) => index
    );
    const winningRightDiagonalIndices = Array.from(
      { length: cols },
      (_, index) => index
    );
    for (let row = 0; row < rows; row++) {
      let winningRowIndices = Array.from({ length: cols }, (_, index) => index);
      for (let col = 0; col < cols; col++) {
        winningRowIndices[col] = row * cols + col;
        if (row === col) {
          winningLeftDiagonalIndices[row] = winningRowIndices[col];
        }
        if (row + col === rows - 1) {
          winningRightDiagonalIndices[row] = winningRowIndices[col];
        }
      }
      victoryPaths.push(winningRowIndices);
    }
    victoryPaths.push(winningLeftDiagonalIndices);
    victoryPaths.push(winningRightDiagonalIndices);
  }

  function updateWinnerCols() {
    for (let col = 0; col < cols; col++) {
      let winningColIndices = Array.from({ length: rows }, (_, index) => index);
      for (let row = 0; row < rows; row++) {
        winningColIndices[row] = row * cols + col;
      }
      victoryPaths.push(winningColIndices);
    }
  }
  return victoryPaths;
}
function calculateWinner(squares, winningConfig) {
  let oneNullSquareFound = false;
  for (let i = 0; i < winningConfig.length; i++) {
    let winSquares = winningConfig[i];
    let valueInSquare = squares[winSquares[0]];
    let winnerSymbol = null;
    for (let i = 1; i < winSquares.length; i++) {
      let squareIndex = winSquares[i];
      if (squares[squareIndex] === null || valueInSquare === null) {
        oneNullSquareFound = true;
      }
      if (
        squares[squareIndex] &&
        valueInSquare &&
        squares[squareIndex] === valueInSquare
      ) {
        winnerSymbol = valueInSquare;
      } else {
        winnerSymbol = null;
        break;
      }
    }
    if (winnerSymbol) return winnerSymbol;
  }
  if (!oneNullSquareFound) return "=";
  return null;
}
