import * as React from 'react';
import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import MainListItems, {  } from './listItems';
import logo from '../../assets/logo1.jpg';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link, Redirect, useHistory } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#581845',
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
      '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
        boxSizing: 'border-box',
        ...(!open && {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        }),
      },
    }),
  );

const DashboardNavbar = ({title}) => {
    const [open, setOpen] = React.useState(true);
    const history = useHistory();
    const [redirect, setRedirect] = React.useState()
    const toggleDrawer = () => {
        setOpen(!open);
    }; 

    const onClickProfile = () => {
        history.push('/admin/profile')
    }

    const onLogout = () => {
        localStorage.clear()
        window.location.href = "/"
    }

    React.useEffect(() => {
        if (!localStorage.getItem("admin")) {
            setRedirect("/login/a")
        } 
    }, [])

    if (redirect) {
        return <Redirect to={redirect} />
    } 
    return (
        <React.Fragment>
            <AppBar position="fixed" open={open}>
                <Toolbar
                    sx={{
                        pr: '24px', // keep right padding when drawer closed
                    }}
                >

                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={toggleDrawer}
                        sx={{
                            marginRight: '36px',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        sx={{ flexGrow: 1 }}
                    >
                        {title}
                    </Typography>
                    <IconButton color="inherit" onClick={() => window.location.href = "/"}>
                        <Badge color="secondary">
                            <h6 style={{marginTop: '7px'}}>Go to site</h6>
                        </Badge>
                    </IconButton>
                    <IconButton color="inherit" onClick={onClickProfile}>
                        <Badge color="secondary">
                            <AccountCircleIcon />
                        </Badge>
                    </IconButton>&nbsp;
                    <IconButton color="inherit" onClick={onLogout}>
                        <Badge color="secondary">
                            <LogoutIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <Toolbar
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    }}
                >
                    <Typography component={Link} to="/" variant="span" color="inherit">
                        <img src={logo} alt="Book Store App" height="50px" />&nbsp;
                        <strong >BookMyBook.com</strong>
                    </Typography>
                    <IconButton onClick={toggleDrawer}>
                        <ChevronLeftIcon />
                    </IconButton>
                </Toolbar>
                <Divider />
                <List component="nav" className="my-5">
                    <MainListItems />
                </List>
                <Divider sx={{ my: 1 }} />
            </Drawer>
        </React.Fragment>
    )
}

export default DashboardNavbar