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
import { getUsers } from '../../../services/UsersService';
import Button from '@mui/material/Button';
import { getBookings } from '../../../services/BookingsService';
import UsresBooking from './UsersBooking';
const Users = () => {
    const mdTheme = createTheme();
    const [users, setUsers] = React.useState([])
    const [usersCopy, setUsersCopy] = React.useState([])
    const [isModalOpen, setIsModalOpen] = React.useState(false)
    const [modalData, setModalData] = React.useState([])


    const handleModal = () => {
        setIsModalOpen(!isModalOpen)
    }

    const getUsersData = () => {
        getUsers().then(res => {
            getBookings().then(bookingRes => {
                res.data.map(user => {
                    user.bookings = bookingRes.data.filter(x => x.userId === user.userId)                   
                    user.bookingCount = bookingRes.data.filter(x => x.userId === user.userId).length
                })
                setUsers(res.data)
                setUsersCopy(res.data)
            })
        })
    }

    const onSearch = (e) => {
        const temp = usersCopy.filter(x => 
        x.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        x.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
        setUsers(temp)
    }

    React.useEffect(() => {
        getUsersData();
    }, [])

    const onShowbooking = (row) => {
        handleModal()
        setModalData(row.bookings)
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar title="Users" />
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
                                            label="Search User"
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
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Booking Count</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {users.map((row, i) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                                                    <TableCell>{row.email}</TableCell>
                                                    <TableCell>{row.bookingCount}</TableCell>
                                                    <TableCell>
                                                    <Button
                                                        type="button"
                                                        onClick={() => onShowbooking(row)}
                                                        variant="outlined"
                                                        color="error"
                                                    >
                                                        View Bookings
                                                    </Button> 
                                                    </TableCell>
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
            <UsresBooking isOpen={isModalOpen} handleModal={handleModal} modalData={modalData} />
        </ThemeProvider> 
    )
}

export default Users