import { Button, Typography, Container, Box } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import {  useNavigate } from 'react-router';

const SuccecfullUpload = () => {
  const navigate=useNavigate();

  const goToFileList = () => {
    navigate('/filelist');  
  };

  return (
    <Container maxWidth="sm">
      <Box textAlign="center" mt={5}>
        <CheckCircle color="success" style={{ fontSize: 80 }} />
        <Typography variant="h4" color="textPrimary" gutterBottom>
          File Uploaded Successfully!
        </Typography>
        <Typography variant="body1" color="textSecondary" paragraph>
          Your file has been uploaded successfully. You can now view it or share it with others.
        </Typography>
        <Button variant="contained" color="primary" onClick={goToFileList} size="large">
          Go to My Files
        </Button>
      </Box>
    </Container>
  );
};

export default SuccecfullUpload;
