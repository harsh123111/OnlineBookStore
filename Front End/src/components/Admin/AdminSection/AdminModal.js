import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { addAdmin } from '../../../services/AdminService';
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

const AdminModal = ({ isOpen, handleModal, callback }) => {
    const [access, setAccess] = React.useState("")

    const onSubmit = (e) => { 
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const reqObj = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email : data.get('email'),
            password : window.btoa(data.get('password')),
            access : parseInt(data.get('access'))
        };
        addAdmin(reqObj).then(res => {
            handleModal()
            Swal.fire({
                icon: 'success',
                title: 'success',
                text: `Admin crated successfully!`,
                confirmButtonColor: '#581845',
            }).then(() => {
                callback()
            })
        }).catch(err => {
            handleModal()
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to create admin!',
                confirmButtonColor: '#581845'
            })
        })
    }

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
                            Add Admin
                        </Typography>
                        <form onSubmit={onSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="firstName"
                                        name="firstName"
                                        label="First name"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        required
                                        id="lastName"
                                        name="lastName"
                                        label="Last name"
                                        fullWidth
                                        autoComplete="family-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        type="email"
                                        required
                                        id="email"
                                        name="email"
                                        label="Email"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        type="password"
                                        id="password"
                                        name="password"
                                        label="Password"
                                        fullWidth
                                        autoComplete="given-name"
                                        variant="standard"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel id="demo-simple-select-label">Access</InputLabel>
                                            <Select
                                            labelId="demo-simple-select-label"
                                            id="access"
                                            name="access"
                                            value={access}
                                            onChange={e => { setAccess(e.target.value)}}
                                            label="Access"
                                            >
                                                <MenuItem value={1}>Full Access</MenuItem>
                                                <MenuItem value={2}>View Only</MenuItem>
                                            </Select>
                                    </FormControl>
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

export default AdminModal