
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useHistory, useParams } from 'react-router-dom';
import { forgotPassword } from '../../services/UsersService';
import Swal from 'sweetalert2';

const ForgotPassword = () => {
  
  const { type } = useParams();
  const history = useHistory();
  const [isSubmitDisabled, setIsSubmitDisalbed] = React.useState(true)
  const [userDetails, setUserDetails] = React.useState()
  const [answer, setAnswer] = React.useState()
  const [secQ, setSecQ] = React.useState()

  const onSubmit = () => {
    if (userDetails?.answer.toLowerCase() === answer.toLowerCase()) {
        Swal.fire("Succesfully Recover password!", `Your password is ${window.atob(userDetails.password)}.`)
    } else {
        alert("Please enter correct answer")
    }
  }

  const findEmail = (e) => {
    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) {
        alert("Please enter valid email.")
        return
    }
    forgotPassword(e.target.value).then(res => {
        if (res.data.length) {
            setUserDetails(res.data[0])
            setSecQ(res.data[0].securityQuestion)
            setIsSubmitDisalbed(false)
        } else {
            Swal.fire("Error", "Email not found.")
        }
    })
  }

  return (
    <Grid  alignItems="center" justifyContent="center" padding="10% 10% 10% 30%">
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >
          <Typography component="h1" variant="h5"> Forgot Password </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField margin="normal" onBlur={findEmail} type="email" fullWidth label="Email Address" autoComplete="email" />
            <TextField margin="normal" InputLabelProps={{ shrink: true }} readonly value={secQ} fullWidth label="Security question" disabled/>
            <TextField
                value={answer}
                onChange={e => setAnswer(e.target.value)} 
                margin="normal" 
                fullWidth
                name="answer" 
                label="Answer" 
                autoComplete="current-password" />
                <Grid item>
              </Grid>
            <Button type="button" onClick={onSubmit} disabled={isSubmitDisabled} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}  style={{backgroundColor:'#581845'}}>
              <span style={{color:'white'}}>Submit</span>
            </Button>
          </Box>
        </Box>
        </Grid>
  );
}

export default ForgotPassword