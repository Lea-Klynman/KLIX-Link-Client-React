import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button, TextField, Card, CardContent, Typography, Box} from "@mui/material";
import { CloudUpload, Description, Cancel } from "@mui/icons-material";
import fileStore from "./FileStore";
import { useNavigate } from "react-router";

const FileUpload = observer(() => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [password, setPassword] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogSeverity, setDialogSeverity] = useState<"success" | "error">("error");
  const navigate = useNavigate();
  let isSuccessfulUpload:boolean = false;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      if (selectedFile.type !== "application/pdf" && selectedFile.type !== "application/vnd.openxmlformats-officedocument.wordprocessingml.document"&&dialogMessage) {
        setDialogMessage("Invalid file type. Please upload a PDF or DOCX file.");
       if(dialogSeverity !== "error") 
        setDialogSeverity("error");
        if(!openDialog)
        setOpenDialog(true);
        setFile(null);
        setFileName("");
      } else {
        setFile(selectedFile);
        setFileName(selectedFile.name);
      }} };

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
      const droppedFile = event.dataTransfer.files[0];
      if (droppedFile.type !== "application/pdf" ) {
        setDialogMessage("Invalid file type. Please upload a PDF file.");
        setDialogSeverity("error");
        setOpenDialog(true);
        setFile(null);
        setFileName("");
      } else {
        setFile(droppedFile);
        setFileName(droppedFile.name);
      }
    }
  };

  const handleUpload = async () => {
    if (!file || !fileName || !password) {
      setDialogMessage("Please fill out all fields");
      setDialogSeverity("error");
      setOpenDialog(true);
      return;
    }
    isSuccessfulUpload=await fileStore.uploadFile(file, fileName, password, file.type);
    if(isSuccessfulUpload)
    navigate("/succesfulUpload");
  else
  navigate("/failUpload")
  };

  const handleCancel = () => {
    setFile(null);
    setFileName("");
    setPassword("");
  };



  return (
    <>
    <Card sx={{ maxWidth: 500, margin: "auto", padding: 2, textAlign: "center", backgroundColor: "#f0f0f054" }}>
      <CardContent>
        <Typography variant="h4" gutterBottom sx={{ color: "#2c3e50",  fontFamily:"revert" }}>
          File Upload
        </Typography>
        {!file ? (
          <Box
            sx={{ border: `2px dashed ${dragOver ? "#2be0dc" : "#2be0dc"}`, padding: 4, marginBottom: 2, textAlign: "center", cursor: "pointer", backgroundColor: dragOver ? "#f0f0f0" : "transparent", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <CloudUpload sx={{ fontSize: 100, color: "#2be0dc" }} />
            <Typography sx={{ color: "#e14a4acf" }}>Drag and drop a PDF file here</Typography>
          </Box> ) 
          : (<Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 2 }}>

              <Description sx={{ fontSize: 100, color: "#e14a4acf", marginBottom: 1 }} /> 
             
            <Typography variant="body2" sx={{ marginBottom: 2 , color: "#2c3e50" }}>
              File selected: {file.name} </Typography>
           
            <Button variant="outlined"  onClick={handleCancel} startIcon={<Cancel />} sx={{ marginBottom: 2, border: "1px solid #2be0dc" ,color: "#2be0dc"}}>
              Cancel Selection </Button>
          </Box>
        )}
        <input type="file" onChange={handleFileChange} accept=".pdf" style={{ display: "none" }} id="file-input" />
        {!file && (
          <label htmlFor="file-input"> <Button variant="outlined" component="span" sx={{ marginBottom: 2, border: "1px solid #2be0dc" ,color: "#2c3e50"}}> Choose File</Button> </label>
 )}
        <TextField label="File Name" fullWidth  margin="normal" value={fileName}  onChange={(e) => setFileName(e.target.value)}  />

        <TextField label="Password" fullWidth margin="normal" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        
        <Button variant="contained" color="primary" onClick={handleUpload} sx={{ marginTop: 2 ,fontFamily:"revert"}}>  Upload</Button>
      </CardContent>
    </Card>

    
    </>
  );
});

export default FileUpload;
