import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

export default function DeleteTask({ open, onClose, deleteTask }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      role="alertdialog"
    >
      <DialogTitle id="alert-dialog-title">
        "هل أنت متأكد من حذف المهمة؟"
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          لا يمكنك التراجع بعد الضغط على زر الحذف
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} autoFocus>
          إلغاء
        </Button>
        <Button onClick={deleteTask} color="error">
          حذف
        </Button>
      </DialogActions>
    </Dialog>
  );
}
