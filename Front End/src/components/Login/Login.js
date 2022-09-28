
import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Link, useHistory, useParams } from 'react-router-dom';
import { login } from '../../services/UsersService';
import Swal from 'sweetalert2';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
const Login = () => {
  
  const { type } = useParams();
  const history = useHistory();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateCaptcha(document.getElementById("captcha").value)) {
      Swal.fire({
        title: 'Failed',
        text: 'Invalid Captcha.',
        icon: 'error',
        confirmButtonColor: '#581845'
      })
      return 
    }

    const data = new FormData(event.currentTarget);
    
    login(data.get('email'), window.btoa(data.get('password')), type === "user" ? "user" : "admin").then(res => {
      if (res.data.length) {
        if(type === "user") {
          localStorage.setItem("user",  JSON.stringify(res.data[0]))
          history.push("/");
        } else {
          localStorage.setItem("admin",  JSON.stringify(res.data[0]))
          window.location.href = "/admin/dashboard";
        }
      } else {
        Swal.fire({
          title: 'Failed',
          text: 'Incorrect email and password',
          icon: 'error',
          confirmButtonColor: '#581845'
        })
      }
    })
  };

  React.useEffect(() => {
    if (type === "user" && localStorage.getItem("user")) {
      window.location.href = "/"
    } else if (type === "a" && localStorage.getItem("admin")){
      window.location.href = "/admin/dashboard"
    }
    loadCaptchaEnginge(6); 
  }, [])

  return (
    <Grid  alignItems="center" justifyContent="center" padding="10% 10% 10% 30%">
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }} >
          <Typography component="h1" variant="h5"> Sign in ({type === "user" ? "User" : "Admin"}) </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField margin="normal" type="email" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
            <TextField margin="normal" type="text" required fullWidth id="captcha" label="Enter the captcha here." />
            <LoadCanvasTemplate />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}  style={{backgroundColor:'#581845'}}>
              Sign In
            </Button>
            {type !== 'a' && <Grid container>
              <Grid item xs>
                <Link to="/forgot-password" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link to="/sign-up" variant="body2">
                  Don't have an account? Sign Up
                </Link>
              </Grid>
            </Grid>}
          </Box>
        </Box>
        </Grid>
  );
}

export default Login