import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { getCategories } from '../../../services/CategoryService';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { addBook, updateBook } from '../../../services/BookingsService';
import Swal from 'sweetalert2';
import svg from '../../../assets/svg';
import { getPublishers } from '../../../services/PublisherService';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const BooksModal = ({ isOpen, handleModal, modalData, callback }) => {

    const [selectedCategory, setSelectedCategory] = React.useState()
    const [categories, setCategories] = React.useState([])
    const [selectedPublisher, setSelectedPublisher] = React.useState()
    const [publishers, setPublishers] = React.useState([])
    const [coverImage, setcoverImage] = React.useState()

    const onSubmit = (e) => {
        e.preventDefault();
        if (!selectedCategory) {
            Swal.fire({
                icon: 'warning',
                title: 'Warning',
                text: 'Please select category first',
                confirmButtonColor: '#581845'
            })
            return
        }
        const data = new FormData(e.currentTarget);
        const reqObj = {
            name: data.get("bookName"),
            author: data.get("author"),
            rating: data.get("rating"),
            description: data.get("description"),
            price: data.get("price"),
            categoryId: selectedCategory,
            coverImg: coverImage,
            publisherId: selectedPublisher
        };

        const apiCall = modalData ? updateBook : addBook 
        apiCall(reqObj, modalData?.bookId).then(res => {
            handleModal()
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: `Book ${modalData ? 'updated' : 'created'} successfully!`,
                confirmButtonColor: '#581845',
            }).then(() => {
                setcoverImage()
                setSelectedCategory()
                callback()
            })
        }).catch(err => { 
            handleModal()
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed!',
                confirmButtonColor: '#581845'
            })
        })
    }

    const handleUploadClick = event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setcoverImage(reader.result)
     
        }.bind(this);  
    };

    React.useEffect(() => {
        setcoverImage()
        getCategories().then(res => {
            setCategories(res.data)
        })
        getPublishers().then(res => {
            setPublishers(res.data)
        })
        setSelectedCategory(modalData?.categoryId)
        setSelectedPublisher(modalData?.publisherId)
    }, [modalData])

    
    return (
        <div>
            <Modal
                open={isOpen}
                onClose={handleModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                hideBackdrop
            >
                <Box sx={style}>
                    <React.Fragment>
                        <Typography variant="h6" gutterBottom>
                            Add Book
                        </Typography>
                        <form onSubmit={onSubmit} id="bookForm">
                        <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        defaultValue={modalData?.bookName}
                                        id="bookName"
                                        name="bookName"
                                        label="Book Name"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        defaultValue={modalData?.author}
                                        id="author"
                                        name="author"
                                        label="Author"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        defaultValue={modalData?.description}
                                        id="description"
                                        name="description"
                                        label="Description"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        defaultValue={modalData?.price}
                                        id="price"
                                        name="price"
                                        label="Price"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        type="number"
                                        defaultValue={modalData?.rating}
                                        InputProps={{ inputProps: { min: 1, max: 5 } }}
                                        required
                                        id="rating"
                                        name="rating"
                                        label="Rating"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={6} >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Category</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="category"
                                            name="category"
                                            value={selectedCategory}
                                            onChange={e => { setSelectedCategory(e.target.value) }}
                                            label="Category"
                                        >
                                            {categories.map(x => (
                                                <MenuItem key={x.categoryId} value={x.categoryId}>{x.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={6} >
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Publisher</InputLabel>
                                        <Select
                                            required
                                            labelId="demo-simple-select-label"
                                            id="publisher"
                                            name="publisher"
                                            value={selectedPublisher}
                                            onChange={e => { setSelectedPublisher(e.target.value) }}
                                            label="Category"
                                        >
                                            {publishers.map(x => (
                                                <MenuItem key={x.publisherId} value={x.publisherId}>{x.name}</MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12} >
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        type="file"
                                        hidden
                                        onChange={handleUploadClick}
                                    />
                                    <Grid item xs={6} >
                                        <label htmlFor="contained-button-file">
                                            <img src={modalData?.bookCover || coverImage || svg.upload} style={{  height: "140px", border: "1px solid" }} />
                                        </label>
                                    </Grid>
                                </Grid>
                               
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        style={{ backgroundColor: '#581845' }}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                        onClick={handleModal}
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Button
                                        style={{ backgroundColor: '#581845' }}
                                        type="submit"
                                        fullWidth
                                        variant="contained"
                                    >
                                        Save
                                    </Button>
                                </Grid>
                        </Grid>
                        </form>
                    </React.Fragment>
                </Box>
            </Modal>
        </div>
    );
}

export default BooksModal