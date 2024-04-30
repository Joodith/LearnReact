import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "./Header";

test("should contain the heading as TODO LIST", () => {
  render(<Header />);
  const hdr = screen.getByText("TODO LIST");
  expect(hdr).toBeInTheDocument();
});
