import React from "react";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Game from "./Game";

describe("<Game />", () => {
  async function updateSquareOnClick(testid, player) {
    userEvent.click(screen.getByTestId(testid));
    expect(screen.getByTestId(testid).textContent).toEqual(player);
  }
  async function checkPlayerStatus(statusExpected) {
    let receivedStatus = screen.getByTestId("status").textContent;
    expect(receivedStatus).toEqual(statusExpected);
  }

  async function checkGameStartInfo(info) {
    let receivedStatus = screen.getByTestId("moveItemStart").textContent;
    expect(receivedStatus).toEqual(info);
  }

  async function checkMoveInfo(move, info) {
    let id = "move" + move;
    let receivedStatus = screen.getByTestId(id).textContent;
    expect(receivedStatus).toEqual(info);
  }

  function checkBoardStatusOnMoveReset(expectedBoardStatus) {
    for (let i = 0; i < expectedBoardStatus.length; i++) {
      if (expectedBoardStatus[i]) {
        expect(screen.getByTestId(String(i)).textContent).toEqual(
          expectedBoardStatus[i]
        );
      } else {
        expect(screen.getByTestId(String(i)).textContent).toEqual("");
      }
    }
  }

  it("renders without crashing", () => {
    shallow(<Game />);
  });
  it("Clicking on square", () => {
    render(<Game />);
    updateSquareOnClick("0", "X");
    updateSquareOnClick("1", "O");
  });

  it("Play Game", async () => {
    let winnerStatus = "Winner : X";
    let moveInfo = "Go to move #";
    let winnerMovesVertical = {
      moves: [0, 1, 3, 2, 6],
      left_out_squares: [4, 5, 7, 8],
      winner: "X",
    };

    render(<Game />);
    let moves = winnerMovesVertical.moves;
    let xIsNext = true;
    await checkGameStartInfo("Go to game start!");
    for (let i = 0; i < moves.length; i++) {
      let player = xIsNext ? "X" : "O";
      await checkPlayerStatus("Next Player : " + player);
      await updateSquareOnClick(String(moves[i]), player);
      await checkMoveInfo(i + 1, moveInfo + (i + 1));
      xIsNext = !xIsNext;
    }
    checkPlayerStatus(winnerStatus);
  });

  it("Go back in history", async () => {
    let moveInfo = "Go to move #";
    let moves = [0, 1, 6, 3, 8, 7, 4];

    render(<Game />);
    let xIsNext = true;
    let moveBackIndex = 4;
    let expectedBoardStatus, nextSquare, size;
    let currentSquare = Array(9).fill(null);
    let history = [currentSquare];
    for (let i = 0; i < moves.length; i++) {
      let player = xIsNext ? "X" : "O";
      await checkPlayerStatus("Next Player : " + player);
      await updateSquareOnClick(String(moves[i]), player);
      await checkMoveInfo(i + 1, moveInfo + (i + 1));
      xIsNext = !xIsNext;
      nextSquare = currentSquare.slice();
      nextSquare[moves[i]] = player;
      if (moveBackIndex == i + 1) {
        expectedBoardStatus = nextSquare;
      }
      size = history.length;
      history = [...history.slice(0, size), nextSquare];
      currentSquare = nextSquare;
    }

    let id = "move" + moveBackIndex;
    userEvent.click(screen.getByTestId(id));
    checkBoardStatusOnMoveReset(expectedBoardStatus);
  });
});
