import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { createCategory, updateCategory } from '../../../services/CategoryService';
import Swal from 'sweetalert2';

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

const CategoriesModal = ({ isOpen, handleModal, callback, modalData }) => {
    const [categoryName, setCategoryName] = React.useState("")

    const onSave = () => {
        const api = modalData.type === 'add' ? createCategory(categoryName) : updateCategory(modalData.data.categoryId, categoryName)
        api.then(res => {
            handleModal()
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: `Category ${modalData.type === 'add' ? 'created' : 'updated'} successfully!`,
                confirmButtonColor: '#581845',
            }).then(() => {
                callback()
            })
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to create category!',
                confirmButtonColor: '#581845'
            })
        })
    }

    React.useEffect(() => {
        if (modalData) {
            if (modalData.type === 'add') {
                setCategoryName('')
            } else {
                setCategoryName(modalData?.data?.name)
            }
        }
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
                            Add Category
                        </Typography>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <TextField
                                    required
                                    id="categoryName"
                                    name="categoryName"
                                    label="Category Name"
                                    fullWidth
                                    autoComplete="given-name"
                                    variant="standard"
                                    defaultValue={categoryName}
                                    onChange={(e) => setCategoryName(e.target.value)}
                                />
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
                                    onClick={onSave}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Box>
            </Modal>
        </div>
    );
}

export default CategoriesModal