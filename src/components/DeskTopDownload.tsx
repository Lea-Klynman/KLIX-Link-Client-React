// import React from "react";
// import { Box, Button, Typography, Container, Paper } from "@mui/material";
// import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// const DeskTopDownload: React.FC = () => {
//  const downloadUrl = "https://491085426156-klix-link-testpnoren.s3.amazonaws.com/KLIXLinkDesktop%20Setup%201.0.0.exe?AWSAccessKeyId=AKIAXEVXY5XWH2XAU35X&Expires=1747570918&Signature=2%2BLol%2FLVhH2AaipXO0VmerHgjas%3D";

//   return (
//     <Container maxWidth="sm" sx={{ mt: 10 }}>
//       <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
//         <Box textAlign="center">
//           <CloudDownloadIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
//           <Typography variant="h4" gutterBottom>
//             הורדת האפליקציה
//           </Typography>
//           <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
//             הורידו את גרסת ה-Desktop של התוכנה בלחיצה אחת:
//           </Typography>
//           <Button
//             variant="contained"
//             color="primary"
//             size="large"
//             href={downloadUrl}
//             download
//             startIcon={<CloudDownloadIcon />}
//           >
//             הורד עכשיו
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default DeskTopDownload;
// components/DeskTopDownload.tsx
import React from "react";
import { observer } from "mobx-react-lite";
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useState } from "react";
import fileStore from "./File Pages/FileStore";

const DeskTopDownload: React.FC = observer(() => {
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleDownload = async () => {
    setLoading(true);
    const url = await fileStore.getPresignedDownloadUrl();
    setLoading(false);

    if (url) {
      // יצירת אלמנט זמני להורדה
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "KLIXLinkDesktop_Setup.exe");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      setSnackbarOpen(true);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box textAlign="center">
          <CloudDownloadIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            KLIX-Link Desktop App
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            The KLIX-Link Desktop application enables you to securely view encrypted
            documents directly on your personal computer. Download and install now to
            experience secure access to your files offline.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleDownload}
            disabled={loading}
            startIcon={<CloudDownloadIcon />}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : "Download Now"}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="error" variant="filled" onClose={() => setSnackbarOpen(false)}>
          Failed to fetch the download link. Please try again later.
        </Alert>
      </Snackbar>
    </Container>
  );
});

export default DeskTopDownload;
