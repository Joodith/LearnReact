import TodoItem from "../todoitem/TodoItem";

export default function TodoList() {
  const defaultItems = [
    "Read SpringBoot",
    "Complete assignments",
    "Prepare breakfast",
    "Sleep for 2 hours",
    "Take a shower",
  ];
  const todoItems = defaultItems.map((item, index) => {
    return <TodoItem itemName={item} itemKey={index} />;
  });

  return (
    <div className="todolist">
      <p>Nothing to do buddy. Sleep!!</p>
      <br />
      <ul>
        {todoItems}
        <hr />
      </ul>
    </div>
  );
}
