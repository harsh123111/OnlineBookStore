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
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PublisherModal from './PublisherModal';
import { TextField } from '@mui/material';
import { deletePublisher, getPublishers } from '../../../services/PublisherService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2'

const Publisher = () => {
    const mdTheme = createTheme();
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [Publisher, setPublisher] = React.useState([])
    const [PublisherCopy, setPublisherCopy] = React.useState([])
    const [modalData, setModalData] = React.useState({})
    const admin = JSON.parse(localStorage.getItem("admin"))
    const handleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const loadPublisher = () => {
        getPublishers().then(res => {
            setPublisher(res.data)
            setPublisherCopy(res.data)
        })
    }

    const onDelete = (id) => {
        deletePublisher(id).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: 'Publisher deleted successfully!',
                confirmButtonColor: '#581845',
            }).then(() => {
                loadPublisher()
            })
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete publisher!',
                confirmButtonColor: '#581845'
            })
        })
    }

    const onAdd = () => {
        setModalData({
            type : 'add'
        })
        handleModal()
    }

    const onUpdate = (row) => {
        setModalData({
            type : 'update',
            data : row
        })
        handleModal()
    }

    const onSearch = (e) => {
        const temp = PublisherCopy.filter(x => x.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setPublisher(temp)
    }

    React.useEffect(() => {
        loadPublisher()
    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar title="Publisher" />
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
                                            label="Search Publisher"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            onChange={onSearch}
                                        />
                                    </Grid>
                                    {admin.accessibilityId === 1 ? <Button
                                        style={{ backgroundColor: '#581845' }}
                                        type="button"
                                        onClick={onAdd}
                                        variant="contained"
                                    >
                                        <AddCircleOutlineIcon />
                                        &nbsp;Add Publisher
                                    </Button> : null}
                                </Grid>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>

                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {Publisher.map((row, i) => (
                                                <TableRow key={row.publisherId}>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{row.name}</TableCell>
                                                    <TableCell>
                                                    {admin.accessibilityId === 1 ? <Button
                                                        type="button"
                                                        onClick={() => onUpdate(row)}
                                                        variant="outlined" 
                                                        color="primary"
                                                    >
                                                        <EditIcon />
                                                    </Button> : null} &nbsp;
                                                    {admin.accessibilityId === 1 ? <Button
                                                        type="button"
                                                        onClick={() => onDelete(row.publisherId)}
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
            <PublisherModal isOpen={isModalOpen} handleModal={handleModal} callback={loadPublisher} modalData={modalData} />
        </ThemeProvider>
    )
}

export default Publisher