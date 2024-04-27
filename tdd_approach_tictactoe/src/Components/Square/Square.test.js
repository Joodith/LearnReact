import React from "react";
import Square from "./Square";
import { shallow, mount } from "enzyme";

it("renders without crashing", () => {
  let idVal = "0";
  let squares = Array(9).fill(null);
  shallow(<Square idVal={idVal} value={squares[0]} />);
});

it("calls onClick event when a square on board is clicked", () => {
  let idVal = "0";
  let squares = Array(9).fill(null);
  const clickHandler = jest.fn();
  let wrapper = shallow(
    <Square idVal={idVal} value={squares[0]} onSquareClick={clickHandler} />
  );
  wrapper.find("button.square").first().simulate("click");
  expect(clickHandler).toHaveBeenCalledWith(0);
});
