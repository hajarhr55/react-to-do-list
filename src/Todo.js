// React
import { useState, useMemo } from "react";

// MUI Components
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Other Libraries
import { v4 as uuidv4 } from "uuid";

// Contexts
import { useToast } from "./context/ToastContext";
import { useTodos, useTodoDispatch } from "./context/TodoContext";

// Components
import Task from "./components/Task";
import EditTask from "./components/EditTask";
import DeleteTask from "./components/DeleteTask";

// Styles
import "./App.css";

// Theme and responsive typography settings
const theme = createTheme({
  typography: {
    fontFamily: "Changa",
  },
  palette: {
    primary: {
      main: "#8b639b",
    },
    secondary: {
      main: "#af719d",
    },
  },
});

const titleFontSize = {
  fontSize: {
    xs: "1.2rem",
    sm: "1.5rem",
    md: "2rem",
  },
};

const buttonFontSize = {
  fontSize: {
    xs: "0.7rem",
    sm: "0.9rem",
    md: "1rem",
  },
};

export default function Todo() {
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Contexts
  const { showHideToast } = useToast();
  const todos = useTodos();
  const dispatch = useTodoDispatch();

  // Add a new task
  function addNewTask() {
    const title = taskTitle.trim();
    if (!title) return;
    dispatch({
      type: "added",
      payload: {
        id: uuidv4(),
        newTitle: title,
      },
    });
    setTaskTitle("");
    showHideToast("تمت إضافة مهمة جديدة بنجاح");
  }

  // Edit task
  function openEditDialog(todo) {
    setSelectedTodo(todo);
    setIsEditDialogOpen(true);
  }

  function handleEditClose() {
    setIsEditDialogOpen(false);
  }

  function editTask(id, newTitle, newDescription) {
    dispatch({
      type: "edit",
      payload: {
        id: id,
        newTitle: newTitle,
        newDescription: newDescription,
      },
    });
    showHideToast("تم تعديل المهمة بنجاح");
  }

  // Delete task
  function openDeleteDialog(todo) {
    setIsDeleteDialogOpen(true);
    setSelectedTodo(todo);
  }

  function handleDeleteClose() {
    setIsDeleteDialogOpen(false);
  }

  function deleteTask(id) {
    dispatch({
      type: "delete",
      payload: {
        id: id,
      },
    });
    setIsDeleteDialogOpen(false);
    showHideToast("تم حذف المهمة بنجاح");
  }

  // Filter tasks based on the selected status
  const completedList = useMemo(() => {
    return todos.filter((t) => {
      return t.isCompleted;
    });
  }, [todos]);

  const notCompletedList = useMemo(() => {
    return todos.filter((t) => {
      return !t.isCompleted;
    });
  }, [todos]);

  const filteredTodos =
    selectedFilter === "completed"
      ? completedList
      : selectedFilter === "not-completed"
        ? notCompletedList
        : todos;

  // Handle filter selection
  function changeSelectedFilter(event, newFilter) {
    if (newFilter !== null) {
      setSelectedFilter(newFilter);
    }
  }

  // Render the filtered tasks
  const tasks = filteredTodos.map((todo) => (
    <Task
      key={todo.id}
      todo={todo}
      openEditDialog={openEditDialog}
      openDeleteDialog={openDeleteDialog}
    />
  ));
  return (
    <ThemeProvider theme={theme}>
      <EditTask
        open={isEditDialogOpen}
        title={selectedTodo?.title}
        description={selectedTodo?.description}
        handleClose={handleEditClose}
        editTask={(newTitle, newDescription) =>
          editTask(selectedTodo?.id, newTitle, newDescription)
        }
      />
      <DeleteTask
        open={isDeleteDialogOpen}
        onClose={handleDeleteClose}
        deleteTask={() => {
          if (selectedTodo) {
            deleteTask(selectedTodo.id);
          }
        }}
      />
      <Container maxWidth="sm" className="container">
        <div className="app" dir="rtl">
          <header>
            <Typography
              variant="h2"
              sx={{
                ...titleFontSize,
                marginBottom: "1rem",
              }}
            >
              مهامي
            </Typography>
            <hr style={{ margin: " 0.5rem 0" }}></hr>
            <ToggleButtonGroup
              exclusive
              variant="outlined"
              value={selectedFilter}
              onChange={changeSelectedFilter}
              aria-label="تصفية المهام"
              sx={{
                "& .MuiToggleButton-root": {
                  bgcolor: "white",
                  color: "black",
                  borderRadius: "0",
                  borderColor: "#888",
                  ...buttonFontSize,
                },
              }}
            >
              <ToggleButton value="all">الكل</ToggleButton>
              <ToggleButton value="completed">منجز</ToggleButton>
              <ToggleButton value="not-completed">غير منجز</ToggleButton>
            </ToggleButtonGroup>
          </header>
          <main
            style={{
              maxHeight: "55vh",
              overflow: "auto",
              scrollbarWidth: "none",
            }}
          >
            {tasks}
          </main>
          <footer>
            <TextField
              value={taskTitle}
              onChange={(e) => {
                setTaskTitle(e.target.value);
              }}
              className="text-field"
              size="small"
              id="outlined-size-small"
              style={{
                background: "white",
              }}
              label="عنوان المهمة"
              variant="filled"
              slotProps={{
                inputLabel: {
                  sx: {
                    fontSize: {
                      xs: "0.9rem",
                      sm: "1rem",
                    },
                  },
                },
              }}
            />
            <Button
              onClick={addNewTask}
              color="primary"
              size="small"
              variant="contained"
              sx={{ ...buttonFontSize }}
              disabled={taskTitle.length === 0}
            >
              أضف
            </Button>
          </footer>
        </div>
      </Container>
    </ThemeProvider>
  );
}
