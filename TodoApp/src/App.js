import Header from "./components/header/Header";
import TodoList from "./components/todolist/TodoList";
import "./styles.css";

export default function App() {
  return (
    <div className="Application">
      <Header />
      <TodoList />
    </div>
  );
}
