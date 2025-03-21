import { Description, InsertDriveFile, MoreVert, PictureAsPdf } from "@mui/icons-material";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Menu, MenuItem, Paper, TextField, Typography } from "@mui/material";
import { JSX, useState } from "react";
import { UserFile } from "../../types/UserFile";

const fileIcons: Record<string, JSX.Element> = {
  "application/pdf": <PictureAsPdf fontSize="large" color="error" />, 
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": <Description fontSize="large" color="primary" />, 
  default: <InsertDriveFile fontSize="large" color="disabled" />,
};

const FileCard = ({ file, filetype }: { file: UserFile; filetype: string }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openShare, setOpenShare] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [password, setPassword] = useState("");
  const [newFileName, setNewFileName] = useState(file.name);

  const handleDelete = async () => {
    // שליחת בקשה לשרת למחיקת הקובץ
    console.log("Deleting file", file);
    setOpenDelete(false);
  };

  const handleShare = async () => {
    // שליחת מייל עם סיסמה
    console.log("Sharing file", file, "with password", password);
    setOpenShare(false);
  };

  const handleEdit = async () => {
    // שליחת בקשה לעריכת שם הקובץ
    console.log("Editing file", file, "new name", newFileName);
    setOpenEdit(false);
  };

  return (
    <>
      <Paper elevation={3} sx={{ p: 2, width: 200, textAlign: "center", position: "relative" }}>
        {fileIcons[filetype] || fileIcons.default}
        <Typography variant="subtitle1" fontWeight="bold" mt={1}>{file.name}</Typography>
        <IconButton 
          sx={{ position: "absolute", top: 5, right: 5 }}
          onClick={(e) => setAnchorEl(e.currentTarget)}
        >
          <MoreVert />
        </IconButton>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
          <MenuItem onClick={() => { setOpenShare(true); setAnchorEl(null); }}>🔗 Share</MenuItem>
          <MenuItem onClick={() => { setOpenEdit(true); setAnchorEl(null); }}>✏️ Edit</MenuItem>
          <MenuItem onClick={() => { setOpenDelete(true); setAnchorEl(null); }}>🗑️ Delete</MenuItem>
        </Menu>
      </Paper>

      {/* דיאלוג לשיתוף קובץ */}
      <Dialog open={openShare} onClose={() => setOpenShare(false)}>
        <DialogTitle>שתף קובץ</DialogTitle>
        <DialogContent>
          <TextField label="סיסמה" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenShare(false)}>ביטול</Button>
          <Button onClick={handleShare} color="primary">שלח</Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג אישור מחיקה */}
      <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
        <DialogTitle>מחיקת קובץ</DialogTitle>
        <DialogContent>
          <Typography>האם אתה בטוח שברצונך למחוק את {file.name}?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDelete(false)}>ביטול</Button>
          <Button onClick={handleDelete} color="error">מחק</Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג עריכת שם הקובץ */}
      <Dialog open={openEdit} onClose={() => setOpenEdit(false)}>
        <DialogTitle>עריכת קובץ</DialogTitle>
        <DialogContent>
          <TextField label="שם קובץ חדש" fullWidth value={newFileName} onChange={(e) => setNewFileName(e.target.value)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEdit(false)}>ביטול</Button>
          <Button onClick={handleEdit} color="primary">שמור</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FileCard;
