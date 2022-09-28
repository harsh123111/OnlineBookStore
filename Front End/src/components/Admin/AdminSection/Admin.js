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
import AdminModal from './AdminModal';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { TextField } from '@mui/material';
import { getAdmins, updateAdmin } from '../../../services/AdminService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';

const Admin = () => {
    const mdTheme = createTheme();
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [admins, setAdmins] = React.useState([])
    const [adminsCopy, setAdminsCopy] = React.useState([])
    const admin = JSON.parse(localStorage.getItem("admin"))
    const handleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const onUpdate = (row) => {
          Swal.fire({
            text: 'Select the acces',
            input: 'select',
            inputOptions: {
                1: 'Full Access',
                2: 'View Only'
            },
            confirmButtonText:"Save",
            confirmButtonColor: '#581845'
          }).then(res => {
            if (res.isConfirmed) {
                updateAdmin(row.adminId, parseInt(res.value), false).then(result => {
                    Swal.fire({
                        icon: 'success',
                        title: 'success',
                        text: `Admin updated successfully!`,
                        confirmButtonColor: '#581845',
                    }).then(() => getAdminData())
                }).catch(err => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Failed to update admin!',
                        confirmButtonColor: '#581845'
                    })
                })
            }
          })
    }

    const onDelete = (row) => {
        updateAdmin(row.adminId, row.accessibilityId, true).then(result => {
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: `Admin deleted successfully!`,
                confirmButtonColor: '#581845',
            }).then(() => getAdminData())
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete admin!',
                confirmButtonColor: '#581845'
            })
        })
    }

    const getAdminData = () => {
        getAdmins().then(res => {
            setAdmins(res.data)
            setAdminsCopy(res.data)
        })
    }

    const onSearch = (e) => {
        const temp = admins.filter(x => 
        x.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
        x.lastName.toLowerCase().includes(e.target.value.toLowerCase()))
        setAdmins(temp)
    }

    React.useEffect(() => {
        getAdminData()
    }, [])
    return ( 
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar title="Admins" />
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
                                            label="Search Admin"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            onChange={onSearch}
                                        />
                                    </Grid>
                                    {admin.accessibilityId === 1 ? <Button
                                        style={{ backgroundColor: '#581845' }}
                                        type="button"
                                        onClick={handleModal}
                                        variant="contained"
                                    >
                                        <AddCircleOutlineIcon />
                                        &nbsp;Add Admin
                                    </Button> : null}
                                </Grid>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Email</TableCell>
                                                <TableCell>Access</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {admins.map((row, i) => (
                                                <TableRow key={row.categoryId}>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{`${row.firstName} ${row.lastName}`}</TableCell>
                                                    <TableCell>{row.email}</TableCell>
                                                    <TableCell>{row.access}</TableCell>
                                                    <TableCell>
                                                    {admin.accessibilityId === 1 ? <Button
                                                        type="button"
                                                        onClick={() => onUpdate(row)}
                                                        variant="outlined" 
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </Button> : null}&nbsp;
                                                    {admin.accessibilityId === 1 ? <Button
                                                        type="button"
                                                        onClick={() => onDelete(row)}
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
           <AdminModal isOpen={isModalOpen} handleModal={handleModal} callback={getAdminData}/> 
        </ThemeProvider> 
    )
}

export default Admin