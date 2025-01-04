import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import CssBaseline from '@mui/material/CssBaseline';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Link } from 'react-router-dom'; // ייבוא של React Router

import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SmartToyIcon from '@mui/icons-material/SmartToy';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import logo from '../assets/logo.png';

interface Props {
  window?: () => Window;
  children?: React.ReactElement<{ elevation?: number }>;
}

function ElevationScroll(props: Props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return children
    ? React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
      })
    : null;
}

const NavBar: React.FC<Props> = (props: Props) => {
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
        
          <Toolbar style={styles.toolbar}>
          <Link to="/" style={styles.logo}>
              <img src={logo} style={styles.logoImage} />
            </Link>
           
            <Link to="/myAccount" style={styles.navItem}>
              <AccountBoxIcon fontSize="large" style={styles.icon} />
              {/* <Typography variant="h6" style={styles.text}>My Account</Typography> */}
            </Link>
            <Link to="/add-post" style={styles.navItem}>
              <AddCircleIcon fontSize="large" style={styles.icon} />
              {/* <Typography variant="h6" style={styles.text}>Add New Post</Typography> */}
            </Link>
            <Link to="/ai" style={styles.navItem}>
              <SmartToyIcon fontSize="large" style={styles.icon} />
              {/* <Typography variant="h6" style={styles.text}>AI</Typography> */}
            </Link>
            <Link to="/logout" style={styles.navItem}>
              <LogoutIcon fontSize="large" style={styles.icon} />
              {/* <Typography variant="h6" style={styles.text}>Logout</Typography> */}
            </Link>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar /> {/* רווח נוסף מתחת לאפבר */}
    </React.Fragment>
  );
};

const styles = {
    toolbar: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 20px',
      },
  navItem: {
    color: '#fff',
    textDecoration: 'none',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease, transform 0.2s ease',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none', // להסיר קו תחתון אם יש
  },
  logoImage: {
    width: '40px', // תוכל לשנות את הגודל בהתאם
    height: 'auto',
  },
  icon: {
    marginRight: '8px',
  },
  text: {
    fontSize: '16px',
    fontWeight: '500',
  },
};

export default NavBar;
