import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { getBookings } from '../../services/BookingsService';
const theme = createTheme();

const UserBookings = () => {
    const [bookings, setBookings] = React.useState([])
    const [user] = React.useState(JSON.parse(localStorage.getItem("user")))

    const getBookingsData = () => {
        getBookings().then(res => {
            setBookings(res.data.filter(x => x.userId === user.userId))
        })
    }

    React.useEffect(() => {
        getBookingsData();
    }, [])

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container component="main" maxWidth="lg" sx={{ my: 4 }}>
                <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h3" variant="h4" align="center">
                        Bookings
                    </Typography>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Book Name</TableCell>
                                <TableCell>Rating</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookings.map((row, i) => (
                                <TableRow key={row.id}>
                                    <TableCell>{i + 1}</TableCell>
                                    <TableCell>{row.bookName}</TableCell>
                                    <TableCell>{row.rating}</TableCell>
                                    <TableCell>{row.quantity}</TableCell>
                                    <TableCell>{row.bookingAddress}</TableCell>
                                    <TableCell>{row.amount}</TableCell>
                                    <TableCell>{row.bookingDate}</TableCell>
                                    <TableCell>Paid</TableCell>
                                    
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Container>
        </ThemeProvider>
    );
}
export default UserBookings