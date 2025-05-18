import React from 'react';
import { Container, Typography, Card, Button } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useNavigate } from 'react-router';

const UnauthorizedPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ p: 3, textAlign: 'center', borderRadius: 4, boxShadow: 4 }}>
        <LockOutlinedIcon color="warning" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" gutterBottom color="warning.main">
          Unauthorized Access
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          You do not have the necessary permissions to view this page.
          Please login with the appropriate account or contact support.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Card>
    </Container>
  );
};

export default UnauthorizedPage;
