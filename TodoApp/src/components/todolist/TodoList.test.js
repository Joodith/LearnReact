import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";

test("should show default message when there is no todos", () => {
  render(<TodoList />);
  const defaultMessage = screen.queryByText("Nothing to do buddy. Sleep!!");
  expect(defaultMessage).toBeVisible();
});

test("should display 5 todo items initially", () => {
  render(<TodoList />);
  const defaultItems = [
    "Read SpringBoot",
    "Complete assignments",
    "Prepare breakfast",
    "Sleep for 2 hours",
    "Take a shower",
  ];

  defaultItems.forEach((element) => {
    let item = screen.queryByText(element);
    expect(item).toBeVisible();
  });
});
