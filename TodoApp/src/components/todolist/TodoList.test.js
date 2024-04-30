import { render, screen } from "@testing-library/react";
import TodoList from "./TodoList";
import userEvent from "@testing-library/user-event";

describe("Diplay todos", () => {
  test("should show default message when there is no todos", () => {
    const defaultItems = [];
    const strikedItems = [];
    const deleteHandler = jest.fn();
    render(
      <TodoList
        todoItems={defaultItems}
        handleDeleteAllTodos={deleteHandler}
        strikedItems={strikedItems}
      />
    );
    const defaultMessage = screen.queryByText("Nothing to do buddy. Sleep!!");
    expect(defaultMessage).toBeVisible();
  });

  test("should display 5 todo items initially", () => {
    const defaultItems = [
      "Read SpringBoot",
      "Complete assignments",
      "Prepare breakfast",
      "Sleep for 2 hours",
      "Take a shower",
    ];
    const strikedItems = Array(defaultItems.length).fill(false);
    const deleteHandler = jest.fn();
    render(
      <TodoList
        todoItems={defaultItems}
        handleDeleteStrikedTodos={deleteHandler}
        strikedItems={strikedItems}
      />
    );
    defaultItems.forEach((element) => {
      let item = screen.queryByText(element);
      expect(item).toBeVisible();
    });
  });

  test("should call deleteAll handler when empty button clicked", async () => {
    const defaultItems = [
      "Read SpringBoot",
      "Complete assignments",
      "Prepare breakfast",
      "Sleep for 2 hours",
      "Take a shower",
    ];
    const strikedItems = Array(defaultItems.length).fill(false);
    const deleteAllHandler = jest.fn().mockName("deleteAllHandler");
    render(
      <TodoList
        todoItems={defaultItems}
        handleDeleteStrikedTodos={deleteAllHandler}
        strikedItems={strikedItems}
      />
    );

    async function clickDelete() {
      const emptyButton = screen.getByTestId("delete_button");
      userEvent.click(emptyButton);
    }

    await clickDelete();
    expect(deleteAllHandler).toHaveBeenCalled();
  });
});
