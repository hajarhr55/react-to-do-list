// React Hooks
import { useState, useEffect } from "react";

// MUI Components
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function EditTask({
  open,
  handleClose,
  editTask,
  title,
  description,
}) {
  const [editTodo, setEditTodo] = useState({
    title,
    description,
  });

  useEffect(() => {
    setEditTodo({
      title,
      description,
    });
  }, [title, description]);

  function handleSubmit(event) {
    event.preventDefault();
    editTask(editTodo.title, editTodo.description);
    handleClose();
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>تعديل المهمة</DialogTitle>
      <DialogContent>
        <DialogContentText>أضف التعديلات الجديدة</DialogContentText>
        <form onSubmit={handleSubmit} id="edit-task-form">
          {/* Task title */}
          <TextField
            value={editTodo.title ?? ""}
            onChange={(e) =>
              setEditTodo({ ...editTodo, title: e.target.value })
            }
            autoFocus
            required
            margin="dense"
            id="task-title"
            name="title"
            label="عنوان المهمة"
            fullWidth
            variant="standard"
          />

          {/* Task description */}
          <TextField
            value={editTodo.description ?? ""}
            onChange={(e) =>
              setEditTodo({ ...editTodo, description: e.target.value })
            }
            margin="dense"
            id="task-description"
            name="description"
            label="التفاصيل"
            fullWidth
            variant="standard"
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>إلغاء</Button>
        <Button type="submit" form="edit-task-form">
          تعديل
        </Button>
      </DialogActions>
    </Dialog>
  );
}
