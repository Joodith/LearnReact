import Header from "./components/Header";
import TodoList from "./components/TodoList";
import "./styles.css";

export default function App() {
  return (
    <div className="Application">
      <Header />
      <TodoList />
    </div>
  );
}
