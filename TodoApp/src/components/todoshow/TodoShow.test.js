import TodoShow from "./TodoShow";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Display page containing todos list", () => {
  test("should delete striked todos when DELETE button is clicked", async () => {
    const defaultItems = [
      "Read SpringBoot",
      "Complete assignments",
      "Prepare breakfast",
      "Sleep for 2 hours",
      "Take a shower",
    ];

    render(<TodoShow />);

    async function clickDelete() {
      const emptyButton = screen.getByTestId("delete_button");
      userEvent.click(emptyButton);
    }
    const todoListItems = document.querySelectorAll("li");
    expect(todoListItems.length).toBe(defaultItems.length);
    strikeFirstTwoTodos();
    await clickDelete();
    const itemsLength = document.querySelectorAll("li").length;
    expect(itemsLength).toBe(defaultItems.length - 2);

    function strikeFirstTwoTodos() {
      userEvent.click(todoListItems[0]);
      userEvent.click(todoListItems[1]);
    }
  });

  test("should strike an item when clicked", async () => {
    render(<TodoShow />);
    const todoItem = document.querySelectorAll("li");
    if (todoItem.length > 0) {
      expect(todoItem[0]).toHaveClass("todoItem");
      userEvent.click(todoItem[0]);
      expect(todoItem[0]).toHaveClass("todoItemStrike");
      userEvent.click(todoItem[0]);
      expect(todoItem[0]).toHaveClass("todoItem");
    }
  });
});
