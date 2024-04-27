import React from "react";
import Board from "./Board";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { shallow, mount } from "enzyme";

describe("<Board />", () => {
  it("renders without crashing", () => {
    let squares = Array(9).fill(null);
    shallow(<Board squares={squares} />);
  });

  it("Play Handler called when square is clicked", () => {
    let squares = Array(9).fill(null);
    const playHandler = jest.fn();
    render(<Board squares={squares} onPlay={playHandler} />);
    userEvent.click(screen.getByTestId("0"));
    squares[0] = "X";
    expect(playHandler).toHaveBeenCalledWith(squares);
  });

  it("Check Player status during play", async () => {
    let squares = Array(9).fill(null);
    let receivedStatus;
    let turnOne = {
      testid: "0",
      symbol: "X",
    };
    let turnTwo = {
      testid: "1",
      symbol: "O",
    };
    let firstStatus = "Next Player : " + turnOne.symbol;
    let secondStatus = "Next Player : " + turnTwo.symbol;
    const playHandler = jest.fn();

    render(<Board squares={squares} onPlay={playHandler} />);
    receivedStatus = screen.getByTestId("status").textContent;
    expect(receivedStatus).toEqual(firstStatus);

    userEvent.click(screen.getByTestId(turnOne.testid));

    receivedStatus = screen.getByTestId("status").textContent;
    expect(receivedStatus).toEqual(secondStatus);
  });
});
