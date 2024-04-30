import Header from "./components/header/Header";
import TodoShow from "./components/todoshow/TodoShow";
import "./styles.css";

export default function App() {
  return (
    <div className="Application">
      <Header />
      <TodoShow />
    </div>
  );
}
