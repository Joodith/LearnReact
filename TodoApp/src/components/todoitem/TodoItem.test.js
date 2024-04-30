import { render, screen } from "@testing-library/react";
import TodoItem from "./TodoItem";
import userEvent from "@testing-library/user-event";

describe("Display todo item", () => {
  test("should call handleStrike on cliking an item", () => {
    const strikeHandler = jest.fn();
    const itemName = "Complete assignments";
    const key = "item_key_0";
    render(
      <TodoItem
        itemName={itemName}
        itemKey={key}
        handleStrike={strikeHandler}
      />
    );
    const todoItem = screen.getByText(itemName);
    userEvent.click(todoItem);
    expect(strikeHandler).toHaveBeenCalled();
  });
});
