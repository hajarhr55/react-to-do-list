import "./App.css";
import { ToastProvider } from "./context/ToastContext";
import TodoProvider from "./context/TodoContext";
import Todo from "./Todo";

function App() {
  return (
    <TodoProvider>
      <ToastProvider>
        <Todo />
      </ToastProvider>
    </TodoProvider>
  );
}

export default App;
