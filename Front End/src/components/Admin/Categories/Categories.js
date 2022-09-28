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
import CategoriesModal from './CategoriesModal';
import { TextField } from '@mui/material';
import { deleteCategory, getCategories } from '../../../services/CategoryService';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2'

const Categories = () => {
    const mdTheme = createTheme();
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [categories, setCategories] = React.useState([])
    const [categoriesCopy, setCategoriesCopy] = React.useState([])
    const [modalData, setModalData] = React.useState({})
    const admin = JSON.parse(localStorage.getItem("admin"))

    const handleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const loadCategories = () => {
        getCategories().then(res => {
            setCategories(res.data)
            setCategoriesCopy(res.data)
        })
    }

    const onDelete = (id) => {
        deleteCategory(id).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: 'Category deleted successfully!',
                confirmButtonColor: '#581845',
            }).then(() => {
                loadCategories()
            })
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete category!',
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
        const temp = categoriesCopy.filter(x => x.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setCategories(temp)
    }

    React.useEffect(() => {
        loadCategories()
    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar title="Categories" />
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
                                            label="Search Category"
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
                                        &nbsp;Add Category
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
                                            {categories.map((row, i) => (
                                                <TableRow key={row.categoryId}>
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
                                                        onClick={() => onDelete(row.categoryId)}
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
            <CategoriesModal isOpen={isModalOpen} handleModal={handleModal} callback={loadCategories} modalData={modalData} />
        </ThemeProvider>
    )
}

export default Categories