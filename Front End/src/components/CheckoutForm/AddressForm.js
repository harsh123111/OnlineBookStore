import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
export default function AddressForm({ bookingDetails, onSubmit }) {

  const [user] = React.useState(JSON.parse(localStorage.getItem("user")))

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      <form onSubmit={onSubmit} >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              defaultValue={user?.firstName}
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
              defaultValue={user?.lastName}
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
              required
              defaultValue={user?.email}
              id="email"
              name="email"
              label="Email"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              id="address"
              defaultValue={bookingDetails?.address?.address}
              name="address"
              label="Address"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="city"
              defaultValue={bookingDetails?.address?.city}
              name="city"
              label="City"
              fullWidth
              autoComplete="shipping address-level2"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              id="state"
              name="state"
              defaultValue={bookingDetails?.address?.state}
              label="State/Province/Region"
              fullWidth
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              type="number"
              onInput = {(e) =>{
                e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,6)
              }}
              required
              id="zip"
              defaultValue={bookingDetails?.address?.zip}
              name="zip"
              label="Zip / Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              id="country"
              defaultValue={bookingDetails?.address?.country}
              name="country"
              label="Country"
              fullWidth
              autoComplete="shipping country"
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