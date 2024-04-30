import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

test("should show default message when there is no todos", () => {
  render(<TodoList />);
  const defaultMessage = screen.queryByText("Nothing to do buddy. Sleep!!");
  expect(defaultMessage).toBeVisible();
});
