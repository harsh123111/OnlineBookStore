import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Deposits from './Deposits';
import DashboardNavbar from './DashboardNavbar';
import svg from '../../assets/svg'
import { getBookings, getBooks } from '../../services/BookingsService';
import { getUsers } from '../../services/UsersService';
import { getPublishers } from '../../services/PublisherService';
import { getCategories } from '../../services/CategoryService';

const Dashboard = () => {
  const mdTheme = createTheme();
  const [dashbaordData, setDashbaordData] = React.useState({})
  
  const getDashboardData = () => { 
    const totalBook = getBooks();
    const totalBookings = getBookings();
    const totalPublisher = getPublishers();
    const totalUsers = getUsers();
    const totalCategory = getCategories();
    const promises = [
      totalBook,
      totalBookings,
      totalPublisher,
      totalUsers,
      totalCategory
    ];
    Promise.all(promises).then(([book, booking, publisher, users, category]) => {
      setDashbaordData({
        bookCount: book.data.length,
        bookingCount: booking.data.length,
        publisherCount: publisher.data.length,
        usersCount: users.data.length,
        categoryCount: category.data.length
      })
    })
  }

  React.useEffect(() => {
    getDashboardData()
  }, [])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <DashboardNavbar title="Dashboard" />
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <Deposits title="Total Books" svg={svg.books} count={dashbaordData?.bookCount} redirectName="Go to Books" url="/admin/books" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <Deposits title="Total Bookings" svg={svg.bookings} count={dashbaordData?.bookingCount} redirectName="Go to Bookings" url="/admin/bookings" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={4} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <Deposits title="Total Publishers" svg={svg.publisher} count={dashbaordData?.publisherCount} redirectName="Go to Publishers" url="/admin/publisher" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <Deposits title="Total Category" svg={svg.category} count={dashbaordData?.categoryCount} redirectName="Go to Category" url="/admin/categories" />
                </Paper>
              </Grid>
              <Grid item xs={12} md={6} >
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 'auto',
                  }}
                >
                  <Deposits title="Total Users" svg={svg.users} count={dashbaordData?.usersCount} redirectName="Go to Users" url="/admin/users" />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default Dashboard
