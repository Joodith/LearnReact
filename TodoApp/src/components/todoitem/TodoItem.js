export default function TodoItem({
  itemName,
  itemKey,
  handleStrike,
  todoClassName,
}) {
  let key = "item_key_" + { itemKey };
  return (
    <div className="todoItemDiv">
      <hr />

      <li key={key} className={todoClassName} onClick={handleStrike}>
        {itemName}
      </li>
    </div>
  );
}
