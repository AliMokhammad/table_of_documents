import { useState, useEffect } from "react";
import { Snackbar, Alert as MuiAlert } from "@mui/material";
import { useAppSelector } from "../../rtk/store";

export default function Alert() {
  const { msg, success } = useAppSelector((state) => state.alertSlice);
  const [open, setOpen] = useState(false);
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    (async () => setOpen(!!msg))();
  }, [msg]);

  return (
    <Snackbar open={open} autoHideDuration={3000} onClose={onClose}>
      <MuiAlert
        elevation={6}
        variant="filled"
        severity={success ? "success" : "error"}
        sx={{ width: "100%" }}
      >
        {msg}
      </MuiAlert>
    </Snackbar>
  );
}
