import { Button, Typography, Container, Box } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import { useNavigate } from 'react-router';

const FailurePage = () => {
  const navigate = useNavigate();

  const goToUploadPage = () => {
    navigate('/upload');  // מעביר לדף העלאת הקובץ
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <Cancel color="error" style={{ fontSize: 80 }} />
        <Typography variant="h4" color="textPrimary" gutterBottom>
          File Upload Failed
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Something went wrong while uploading your file. Please try again.
        </Typography>
        <Button variant="contained" color="secondary" onClick={goToUploadPage} size="large">
          Retry Upload
        </Button>
      </Box>
    </Container>
  );
};

export default FailurePage;
