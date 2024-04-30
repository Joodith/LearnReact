import { useState } from "react";
import TodoList from "../todolist/TodoList";

export default function TodoShow() {
  const defaultItems = [
    "Read SpringBoot",
    "Complete assignments",
    "Prepare breakfast",
    "Sleep for 2 hours",
    "Take a shower",
  ];
  const [items, setItems] = useState(defaultItems);
  const [strikedItems, setStrikedItems] = useState(
    Array(items.length).fill(false)
  );
  function handleDeleteStrikedTodos() {
    const changedItems = items.filter((item, index) => {
      if (!strikedItems[index]) {
        return item;
      }
    });
    const changedStrikedItems = Array(changedItems.length).fill(false);
    // const changedItems = items.splice(0, 0);
    setItems(changedItems);
    // const changedStrikedItems = strikedItems.slice(0, 0);
    setStrikedItems(changedStrikedItems);
  }
  function handleStrikeTodo(nextItems) {
    setStrikedItems(nextItems);
  }
  return (
    <div className="showTodoList">
      <TodoList
        todoItems={items}
        handleDeleteStrikedTodos={handleDeleteStrikedTodos}
        handleStrikeTodo={handleStrikeTodo}
        strikedItems={strikedItems}
      />
    </div>
  );
}
