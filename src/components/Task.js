// MUI Components
import Fab from "@mui/material/Fab";
import Typography from "@mui/material/Typography";

// MUI Icons
import DoneIcon from "@mui/icons-material/Done";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

// Contexts
import { useToast } from "../context/ToastContext";
import { useTodoDispatch } from "../context/TodoContext";

// Responsive styles
const fabStyle = {
  width: { xs: 20, sm: 32 },
  height: { xs: 20, sm: 32 },
  minHeight: { xs: 20, sm: 32 },
};

const iconSize = {
  fontSize: {
    xs: "0.8rem",
    sm: "1.2rem",
  },
};

export default function Task({ todo, openEditDialog, openDeleteDialog }) {
  const { showHideToast } = useToast();
  const dispatch = useTodoDispatch();

  const handleEdit = () => {
    openEditDialog(todo);
  };

  function handleDelete() {
    openDeleteDialog(todo);
  }

  function handleToggleCompleted() {
    dispatch({
      type: "completed",
      payload: {
        id: todo.id,
      },
    });
    if (!todo.isCompleted) {
      showHideToast("تمت إضافة المهمة إلى المهام المنجزة بنجاح");
    } else {
      showHideToast("تمت إزالة المهمة من المهام المنجزة بنجاح");
    }
  }

  // Set the completion button background
  const bgColor = todo.isCompleted ? "green" : "white";

  return (
    <div className="task">
      <div className="content">
        <Typography
          className="title"
          sx={{
            fontSize: {
              xs: "0.9rem",
              sm: "1.2rem",
              md: "1.3rem",
            },
            textDecoration: todo.isCompleted ? "line-through" : "none",
          }}
        >
          {todo.title}
        </Typography>
        <Typography
          className="description"
          sx={{
            fontSize: {
              xs: "0.7rem",
              sm: "0.9rem",
              md: "1rem",
            },
          }}
        >
          {todo.description}
        </Typography>
      </div>
      <div className="icons">
        {/* Mark task as completed or not completed */}
        <Fab
          onClick={handleToggleCompleted}
          className="icon-btn"
          size="small"
          aria-label="تغيير حالة إنجاز المهمة"
          sx={{
            ...fabStyle,
            bgcolor: bgColor,
            "&:hover": {
              bgcolor: bgColor,
            },
          }}
        >
          <DoneIcon sx={iconSize} />
        </Fab>

        {/* Edit task */}
        <Fab
          className="icon-btn"
          size="small"
          color="secondary"
          aria-label="تعديل المهمة"
          sx={fabStyle}
          onClick={handleEdit}
        >
          <EditIcon sx={iconSize} />
        </Fab>

        {/* Delete task */}
        <Fab
          className="icon-btn"
          size="small"
          color="error"
          aria-label="حذف المهمة"
          sx={fabStyle}
          onClick={handleDelete}
        >
          <DeleteIcon sx={iconSize} />
        </Fab>
      </div>
    </div>
  );
}
