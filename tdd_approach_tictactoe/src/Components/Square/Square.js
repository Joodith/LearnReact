import { useState } from "react";

export default function Square({ idVal, value, onSquareClick }) {
  let index = parseInt(idVal);
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
