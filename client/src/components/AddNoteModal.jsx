import { useState } from "react";
import {
  Box,
  Button,
  Tooltip,
  Modal,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";

const AddNoteModal = (props) => {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState(props.note ?? "");
  const [error, setError] = useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const trimmedNote = note.trim();
    if (!trimmedNote) {
      setError("Please enter a note before submitting.");
      return;
    }

    console.log("Submitting note:", trimmedNote);
    const response = await props.onSubmit?.({
      note: trimmedNote,
      bookTitle: props?.bookTitle,
      bookAuthor: props?.bookAuthor,
      userName: props?.userName,
    });

    if (response.success) {
      setNote("");
      handleClose();
    }
  };

  const handleReset = () => {
    setNote(props.initialNote ?? "");
    setError("");
  };

  return (
    <Box>
      <Tooltip title="Add your book notes" placement="right">
        <Button sx={{ color: "#414141" }} onClick={handleOpen}>
          <EditNoteIcon sx={{ height: "40px", width: "40px" }} />
          Note
        </Button>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modal-content__container">
          <Box
            component="form"
            onSubmit={handleSubmit}
            autoComplete="off"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              justifyContent="space-between"
              spacing={2}
            >
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Title
                </Typography>
                <Typography variant="body1">
                  {props?.bookTitle || "Unknown Title"}
                </Typography>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ mt: 1.5 }}
                >
                  Author
                </Typography>
                <Typography variant="body1">
                  {props?.bookAuthor || "Unknown Author"}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  User
                </Typography>
                <Typography variant="body1">
                  {props?.userName || "Unknown User"}
                </Typography>
              </Box>
            </Stack>
            <TextField
              id="book-note"
              name="note"
              label="Add your note"
              placeholder="Write your thoughts about the book..."
              multiline
              minRows={8}
              maxRows={15}
              fullWidth
              required
              value={note}
              onChange={(event) => {
                setNote(event.target.value);
                if (error) {
                  setError("");
                }
              }}
              error={Boolean(error)}
              helperText={error || `${note.trim().length} characters`}
            />
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button variant="outlined" color="inherit" onClick={handleReset}>
                Reset
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="success"
                loading={props.loading}
                loadingPosition="start"
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default AddNoteModal;
