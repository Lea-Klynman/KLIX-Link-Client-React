import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { CircularProgress, List, ListItem, ListItemText, ListItemButton } from "@mui/material";
import fileStore from "./FileStore";

const FileList = observer(() => {
  useEffect(() => {
    fileStore.fetchFiles();
  }, []);

  if (fileStore.loading) return <CircularProgress />;
  if (fileStore.error) return <div>Error: {fileStore.error}</div>;

  return (
    <List>
      {fileStore.files.map((file) => (
        <ListItem key={file.id}>
          <ListItemButton>
            <ListItemText primary={file.Name} secondary={file.encryptedLink} />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
});

export default FileList;