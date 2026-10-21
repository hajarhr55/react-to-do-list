export default function todosReducer(todos, action) {
  switch (action.type) {
    case "added": {
      const newTodo = {
        id: action.payload.id,
        title: action.payload.newTitle,
        description: "",
        isCompleted: false,
      };

      return [...todos, newTodo];
    }

    case "delete": {
      const updatedTodos = todos.filter(
        (todo) => todo.id !== action.payload.id,
      );
      return updatedTodos;
    }

    case "edit": {
      const newTodos = todos.map((task) => {
        if (task.id === action.payload.id) {
          return {
            ...task,
            title: action.payload.newTitle,
            description: action.payload.newDescription,
          };
        }

        return task;
      });
      return newTodos;
    }

    case "completed": {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }

        return todo;
      });
      return updatedTodos;
    }

    default:
      throw Error("Unknown action: " + action.type);
  }
}
