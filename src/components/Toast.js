import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function SimpleSnackbar({ open, message, handleClose }) {
  return (
    <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
      <Alert severity="success" variant="filled">
        {message}
      </Alert>
    </Snackbar>
  );
}
