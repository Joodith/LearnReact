import Square from "../Square/Square";
import { useState } from "react";
function calculateWinner(squares) {
  const winningPos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningPos.length; i++) {
    const [a, b, c] = winningPos[i];
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default function Board({ squares, onPlay }) {
  // console.log(squares);
  const [xIsNext, setXIsnext] = useState(true);
  function handleClick(i) {
    if (squares[i] || calculateWinner(squares)) return null;
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
    setXIsnext(!xIsNext);
  }

  let nextPlayerDetail = "Next Player : " + (xIsNext ? "X" : "O");
  const winner = calculateWinner(squares);
  // console.log("winner : " + winner);
  let status;
  if (winner) {
    status = "Winner : " + winner;
  } else {
    status = nextPlayerDetail;
  }

  return (
    <>
      <div className="status" data-testid="status">
        {status}
      </div>
      <div className="board-row" data-testid="row1">
        <Square idVal="0" value={squares[0]} onSquareClick={handleClick} />
        <Square idVal="1" value={squares[1]} onSquareClick={handleClick} />
        <Square idVal="2" value={squares[2]} onSquareClick={handleClick} />
      </div>
      <div className="board-row" data-testid="row2">
        <Square idVal="3" value={squares[3]} onSquareClick={handleClick} />
        <Square idVal="4" value={squares[4]} onSquareClick={handleClick} />
        <Square idVal="5" value={squares[5]} onSquareClick={handleClick} />
      </div>
      <div className="board-row" data-testid="row3">
        <Square idVal="6" value={squares[6]} onSquareClick={handleClick} />
        <Square idVal="7" value={squares[7]} onSquareClick={handleClick} />
        <Square idVal="8" value={squares[8]} onSquareClick={handleClick} />
      </div>
    </>
  );
}
