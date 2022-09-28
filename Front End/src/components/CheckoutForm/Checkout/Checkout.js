import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddressForm from '../AddressForm';
import PaymentForm from '../PaymentForm';
import Review from '../Review';
import { addStoreBooking } from '../../../services/BookingsService';
import { getCart, updateCart } from '../../../services/CartService';
import TextField from '@mui/material/TextField';
import star from '../../../assets/star.png';
import eStar from '../../../assets/emptyStar.png';
import Rating from 'react-rating';
import Grid from '@mui/material/Grid';
import { useHistory } from 'react-router-dom';
import { addFeedback } from '../../../services/FeedbackService';
const theme = createTheme();

const Checkout = ({ refreshCart }) => {

  const [activeStep, setActiveStep] = React.useState(0);
  const [bookingDetails, setBookingDetails] = React.useState({})
  const steps = ['Shipping address', 'Payment details', 'Review your order'];
  const [user] = React.useState(JSON.parse(localStorage.getItem("user")))
  const [rating, setRating] = React.useState(0)
  const [feedback, setFeedback] = React.useState("")
  const history = useHistory()

  const onSubmitAddress = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget);
    bookingDetails["address"] = {
      address: data.get("address"),
      city: data.get("city"),
      state: data.get("state"),
      country: data.get("country"),
      zip: data.get("zip")
    }
    handleNext()
  }

  const onSubmitPayment = (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    bookingDetails["payment"] = {
      cardName: data.get("cardName"),
      cardNumber: data.get("cardNumber"),
      expDate: data.get("expDate"),
      cvv: data.get("cvv")
    }
    handleNext()
  }

  const goToBookings = () => {
    history.push("/user-bookings")
  }

  const onSubmitReview = () => {
    const callStack = []
    const address = `${bookingDetails?.address?.address}, ${bookingDetails?.address?.city}
    ${bookingDetails?.address?.state}, ${bookingDetails?.address?.country}, ${bookingDetails?.address?.zip}`
    const total = getCart().map(x => x.price * x.quantity).reduce((a, b) => a + b)
    const token = Math.random().toString(36).substr(2) + Math.random().toString(36).substr(2)

    getCart().forEach(x => {
      callStack.push(
        addStoreBooking(user.userId, x.bookId, address, total, token, x.quantity, rating)
      )
    })

    Promise.all(callStack).then(res => {
      updateCart([])
      refreshCart()
      if (feedback.length) {
        addFeedback(user.userId, feedback).then(res => {
          goToBookings()
        })
      } else {
        goToBookings()
      }
    })
  }

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AddressForm bookingDetails={bookingDetails} onSubmit={onSubmitAddress} />;
      case 1:
        return <PaymentForm bookingDetails={bookingDetails} onSubmit={onSubmitPayment} />;
      case 2:
        return <Review bookingDetails={bookingDetails} onSubmit={handleNext} />;
      default:
        throw new Error('Unknown step');
    }
  }

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="md" sx={{ my: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order
                  confirmation, and will send you an update when your order has
                  shipped.
                </Typography><br/><br/>
                <Grid item xs={12} display="flex" justifyContent="center">
                  <label>Please rate us!</label>&nbsp;&nbsp;
                  <Rating
                    initialRating={rating}
                    emptySymbol={<img alt="rat" src={eStar} className="icon" />}
                    fullSymbol={<img alt="rat" src={star} className="icon" />}
                    onChange={e => setRating(e)}
                  />
                </Grid><br/><br/>
                <Grid item xs={12}>
                  <TextField
                    defaultValue={feedback}
                    onChange={e => setFeedback(e.target.value)}
                    label="Feedback"
                    fullWidth
                    autoComplete="shipping address-line1"
                    variant="standard"
                  />
                </Grid>
                <Grid item xs={12} display="flex" justifyContent="end" >
                <Button
                    variant="contained"
                    onClick={onSubmitReview}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Cancel & go to bookings
                  </Button>
                  <Button
                    variant="contained"
                    onClick={onSubmitReview}
                    sx={{ mt: 3, ml: 1 }}
                  >
                    Submit
                  </Button>
                </Grid>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                  {activeStep !== 0 && (
                    <Button style={{ marginTop: '-7%' }} onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                      Back
                    </Button>
                  )}
                </Box>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
export default Checkout