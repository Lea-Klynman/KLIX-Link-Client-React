import React from 'react';
import { Container, Typography, Card, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { useNavigate } from 'react-router';

const NetfreeErrorPage: React.FC = () => {
    const navigate = useNavigate();
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Card sx={{ p: 3, textAlign: 'center', borderRadius: 4, boxShadow: 4 }}>
        <ErrorOutlineIcon color="error" sx={{ fontSize: 60, mb: 2 }} />
        <Typography variant="h4" gutterBottom color="error">
          NetFree Error
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Access to this content is blocked by NetFree filtering system.
          If you believe this is a mistake, please contact your administrator.
        </Typography>
        <Button variant="contained" color="primary" onClick={() => navigate('/')}>
          Back to Home
        </Button>
      </Card>
    </Container>
  );
};

export default NetfreeErrorPage;
