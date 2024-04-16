/* eslint-disable no-unused-vars */
import useScrollTrigger from '@mui/material/useScrollTrigger';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Menu from '@mui/material/Menu';

import AccountCircle from '@mui/icons-material/AccountCircle';
import LoginIcon from '@mui/icons-material/Login';

import PropTypes from 'prop-types';

import { useState } from 'react';
import { Link } from 'react-router-dom';

import theme from '../mui-theme';

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
        color='secondary'
        enableColorOnDark
      >
        <Toolbar sx={{ display: 'flex' }}>
          <Link to='/' style={theme.typography.h3}>
            Portfolio
          </Link>
          {/* TODO: switch to tabs */}
          <Button component={Link} to='/projects' sx={{ ml: 'auto' }}>
            Projets
          </Button>

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