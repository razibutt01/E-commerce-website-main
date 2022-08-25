import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { Link } from "@mui/material";
import NextLink from "next/link";

export default function ResponsiveDialog() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleClickOpen}
      >
        Go to Checkout
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Done!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Thank u For your ordering. Your will be delivered within 3 to 5
            working days
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <NextLink href="/" passHref>
            <Link>
              <Button
                autoFocus
                color="primary"
                variant="contained"
                onClick={handleClose}
              >
                Back To Shopping
              </Button>
            </Link>
          </NextLink>
        </DialogActions>
      </Dialog>
    </div>
  );
}
