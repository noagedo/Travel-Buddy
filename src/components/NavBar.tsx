import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import logo from '../assets/logo.webp';

const Navbar: React.FC = () => {

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="TravelBuddy Logo" style={{ width: '40px', height: '40px', marginRight: '10px' }} />
          <Typography variant="h6" color="inherit">
            TravelBuddy
          </Typography>
        </Box>

        {/* Buttons */}
        <Box>
          <Button color="inherit" sx={{ mr: 2 }}>
            Sign In
          </Button>
          <Button color="secondary" variant="outlined">
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};


export default Navbar;

