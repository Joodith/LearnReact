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
  console.log("Board has " + rows + " rows and " + cols + " columns");

  const rowArray = Array.from({ length: rows }, (_, index) => index);
  const colArray = Array.from({ length: cols }, (_, index) => index);
  let rowsInBoard = null;
  if (rows === cols) {
    rowsInBoard = rowArray.map((rowVal) => {
      let sqRowNum = "SQR|" + rowVal;
      let colsInBoard = colArray.map((colVal) => {
        let curCol = rowVal * cols + colVal;
        let sqNum = "SQ|" + curCol;
        return (
          <Square
            sqNum={sqNum}
            value={squares[curCol]}
            onSquareClick={() => handleClick(curCol)}
          />
        );
      });
      return (
        <div key={sqRowNum} className="board-row">
          {colsInBoard}
        </div>
      );
    });
  }

  const winner = calculateWinner(squares, winningConfig);
  let status;
  if (winner === "X" || winner === "O") {
    status = "Winner: " + winner;
  } else if (winner === "=") {
    status = "Match: Draw";
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }
  return (
    <>
      <div className="status">{status}</div>
      {rowsInBoard}
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
  let lines = [];
  updateWinnerRowsAndDiags();
  updateWinnerCols();

  function updateWinnerRowsAndDiags() {
    const leftDiagValues = Array.from({ length: cols }, (_, index) => index);
    const rightDiagValues = Array.from({ length: cols }, (_, index) => index);
    for (let r = 0; r < rows; r++) {
      let curRowValues = Array.from({ length: cols }, (_, index) => index);
      for (let c = 0; c < cols; c++) {
        curRowValues[c] = r * cols + c;
        if (r === c) {
          leftDiagValues[r] = curRowValues[c];
        }
        if (r + c === rows - 1) {
          rightDiagValues[r] = curRowValues[c];
        }
      }
      lines.push(curRowValues);
    }
    lines.push(leftDiagValues);
    lines.push(rightDiagValues);
  }

  function updateWinnerCols() {
    for (let c = 0; c < cols; c++) {
      let curColValues = Array.from({ length: rows }, (_, index) => index);
      for (let r = 0; r < rows; r++) {
        curColValues[r] = r * cols + c;
      }
      lines.push(curColValues);
    }
  }
  return lines;
}
function calculateWinner(squares, winningConfig) {
  let oneNullSquareFound = false;
  for (let i = 0; i < winningConfig.length; i++) {
    let winSquares = winningConfig[i];
    let sqValue = squares[winSquares[0]];
    let winValue = null;
    for (let sq = 1; sq < winSquares.length; sq++) {
      let sqIndex = winSquares[sq];
      if (squares[sqIndex] === null || sqValue === null) {
        oneNullSquareFound = true;
      }
      if (squares[sqIndex] && sqValue && squares[sqIndex] === sqValue) {
        winValue = sqValue;
      } else {
        winValue = null;
        break;
      }
    }
    if (winValue) return winValue;
  }
  if (!oneNullSquareFound) return "=";
  return null;
}
