/* eslint-disable no-unused-vars */
import useScrollTrigger from '@mui/material/useScrollTrigger';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Menu from '@mui/material/Menu';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';
import HomeIcon from '@mui/icons-material/Home';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
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
  const [loggedIn, setLoggedIn] = useState(true);
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
        color='secondary'
        position='sticky'
        enableColorOnDark
      >
        <Toolbar sx={{ display: 'flex' }}>
          <Button
            disableElevation
            startIcon={<HomeIcon />}
            variant='contained'
            color='success'
            size='large'
            component={Link} to='/'
          >
            MCPorto
          </Button>
          {/* TODO: switch to tabs? */}
          <Button component={Link} to='/projects' sx={{ ml: 'auto' }}>
            Projets
          </Button>
          {loggedIn && (
            <Button component={Link} to='/admin' sx={{ ml: 'auto' }}>
              Administration
            </Button>
          )}

          {/* TODO: add navigation items */}
          {!loggedIn && (
            <IconButton
              size='large'
              sx={{ ml: 'auto' }}
              onClick={navigateToLoginPage}
            >
              <LoginIcon />
            </IconButton>
          )}

          {loggedIn && (
            <IconButton
              size='large'
              sx={{ ml: 'auto' }}
              onClick={openAccountMenu}
            >
              <AccountCircleIcon />
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
            { /* TODO: fetch user info */}
            <MenuItem onClick={closeAccountMenu} sx={{fontWeight: 'bold'}}>
              Mathieu CHOPLAIN
            </MenuItem>
            <MenuItem onClick={closeAccountMenu}>Déconnexion</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  );
}