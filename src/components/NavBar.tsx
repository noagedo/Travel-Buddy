import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.webp';
import useUsers from '../hooks/useUsers';
import AccountCircle from '@mui/icons-material/AccountCircle';
import AddCircle from '@mui/icons-material/AddCircle';
import Logout from '@mui/icons-material/Logout';


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
          <Typography
              variant="h4"
              color="inherit"
              sx={{
                fontFamily: "'Comic Sans MS', 'Comic Sans', cursive",
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
                color: "#f5f5f5",
                fontWeight: "bold",
                textDecoration: "none"
              }}
               component={Link}
                  to="/posts"
            >
              TravelBuddy
            </Typography>
        </Box>

        {/* Navigation Links */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {user ? (
            <>
              <Typography variant="h6" color="inherit" sx={{ marginRight: 2 }}>
                Welcome, {user.userName}
              </Typography>
              <Button
                  color="inherit"
                  component={Link}
                  to="/add-post"
                  disabled={loading}
                  sx={{ border: '2px solid pink', marginLeft: 2 }}
                >
                  <AddCircle />
                </Button>
                <Button
                  color="inherit"
                  component={Link}
                  to="/personal-area"
                  disabled={loading}
                  sx={{ border: '2px solid pink', marginLeft: 2 }}
                >
                  <AccountCircle />
                </Button>
              <Button color="inherit" onClick={handleLogout} disabled={loading} sx={{ border: '2px solid pink', marginLeft: 2 }}>
                {loading ? 'Logging out...' : <Logout />}
              </Button>
              
             
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} sx={{ border: '2px solid pink', marginLeft: 2 }} to="/sign-in">
                Sign In
              </Button>
              <Button color="inherit" component={Link} sx={{ border: '2px solid pink', marginLeft: 2 }} to="/sign-up">
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