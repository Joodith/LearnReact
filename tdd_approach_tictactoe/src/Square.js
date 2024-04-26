import { useState } from "react";

export default function Square({ idVal, value, onSquareClick }) {
  let index = parseInt(idVal) - 1;
  return (
    <>
      <button
        className="square"
        data-testid={idVal}
        onClick={() => onSquareClick(index)}
      >
        {value}
      </button>
    </>
  );
}
