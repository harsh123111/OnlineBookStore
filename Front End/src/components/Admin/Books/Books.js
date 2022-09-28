import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import DashboardNavbar from '../DashboardNavbar';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import BooksModal from './BooksModal';
import Button from '@mui/material/Button';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from '@mui/material/TextField';
import { deleteBook, getBooks } from '../../../services/BookingsService';
import star from '../../../assets/star.png';
import eStar from '../../../assets/emptyStar.png';
import Rating from 'react-rating';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Swal from 'sweetalert2';

const Books = () => {
    const mdTheme = createTheme();
    const [isModalOpen, setModalOpen] = React.useState(false)
    const [books, setBooks] = React.useState([])
    const [booksCopy, setBooksCopy] = React.useState([])
    const [modalData, setModalData] = React.useState({})
    const admin = JSON.parse(localStorage.getItem("admin"))
    const handleModal = () => {
        setModalOpen(!isModalOpen)
    }

    const loadBooks = () => {
        getBooks().then(res => {
            setBooks(res.data)
            setBooksCopy(res.data)
        })
    }

    const onUpdate = (row) => {
        setModalData(row)
        handleModal()
    }

    const onDelete = (id) => {
        deleteBook(id).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: 'Book deleted successfully!',
                confirmButtonColor: '#581845',
            }).then(() => {
                loadBooks()
            })
        }).catch(err => { 
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to delete Book!',
                confirmButtonColor: '#581845'
            })
        })
    }
    
    const onSearch = (e) => {
        const temp = booksCopy.filter(x => x.bookName.toLowerCase().includes(e.target.value.toLowerCase()))
        setBooks(temp)
    }

    React.useEffect(() => {
        loadBooks()
    }, [])

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar title="Books" />
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
                                            label="Search Book"
                                            fullWidth
                                            autoComplete="given-name"
                                            variant="standard"
                                            onChange={onSearch}
                                        />
                                    </Grid>
                                    {admin.accessibilityId === 1 ? <Button
                                        style={{ backgroundColor: '#581845' }}
                                        type="button"
                                        onClick={() => {setModalData(); handleModal()}}
                                        variant="contained"
                                    >
                                        <AddCircleOutlineIcon />
                                        &nbsp;Add Book
                                    </Button> : null}
                                </Grid>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Table size="small">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>#</TableCell>
                                                <TableCell>Name</TableCell>
                                                <TableCell>Category</TableCell>
                                                <TableCell>Description</TableCell>
                                                <TableCell>Author</TableCell>
                                                <TableCell>Price</TableCell>
                                                <TableCell>Ratings</TableCell>
                                                <TableCell>Action</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {books.map((row, i) => (
                                                <TableRow key={row.bookId}>
                                                    <TableCell>{i+1}</TableCell>
                                                    <TableCell>{row.bookName}</TableCell>
                                                    <TableCell>{row.categoryName}</TableCell>
                                                    <TableCell>{row.description}</TableCell>
                                                    <TableCell>{row.author}</TableCell>
                                                    <TableCell>{row.price} Rs.</TableCell>
                                                    <TableCell>
                                                    <Rating
                                                        initialRating={row.rating}
                                                        readonly
                                                        emptySymbol={<img alt="rat" src={eStar} className="icon" />}
                                                        fullSymbol={<img alt="rat" src={star} className="icon" />}
                                                    />
                                                    </TableCell>
                                                    <TableCell>
                                                    {admin.accessibilityId === 1 ? <Button
                                                            type="button"
                                                            onClick={() => onUpdate(row)}
                                                            variant="outlined" 
                                                            color="primary"
                                                        >
                                                            <EditIcon />
                                                        </Button>: null} &nbsp; 
                                                        {admin.accessibilityId === 1 ? <Button
                                                            type="button"
                                                            onClick={() => onDelete(row.bookId)}
                                                            variant="outlined"
                                                            color="error"
                                                        >
                                                            <DeleteForeverIcon />
                                                        </Button> : '-' }
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
            <BooksModal isOpen={isModalOpen} handleModal={handleModal} callback={loadBooks} modalData={modalData} />
        </ThemeProvider>
    )
}

export default Books


