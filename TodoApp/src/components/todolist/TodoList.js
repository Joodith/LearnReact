import { useState } from "react";
import TodoItem from "../todoitem/TodoItem";

export default function TodoList({
  todoItems,
  handleDeleteStrikedTodos,
  handleStrikeTodo,
  strikedItems,
}) {
  function handleStrike(index) {
    const nextItems = strikedItems.slice();
    nextItems[index] = !strikedItems[index];
    handleStrikeTodo(nextItems);
  }
  const displayTodoItems = strikedItems.map((isStriked, index) => {
    let todoClassName = isStriked ? "todoItemStrike" : "todoItem";
    return (
      <TodoItem
        itemName={todoItems[index]}
        itemKey={index}
        handleStrike={() => handleStrike(index)}
        todoClassName={todoClassName}
      />
    );
  });
  function deleteStrikedTodos() {
    handleDeleteStrikedTodos();
  }
  const showMsgWhenNoTodos =
    todoItems.length > 0 ? "" : "Nothing to do buddy. Sleep!!";
  return (
    <div className="todolist">
      <p className="noTodosMsg">{showMsgWhenNoTodos}</p>
      <br />
      <ul data-testid="todo_list">
        {displayTodoItems}
        <hr />
      </ul>
      <button data-testid="delete_button" onClick={deleteStrikedTodos}>
        DELETE
      </button>
    </div>
  );
}
function getDisplayTodos(todoItems, strikedItems, handleStrike) {
  return todoItems.map((item, index) => {
    let todoClassName = strikedItems[index] ? "todoItemStrike" : "todoItem";
    return (
      <TodoItem
        itemName={item}
        itemKey={index}
        handleStrike={() => handleStrike(index)}
        todoClassName={todoClassName}
      />
    );
  });
}
