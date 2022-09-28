import * as React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Grid from '@mui/material/Grid';
import { getCart } from '../../services/CartService';
import Button from '@mui/material/Button';

export default function Review({ onSubmit, bookingDetails }) {
  const [products, setProducts] = React.useState(getCart())
  const [user] = React.useState(JSON.parse(localStorage.getItem("user")))

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        <Grid style={{maxHeight: '200px', overflowY: 'auto', px: "2"}} >
          {products.map((product) => (
            <ListItem key={product.bookName} >
              <ListItemText primary={product.bookName} secondary={`${product.price} Rs x ${product.quantity}`} />
              <Typography variant="body2"> {product.price * product.quantity} Rs. </Typography>
            </ListItem>
          ))}
        </Grid>
        <ListItem >
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
            {products.map(x => x.price * x.quantity).reduce((a, b)=> a + b)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Shipping
          </Typography>
          <Typography gutterBottom>{user.firstName} {user.lastName}</Typography>
          <Typography gutterBottom>
            {bookingDetails?.address?.address}, {bookingDetails?.address?.city}, <br/>
            {bookingDetails?.address?.state}, {bookingDetails?.address?.country}, <br/>
            {bookingDetails?.address?.zip}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={8}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment key={bookingDetails?.payment?.cardName}>
                <Grid item xs={6}>
                  <Typography gutterBottom>Name : {bookingDetails?.payment?.cardName}</Typography>
                  <Typography gutterBottom>Card : {bookingDetails?.payment?.cardNumber?.replace(/\d{4}$/, '****')}</Typography>
                  <Typography gutterBottom>Exp. Date : {bookingDetails?.payment?.expDate}</Typography>
                </Grid>
              </React.Fragment>
          </Grid>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="end" >
            <Button
              variant="contained"
              onClick={onSubmit}
              sx={{ mt: 3, ml: 1 }}
            >
              Next
            </Button>
          </Grid>
      </Grid>
    </React.Fragment>
  );
}