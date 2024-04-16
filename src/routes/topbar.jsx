import useScrollTrigger from '@mui/material/useScrollTrigger';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Slide from '@mui/material/Slide';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

import PropTypes from 'prop-types';
import { useState } from 'react';

function HideOnScroll({ children }) {
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction='down' in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
};

export default function Topbar(props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [accountMenuAnchor, setAccountMenuAnchor] = useState(null);

  const navigateToLoginPage = (event) => {
    alert('TODO: go to login page');
  };

  const openAccountMenu = (event) => {
    setAccountMenuAnchor(event.currentTarget);
  };

  const closeAccountMenu = (event) => {
    setAccountMenuAnchor(null);
  };

  return (
    <HideOnScroll {...props}>
      <AppBar
        position='sticky'
        maxWidth='100%'
        color='secondary'
        enableColorOnDark
      >
        <Toolbar>
          <Typography variant='h4' component='div' sx={{ flexGrow: 1 }}>
            Portfolio
          </Typography>
          {/* TODO: add navigation items */}
          {!loggedIn && (
            <IconButton
              size='large'
              onClick={navigateToLoginPage}
            >
              <LoginIcon />
            </IconButton>
          )}

          {loggedIn && (
            <IconButton
              size='large'
              onClick={openAccountMenu}
            >
              <AccountCircle />
            </IconButton>
          )}

          <Menu
            id='account-menu'
            anchorEl={accountMenuAnchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'center'
            }}
            open={Boolean(accountMenuAnchor)}
            onClose={closeAccountMenu}  
          >
            <MenuItem onClick={closeAccountMenu}>Item1</MenuItem>
            <MenuItem onClick={closeAccountMenu}>Item2</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}