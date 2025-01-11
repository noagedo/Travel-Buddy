import React from 'react';
import { Container, Typography, Box, Paper, Divider, Grid } from '@mui/material';

const PrivacyTerms = () => {
  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      {/* Title */}
      <Typography variant="h3" gutterBottom align="center" color="primary">
        Privacy & Terms For TravelBuddy
      </Typography>

      <Paper sx={{ padding: 3, bgcolor: 'background.paper', boxShadow: 3 }}>
        {/* Privacy Policy Content */}
        <Typography variant="h5" gutterBottom color="textSecondary">
          1. Information We Collect
        </Typography>
        <Typography paragraph>
          We may collect the following types of information:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              <strong>Personal Information:</strong> This includes any information that can be used to identify you personally, such as your name, email address, phone number, and payment details.
            </Typography>
          </Box>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              <strong>Usage Data:</strong> We automatically collect information about your use of our website, such as your IP address, browser type, operating system, and browsing activities (e.g., pages viewed, time spent on the site).
            </Typography>
          </Box>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              <strong>Cookies:</strong> We use cookies and similar technologies to collect data on your preferences and activities to improve your experience. You can control cookies through your browser settings.
            </Typography>
          </Box>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              <strong>Third-Party Data:</strong> We may collect information from third-party services such as social media platforms if you choose to interact with them via our website.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom color="textSecondary">
          2. How We Use Your Information
        </Typography>
        <Typography paragraph>
          We use the information we collect to:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              Provide and improve our services, including offering travel recommendations, booking services, and content.
            </Typography>
          </Box>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              Respond to your inquiries and provide customer support.
            </Typography>
          </Box>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              Personalize your experience based on your preferences.
            </Typography>
          </Box>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              Send you marketing materials and promotional offers (you may opt out of receiving these communications).
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Typography variant="h5" gutterBottom color="textSecondary">
          3. How We Share Your Information
        </Typography>
        <Typography paragraph>
          We may share your information in the following cases:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              <strong>Service Providers:</strong> We may share your information with third-party vendors and partners who perform services on our behalf, such as payment processors or analytics services.
            </Typography>
          </Box>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              <strong>Legal Compliance:</strong> We may disclose your information to comply with applicable laws, regulations, or legal processes, or in response to a valid request from a government authority.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Additional Sections */}
        <Typography variant="h5" gutterBottom color="textSecondary">
          4. How We Protect Your Information
        </Typography>
        <Typography paragraph>
          We implement reasonable security measures to protect your personal information from unauthorized access, alteration, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure, so we cannot guarantee absolute security.
        </Typography>

        <Typography variant="h5" gutterBottom color="textSecondary">
          5. Your Rights and Choices
        </Typography>
        <Typography paragraph>
          You have the following rights regarding your personal information:
        </Typography>
        <Box component="ul" sx={{ pl: 3 }}>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              Access: You can request access to the personal data we hold about you.
            </Typography>
          </Box>
          <Box component="li" sx={{ py: 1 }}>
            <Typography variant="body1">
              Correction: You can request corrections to any inaccurate or incomplete personal data.
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Footer Section */}
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <Grid item>
            <Typography variant="caption" align="center" color="textSecondary">
              &copy; {new Date().getFullYear()} TravelBuddy. All Rights Reserved.
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default PrivacyTerms;
