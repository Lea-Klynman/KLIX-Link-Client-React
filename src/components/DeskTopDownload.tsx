import React from "react";
import { Box, Button, Typography, Container, Paper } from "@mui/material";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

const DeskTopDownload: React.FC = () => {
  const downloadUrl = "https://491085426156-klix-link-testpnoren.s3.amazonaws.com/KLIXLinkDesktop%20Setup%201.0.0.exe";

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 4 }}>
        <Box textAlign="center">
          <CloudDownloadIcon sx={{ fontSize: 64, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" gutterBottom>
            הורדת האפליקציה
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            הורידו את גרסת ה-Desktop של התוכנה בלחיצה אחת:
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href={downloadUrl}
            download
            startIcon={<CloudDownloadIcon />}
          >
            הורד עכשיו
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default DeskTopDownload;
