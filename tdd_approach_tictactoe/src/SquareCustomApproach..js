// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";
// import Square from "./Components/Square/Square";

// describe("<Square/>", () => {
//   let clickSquareHandler, squares;
//   describe("Clicking the squares of tic tac toe board", () => {
//     let firstTestId = "0";
//     let secondTestId = "1";
//     squares = Array(9).fill("");
//     async function firstTimeSquareClicked() {
//       await clickSquareEvent(firstTestId, 0);
//     }
//     async function secondTimeSquareClicked() {
//       await clickSquareEvent(secondTestId, 1);
//     }

//     async function clickSquareEvent(testId, index) {
//       clickSquareHandler = jest.fn().mockName("clickSquareHandler");
//       render(
//         <Square
//           idVal={testId}
//           value={squares[index]}
//           onSquareClick={clickSquareHandler}
//         />
//       );
//       userEvent.click(screen.getByTestId(testId));
//     }

//     it("Get the symbol when square is clicked", async () => {
//       await firstTimeSquareClicked();
//       expect(screen.getByTestId(firstTestId).textContent).toEqual(squares[0]);
//       await secondTimeSquareClicked();
//       expect(screen.getByTestId(secondTestId).textContent).toEqual(squares[1]);
//     });

//     it("Call the square click handler", async () => {
//       await firstTimeSquareClicked();
//       expect(clickSquareHandler).toHaveBeenCalledWith(0);
//       await secondTimeSquareClicked();
//       expect(clickSquareHandler).toHaveBeenCalledWith(1);
//     });
//   });
// });
