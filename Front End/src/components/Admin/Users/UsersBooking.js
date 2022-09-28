import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

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

const UsresBooking = ({ isOpen, handleModal, modalData }) => {

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
                            Bookings
                        </Typography>
                        <Grid container spacing={3}>
                            {modalData.length ? <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                                <Table size="small">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Book Name</TableCell>
                                            <TableCell>Rating</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell>Amount</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {modalData.map((row, i) => (
                                            <TableRow key={row.id}>
                                                <TableCell>{row.bookName}</TableCell>
                                                <TableCell>{row.rating}</TableCell>
                                                <TableCell>{row.quantity}</TableCell>
                                                <TableCell>{row.amount}</TableCell>
                                                <TableCell>{row.bookingDate}</TableCell>
                                                <TableCell>Paid</TableCell>

                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Paper> : null}
                            <Grid item xs={12} >
                                <Button
                                    style={{ backgroundColor: '#581845' }}
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleModal}
                                >
                                    Close
                                </Button>
                            </Grid>
                        </Grid>
                    </React.Fragment>
                </Box>
            </Modal>
        </div>
    );
}

export default UsresBooking