import { useState } from "react";
import { UserFile } from "../../types/UserFile";
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import {
  Close,
  PictureAsPdf,
  Visibility,
} from "@mui/icons-material";
import fileStore from "./FileStore";
import InfoTooltip from "../Massages/InfoTooltip";
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { DownloadIcon } from "lucide-react";

const FileCardShare = ({ file, filetype }: { file: UserFile; filetype: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fileUrl, setFileUrl] = useState<string | null>(null);


  const handleCloseViewer = () => {
    if (fileUrl) {
      URL.revokeObjectURL(fileUrl);
      setFileUrl(null);
    }
    setOpenDialog(false);
  };

  const handleViewClick = () => {
    setAnchorEl(null);
    setOpenDialog(true);
  };
  const handleDownload = async () => {
    await fileStore.downloadFile(file, "encrypted/file");
  };
  const handleFetchFile = async () => {
    try {
      const fileBlob = await fileStore.getSharedfile(email, file.id, password);
      if (!fileBlob) {
        throw new Error("Failed to fetch file: Blob is undefined");
      }

      if (filetype === "application/pdf") {
        const fileURL = URL.createObjectURL(fileBlob);
        setFileUrl(fileURL);
      } else {
        alert("Viewing this file type is not supported.");
      }
    } catch (error) {
      console.error("Error fetching file:", error);
    }
  };

  return (
    <>

      <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: "center", position: "relative" }}>
      <PictureAsPdf fontSize="large" color="error" />
        <Typography variant="subtitle1" fontWeight="bold" mt={1}>
          {file.name}
        </Typography>
        <IconButton sx={{ position: "absolute", top: 5, right: 5 }} onClick={(e) => setAnchorEl(e.currentTarget)}>
          <Visibility />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          {filetype === "application/pdf" && <MenuItem onClick={handleViewClick}>View</MenuItem>}
        </Menu>
        <Box mt={2} display="flex" justifyContent="left" gap={2}>
          
          <IconButton onClick={handleDownload} title="Download File">
            <DownloadIcon color="black" fontSize="action" />
          </IconButton>
        </Box>
      </Paper>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Enter Email & Password</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="dense"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            InputProps={{
              endAdornment: (
                <InfoTooltip
                  info="Your personal email address to which the file was shared."
                  icon="?"
                />
              ),
            }}
          />
          <TextField
            fullWidth
            margin="dense"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InfoTooltip
                  info="This is the password sent to you via email in the notification message about the shared file."
                  icon="!"
                />
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleFetchFile} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {fileUrl&& (
        <Dialog open={Boolean(fileUrl)} onClose={handleCloseViewer} fullWidth maxWidth="md" >
         <DialogTitle>PDF Viewer</DialogTitle>
         <IconButton onClick={handleCloseViewer}>
    <Close />
  </IconButton>
  <DialogContent>
    <div style={{ height: '600px' }}>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
        <Viewer
          fileUrl={fileUrl}
          defaultScale={1}
          plugins={[]}
        />
      </Worker>
    </div>
  </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default FileCardShare;
