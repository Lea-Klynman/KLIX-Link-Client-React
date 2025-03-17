import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, TextField, Card, CardContent, Typography, Box } from "@mui/material";
import { CloudUpload } from "@mui/icons-material";
import fileStore from "./FileStore";

const FileUpload = observer(() => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [password, setPassword] = useState("");
  const [dragOver, setDragOver] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
      setFileName(event.target.files[0].name);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragOver(false);
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      setFile(event.dataTransfer.files[0]);
      setFileName(event.dataTransfer.files[0].name);
    }
  };

  const handleUpload = async () => {
    if (!file || !fileName || !password) {
      alert("אנא מלא את כל השדות");
      return;
    }
    await fileStore.uploadFile(file, fileName, password);
  };

  return (
    <Card sx={{ maxWidth: 400, margin: "auto", padding: 2, textAlign: "center" }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          העלאת קובץ
        </Typography>
        <Box
          sx={{
            border: `2px dashed ${dragOver ? "blue" : "gray"}`,
            padding: 4,
            marginBottom: 2,
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: dragOver ? "#f0f0f0" : "transparent",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <CloudUpload sx={{ fontSize: 50, color: "gray" }} />
          <Typography>גרור ושחרר קובץ כאן</Typography>
        </Box>
        <input type="file" onChange={handleFileChange} accept=".pdf,.docx" style={{ display: "none" }} id="file-input" />
        <label htmlFor="file-input">
          <Button variant="outlined" component="span">
            בחר קובץ
          </Button>
        </label>
        {file && (
          <Typography variant="body2" sx={{ marginTop: 1 }}>
            קובץ שנבחר: {file.name}
          </Typography>
        )}
        <TextField
          label="שם הקובץ"
          fullWidth
          margin="normal"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
        />
        <TextField
          label="סיסמה"
          fullWidth
          margin="normal"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginTop: 2 }}>
          העלה
        </Button>
      </CardContent>
    </Card>
  );
});

export default FileUpload;
