import * as React from 'react';
import Link from '@mui/material/Link';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Box, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import logo from '../assets/logo.webp';
import Button from '@mui/material/Button';



function Copyright() {
  return (
    <React.Fragment>
      {'© '}
      <Link color="inherit" href="https://mui.com/">
        TravelBuddy
      </Link>{' '}
      {new Date().getFullYear()}
    </React.Fragment>
  );
}

const LANGUAGES = [
  {
    code: 'en-US',
    name: 'English',
  },
];

const Footer = () => {
  return (
    <Typography
      component="footer"
      sx={{
        display: 'flex',
        bgcolor: 'secondary.light',
        direction: 'rtl', // Right-to-left direction
        paddingTop: 4,
        paddingBottom: 4,
        justifyContent: 'center', // Centers the entire footer content
      }}
    >
      <Container sx={{ display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={5} sx={{ justifyContent: 'center' }}>
          {/* Logo */}
          <Grid item xs={12} sm={4} md={3} sx={{ textAlign: 'center' }}>
            <Grid container direction="column" spacing={2} sx={{ justifyContent: 'center', height: 120 }}>
              <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                <img src={logo} alt="Logo" style={{ width: '100px', height: 'auto' }} />
              </Grid>
              <Grid item>
                <Copyright />
              </Grid>
            </Grid>
          </Grid>

          {/* Legal Links */}
          <Grid item xs={12} sm={4} md={2} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Legal
            </Typography>
            <Box component="ul" sx={{ m: 0, listStyle: 'none', p: 0 }}>
              <Box component="li" sx={{ py: 0.5 }}>
              <Button color='inherit' component={Link} href='/privacy-terms'>
                Privacy Terms
                </Button>

              </Box>
              
            </Box>
          </Grid>

          {/* Language Selection */}
          <Grid item xs={12} sm={4} md={4} sx={{ textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Language
            </Typography>
            <TextField
              select
              size="medium"
              variant="standard"
              SelectProps={{
                native: true,
              }}
              sx={{ mt: 1, width: 150 }}
            >
              {LANGUAGES.map((language) => (
                <option value={language.code} key={language.code}>
                  {language.name}
                </option>
              ))}
            </TextField>
          </Grid>

          {/* Attribution */}
          <Grid item xs={12} sx={{ textAlign: 'center' }}>
            <Typography variant="caption">
              {'Icons made by '}
              <Link href="https://www.freepik.com" rel="sponsored" title="Freepik">
                Freepik
              </Link>
              {' from '}
              <Link href="https://www.flaticon.com" rel="sponsored" title="Flaticon">
                www.flaticon.com
              </Link>
              {' is licensed by '}
              <Link
                href="https://creativecommons.org/licenses/by/3.0/"
                title="Creative Commons BY 3.0"
                target="_blank"
                rel="noopener noreferrer"
              >
                CC 3.0 BY
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Typography>
  );
}

export default Footer;
