import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SingIn from '../components/SignIn.jsx';
import { auth, db } from '../configs.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";

import { useState } from 'react'

const defaultTheme = createTheme();

export default function SignUp() {


    const [mail, setMail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')

    const navigate = useNavigate();


    const handleSubmit = (event) => {
        event.preventDefault();

        if (!mail || !password1 || !password2 || !nombre || !apellido) {
            console.log("Completa todos los campos para registrarte");
            return;
            //TODO: hacer validacion e informar campo que falta registrar
        }

        if (!password1.match(password2)) {
            console.log("Las contrasenias NO coinciden");
            return;
        }
        console.log("Las contrasenias SI coinciden");
        //aca enviar el usuario a firebase para registrarse

        createUserWithEmailAndPassword(auth, mail, password1)
            .then((userCredential) => {
                console.log("Credenciales " + JSON.stringify(userCredential));
                //setuser 



                navigate('/inicio-sesion');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error ' + errorCode + ' ' + errorMessage);
                // console.log(JSON.stringify(error));
            });

    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        {/* <LockOutlinedIcon /> */}
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Registrarse!
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="given-name"
                                    name="firstName"
                                    required
                                    fullWidth
                                    id="firstName"
                                    label="Nombre"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    required
                                    fullWidth
                                    id="lastName"
                                    label="Apellido"
                                    name="lastName"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email"
                                    name="email"
                                    value={mail}
                                    onChange={(e) => setMail(e.target.value)}
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={password1}
                                    onChange={(e) => setPassword1(e.target.value)}
                                    required
                                    fullWidth
                                    label="Contraseña"
                                    type="password"
                                    id="password1"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={password2}
                                    onChange={(e) => setPassword2(e.target.value)}
                                    required
                                    fullWidth
                                    label="Repita su contraseña"
                                    type="password"
                                    id="password2"
                                    autoComplete="new-password"
                                />
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}>
                            Registrarse
                        </Button>
                        <Grid container justifyContent="center">
                            <Grid item>
                                <Link href='/inicio-sesion' variant="body2" >
                                    Ya tenes una cuenta? Inicie sesion aqui
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                {/* <Copyright sx={{ mt: 5 }} /> */}
            </Container>
        </ThemeProvider >
    );
}