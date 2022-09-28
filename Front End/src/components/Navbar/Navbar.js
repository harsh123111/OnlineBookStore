import React from 'react';
import { AppBar, Toolbar, IconButton, Badge, Typography } from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../assets/logo1.jpg';
import useStyles from './styles';
import Swal from 'sweetalert2';

const Navbar = ({ totalItems }) => {
  const classes = useStyles();
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem('user'))

  const onLogout = () => {
    localStorage.clear()
    window.location.href = "/"
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar} color="inherit">
        <Toolbar>
          <Typography component={Link} to="/" variant="h5" className={classes.title} color="inherit">
            <img src={logo} alt="Book Store App" height="50px" className={classes.image} />
            <strong >BookMyBook.com</strong>
          </Typography>
          <div className={classes.grow} />
          <div className={classes.button}>
            <Typography component={Link} to="/" variant="h6" className={classes.title} color="inherit">
              <span className={classes.link}>Home</span> &nbsp;&nbsp;
            </Typography>
          </div>
          {!user && <div className={classes.button}>
            <Typography component={Link} to="/login/user" variant="h6" className={classes.title} color="inherit">
              <span className={classes.link}>Login</span>
            </Typography>
          </div>}
          {user && <div className={classes.button}>
            <Typography component={Link} to="/user-bookings" variant="h6" className={classes.title} color="inherit">
              <span className={classes.link}>Bookings</span>
            </Typography>
          </div>}
          {user && <div className={classes.button}>
            <Typography variant="h6" className={classes.title} color="inherit">
              <span className={classes.link} onClick={onLogout}>Logout</span>
            </Typography>
          </div>}
          <div className={classes.button}>
            <Typography component={Link} to="/login/a" variant="h6" className={classes.title} color="inherit">
              <span className={classes.link}>Admin</span>
            </Typography>
          </div>
          {!location.pathname.includes('admin') && (
            <div className={classes.button}>
              <span className={classes.link}>
                <IconButton component={Link} to="/cart" aria-label="Show cart items" color="inherit">
                  <Badge badgeContent={totalItems} color="secondary">
                    <ShoppingCart />
                  </Badge>
                </IconButton>
              </span>
            </div>
          )}
        </Toolbar>
      </AppBar>

    </div>
  )
}

export default Navbar
