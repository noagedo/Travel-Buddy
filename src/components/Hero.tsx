import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import backgroundImage from '../assets/picture-HomePage.jpg'; // Adjust the path

const Hero: React.FC = () => {
  return (
    <Box
      sx={{
        height: '100vh',
        backgroundImage: `url(${backgroundImage})`, // Use the imported image
        backgroundSize: 'cover', // Ensure the image covers the entire area
        backgroundPosition: 'center', // Center the image
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        textAlign: 'center',
        position: 'relative', // Enable positioning for the overlay
      }}
    >
         {/* Dark overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black overlay
          zIndex: 1,
        }}
      />
      {/* Text container with higher z-index */}
      <Box sx={{ zIndex: 2, position: 'relative', color: 'white' }}>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 2 }}>
          TravelBuddy - A Network for Travelers
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Discover new destinations, share experiences, and create your unique travel profile
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          size="large"
          sx={{
            backgroundColor: '#FF4081',
            '&:hover': { backgroundColor: '#E73370' },
            mb: 3,
          }}
        >
          Join Now
        </Button>
        <Typography variant="body1" sx={{ fontSize: '1.3rem', maxWidth: '600px', textAlign: 'center', mx: 'auto' }}>
          <strong>Features:</strong><br />
          - External content: AI-powered suggestions for new travel destinations.<br />
          - Share experiences: Post your travel experiences with text and images.<br />
          - Comments and Likes: Comment on posts and give likes.<br />
          - User Profile: A list of destinations you’ve visited or planned to visit.
        </Typography>
      </Box>
    </Box>
  );
};

export default Hero;