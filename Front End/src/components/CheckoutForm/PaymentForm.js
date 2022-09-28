import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

export default function PaymentForm({ bookingDetails, onSubmit }) {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <form onSubmit={onSubmit} >
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardName"
              defaultValue={bookingDetails?.payment?.cardName}
              name="cardName"
              label="Name on card"
              fullWidth
              autoComplete="cc-name"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cardNumber"
              type="number"
              onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,12)
              }}
              onBlur = {e => {
                if (e.target.value.length < 12) {
                  alert("Please enter valid card number.")
                  e.target.value = ''
                }
              }}
              defaultValue={bookingDetails?.payment?.cardNumber}
              name="cardNumber"
              label="Card number"
              fullWidth
              autoComplete="cc-number"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="expDate"
              defaultValue={bookingDetails?.payment?.expDate}
              name="expDate"
              label="Expiry date"
              fullWidth
              autoComplete="cc-exp"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              required
              id="cvv"
              type="number"
              onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,3)
              }}
              onBlur = {e => {
                if (e.target.value.length < 3) {
                  alert("Please enter valid cvv.")
                  e.target.value = ''
                }
              }}
              defaultValue={bookingDetails?.payment?.cvv}
              name="cvv"
              label="CVV"
              helperText="Last three digits on signature strip"
              fullWidth
              autoComplete="cc-csc"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="end" >
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 3, ml: 1 }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </form>
    </React.Fragment>
  );
}