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
import Button from '@mui/material/Button';
import { deleteFeedback, getFeedbacks } from '../../../services/FeedbackService';
import Swal from 'sweetalert2';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Feedback = () => {
    const mdTheme = createTheme();
    const [feedbacks, setFeedbacks] = React.useState([])
    const [feedbacksCopy, setFeedbacksCopy] = React.useState([])
    const admin = JSON.parse(localStorage.getItem("admin"))

    const getFeedbackData = () => {
        getFeedbacks().then(res => {
            setFeedbacks(res.data)
            setFeedbacksCopy(res.data)
        })
    }

    const onSearch = (e) => {
        const temp = feedbacksCopy.filter(x => 
            x.userName.toLowerCase().includes(e.target.value.toLowerCase())
        )
        setFeedbacks(temp)
    }

    const onDelete = (id) => {
        deleteFeedback(id).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: 'Feedback deleted successfully!',
                confirmButtonColor: '#581845',
            }).then(() => {
                getFeedbackData()
            }) 
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete feedback!',
                confirmButtonColor: '#581845'
            })
        })
    }

    React.useEffect(() => {
        getFeedbackData();
    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar title="Feedbacks" />
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
                                            label="Search by user"
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
                                                <TableCell>Feedback</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {feedbacks.map((row, i) => (
                                                <TableRow key={row.id}>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{row.userName}</TableCell>
                                                    <TableCell>{row.feedback}</TableCell>
                                                    <TableCell>
                                                        {admin.accessibilityId === 1 ? <Button
                                                            type="button"
                                                            onClick={() => onDelete(row.feedbackId)}
                                                            variant="outlined"
                                                            color="error"
                                                        >
                                                        <DeleteForeverIcon />
                                                    </Button> : '-'}
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
        </ThemeProvider> 
    )
}

export default Feedback