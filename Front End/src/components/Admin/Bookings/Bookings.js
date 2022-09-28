import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DashboardNavbar from '../DashboardNavbar';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TextField } from '@mui/material';
import { getBookings } from '../../../services/BookingsService';

const Bookings = () => {
    const mdTheme = createTheme();
    const [bookings, setBookings] = React.useState([])
    const [bookingsCopy, setBookingsCopy] = React.useState([])

    const getBookingsData = () => {
        getBookings().then(res => {
            setBookings(res.data)
            setBookingsCopy(res.data)
        })
    }

    const onSearch = (e) => {
        const temp = bookingsCopy.filter(x => 
            x.bookName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            x.userName.toLowerCase().includes(e.target.value.toLowerCase())    
        )
        setBookings(temp)
    }

    React.useEffect(() => {
        getBookingsData();
    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar title="Bookings" />
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
                        <Grid item xs={12}>
                        <Grid item xs={12} display="flex" sx={{ mb: 2 }} justifyContent="space-between">
                                    <Grid item xs={12} sm={3} sx={{ ml: 2 }}>
                                        <TextField
                                            id="search" 
                                            name="search"
                                            label="Search by user or book"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            onChange={onSearch}
                                        />
                                    </Grid>
                                </Grid>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>User</TableCell>
                                                <TableCell>Book Name</TableCell>
                                                <TableCell>Rating</TableCell>
                                                <TableCell>Address</TableCell>
                                                <TableCell>Amount</TableCell>
                                                <TableCell>Date</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {bookings.map((row, i) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{row.userName}</TableCell>
                                                    <TableCell>{row.bookName}</TableCell>
                                                    <TableCell>{row.rating}</TableCell>
                                                    <TableCell>{row.bookingAddress}</TableCell>
                                                    <TableCell>{row.amount}</TableCell>
                                                    <TableCell>{row.bookingDate}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </Paper>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider> 
    )
}

export default Bookings