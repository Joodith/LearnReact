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
  function handleDeleteAllTodos() {
    const newItems = items.splice(0, 0);
    console.log(newItems);
    setItems(newItems);
  }
  return (
    <div className="showTodoList">
      <TodoList todoItems={items} handleDeleteAllTodos={handleDeleteAllTodos} />
    </div>
  );
}
