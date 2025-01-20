import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Stack, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import logoGif from '../assets/Animation - 1735911293502.gif';
import useUsers from '../hooks/useUsers';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const { signUp, error, isLoading } = useUsers();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');

  const handleSignUp = async () => {
    await signUp(email, password, userName);
    if (!error) {
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        bgcolor: '#f5f5f5',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 400,
          margin: 'auto',
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          bgcolor: 'background.paper',
        }}
      >
        <Box
          component="img"
          src={logoGif}
          alt="Logo"
          sx={{ width: 150, height: 150, marginBottom: 2 }}
        />
        <Typography variant="h4" component="h1" gutterBottom>
          Sign up
        </Typography>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <TextField
            label="Name"
            type="text"
            variant="outlined"
            fullWidth
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            fullWidth
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <Alert severity="error">{error}</Alert>}
          <Button
            variant="contained"
            fullWidth
            onClick={handleSignUp}
            disabled={isLoading}
          >
            {isLoading ? 'Signing up...' : 'Sign up'}
          </Button>
        </Stack>
      </Box>
    </Box>
  );
};

export default SignUp;