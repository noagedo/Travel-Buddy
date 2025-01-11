import React from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom'; 
import logo from '../assets/logo.webp';


const NavBar: React.FC = () => {
 
  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="TravelBuddy Logo" style={{ width: '40px', height: '40px', marginRight: '20px' }} />
          <Typography
                variant="h4"
                color="inherit"
                sx={{
                    fontFamily: '"Sofia", sans-serif', 
                }}  >
                  <Button color='inherit' component={Link} to='/'>
                TravelBuddy
                </Button>
            </Typography>
        </Box>

        {/* Buttons */}
        <Box>
          <Button
            color="inherit"
            sx={{ mr: 2 }}
            component={Link}
            to="/sign-in" // נתיב ל-sign-in (תוכל להוסיף את הקומפוננטה הזו אם נדרשת)
          >
            Sign In
          </Button>
          <Button
            color="secondary"
            variant="outlined"
            component={Link}
            to="/sign-up" // נתיב ל-sign-up
          >
            Sign Up
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
