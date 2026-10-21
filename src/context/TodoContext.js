import { createContext, useReducer, useContext, useEffect } from "react";
import todosReducer from "../reducers/todosReducer";

export const TodoContext = createContext(null);
export const TodoDispatchContext = createContext(null);

const TodoProvider = ({ children }) => {
  const [todos, dispatch] = useReducer(
    todosReducer,
    [],
    () => JSON.parse(localStorage.getItem("todos")) ?? [],
  );

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider value={todos}>
      <TodoDispatchContext.Provider value={dispatch}>
        {children}
      </TodoDispatchContext.Provider>
    </TodoContext.Provider>
  );
};

export const useTodos = () => {
  return useContext(TodoContext);
};

export const useTodoDispatch = () => {
  return useContext(TodoDispatchContext);
};

export default TodoProvider;
