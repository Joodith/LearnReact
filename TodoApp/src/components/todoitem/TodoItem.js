export default function TodoItem({ itemName, itemKey }) {
  let key = "item_key_" + { itemKey };
  return (
    <div className="todoItemDiv">
      <hr />

      <li key={key} className="todoItem">
        {itemName}
      </li>
    </div>
  );
}
