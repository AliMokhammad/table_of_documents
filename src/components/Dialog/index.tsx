import * as React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

interface Props {
  text: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleApprove: () => void;
}

export default function AlertDialog({
  text,
  open,
  setOpen,
  handleApprove,
}: Props) {
  const handleClose = () => {
    setOpen(false);
  };

  const handleApply = () => {
    handleApprove();
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to cancel the product(s)"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleApply}>Apply</Button>
          <Button onClick={handleClose} autoFocus>
            Reject
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
