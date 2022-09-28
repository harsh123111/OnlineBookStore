import * as React from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DashboardNavbar from '../DashboardNavbar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Swal from 'sweetalert2';
import { updateAdminProfile } from '../../../services/UsersService';

const UserProfile = () => {
    const mdTheme = createTheme();
    const [admin, setAdmin] = React.useState(JSON.parse(localStorage.getItem("admin")))
    const [profileImg, setProfileImg] = React.useState(admin.img)

    const handleUploadClick = event => {
        console.log();
        var file = event.target.files[0];
        const reader = new FileReader();
        var url = reader.readAsDataURL(file);

        reader.onloadend = function (e) {
            setProfileImg(reader.result)
        }.bind(this);
      
    };

    const updateProfile = (reqObj) => {
        updateAdminProfile(reqObj).then(res => {
            Swal.fire({
                icon: 'Success',
                title: 'Success', 
                text: `Profile updated successfully!`,
                confirmButtonColor: '#581845',
            }).then(x => {
                localStorage.setItem("admin", JSON.stringify(res.data[0]))
            })
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Error', 
                text: `Failed to update profile!`,
                confirmButtonColor: '#581845',
            })
        }) 
    }

    const onUpdate = (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const oldPass = data.get("oldPassword")
        const newPass = data.get("newPassword")
        const confirmPass =  data.get("confirmPassword")

        const reqObj = {
            profile: profileImg,
            email: data.get("email"),
            lastName: data.get("lastName"),
            firstName: data.get("firstName"),
            adminId: admin.adminId
        }

        if (!oldPass.length && !newPass.length && !confirmPass.length) {
            updateProfile(reqObj)
        } else {
            if (window.btoa(oldPass) !== admin.password) {
                Swal.fire({
                    type: "warning",
                    title: 'Warning', 
                    text: `Incorrect old password.`,
                    confirmButtonColor: '#581845',
                })
                return
            }
            if (!newPass.length || !confirmPass.length) {
                Swal.fire({
                    icon: 'Warning',
                    title: 'Warning',
                    text: `Please enter new password and confirm password`,
                    confirmButtonColor: '#581845',
                })
                return
            }
            if (newPass !== confirmPass) {
                Swal.fire({
                    icon: 'Warning',
                    title: 'Warning',
                    text: `Password does not match!`,
                    confirmButtonColor: '#581845',
                })
                return
            }
            reqObj["password"] = window.btoa(confirmPass)
            updateProfile(reqObj)
        }
    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <DashboardNavbar title="Profile" />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} >
                                <Paper
                                    sx={{
                                        p: 2,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '320px',
                                        backgroundImage: "url('https://images.unsplash.com/photo-1577985051167-0d49eec21977?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1789&q=80')",
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover"
                                    }}
                                >
                                    <input
                                        accept="image/*"
                                        id="contained-button-file"
                                        type="file"
                                        hidden
                                        onChange={handleUploadClick}
                                    />
                                    <label htmlFor="contained-button-file">
                                        <Avatar src={profileImg} sx={{ width: "300px", height: "280px" }} />
                                    </label>
                                </Paper>
                            </Grid>
                            <Grid item xs={12} >
                                <form onSubmit={onUpdate}>
                                    <Grid container spacing={5}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                value={admin.firstName}
                                                onChange={e => setAdmin({...admin, firstName : e.target.value})}
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
                                                value={admin.lastName}
                                                onChange={e => setAdmin({...admin, lastName : e.target.value})}
                                                id="lastName"
                                                name="lastName"
                                                label="Last name"
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="email"
                                                value={admin.email}
                                                onChange={e => setAdmin({...admin, email : e.target.value})}
                                                required
                                                id="email"
                                                name="email"
                                                label="Email"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="password"
                                                id="oldPassword"
                                                name="oldPassword"
                                                label="Old Password"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="password"
                                                id="newPassword"
                                                name="newPassword"
                                                label="New Password"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                type="password"
                                                id="confirmPassword"
                                                name="confirmPassword"
                                                label="Confirm Password"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <Button
                                                style={{ backgroundColor: '#581845' }}
                                                type="submit"
                                                fullWidth
                                                variant="contained"
                                            >
                                                Update Profile
                                            </Button>
                                        </Grid>
                                    </Grid>
                                </form>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    )
}

export default UserProfile