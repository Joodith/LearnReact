import { useState } from "react";
import Board from "../Board/Board";

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquare = history[currentMove];
  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }
  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }
  const moves = history.map((squares, move) => {
    let description, testid;
    if (move > 0) {
      description = "Go to move #" + move;
      testid = "move" + move;
    } else {
      description = "Go to game start!";
      testid = "moveItemStart";
    }
    return (
      <>
        <li key={move}>
          <button data-testid={testid} onClick={() => jumpTo(move)}>
            {description}
          </button>
        </li>
      </>
    );
  });
  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquare} onPlay={handlePlay} />
        </div>
        <div className="game-info">
          <ol>{moves}</ol>
        </div>
      </div>
    </>
  );
}
