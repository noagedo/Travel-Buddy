import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import useUsers from '../hooks/useUsers';

const NavBar: React.FC = () => {
  const { user, signOut } = useUsers();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const confirmed = window.confirm('Are you sure you want to logout?');
    if (!confirmed) return;

    setLoading(true);
    await signOut();
    setTimeout(() => {
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Logo and Title */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={logo} alt="TravelBuddy Logo" style={{ width: '40px', height: '40px', marginRight: '20px' }} />
          <Typography variant="h4" color="inherit">
            TravelBuddy
          </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Typography variant="h6" color="inherit" sx={{ marginRight: 2 }}>
                {user.userName}
              </Typography>
              <Button color="inherit" onClick={handleLogout} disabled={loading}>
                {loading ? 'Logging out...' : 'Logout'}
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/sign-in">
                Sign In
              </Button>
              <Button color="inherit" component={Link} to="/sign-up">
                Sign Up
              </Button>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;