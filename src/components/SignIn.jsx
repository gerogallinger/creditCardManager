import * as React from 'react';
import { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
//import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { auth } from '../configs.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';






export default function SignIn() {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        setMail(data.get('email'))
        setPassword(data.get('password'))
        //  = data.get('password')
        console.log({
            email: mail,
            password: password
        });
        try {
            createUserWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    alert('Usuario enviado a Firebase')
                    setMail('')
                    setPassword('')
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Error ' + errorCode + ' ' + errorMessage);
                });
            alert('Usuario enviado a Firebase')

        } catch (e) {
            console.log('Error ' + e);
        }
        console.log('Usuario logueado');

    };
    const defaultTheme = createTheme();


    const redirigir = (e) => {
        e.preventDefault() //evita el comportamiento por defecto del formulario 


        navigate('/registrador')

    }

    return (
        <div >
            <div component="main" maxWidth="xs">

                <div
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    {/* Aca poner un icono de una persona */}
                    <span component="h1" variant="h5">
                        Iniciar Sesion!
                    </span>
                    <div className='container'>

                        <form component="form" onSubmit={redirigir} noValidate sx={{ mt: 1 }}>
                            <input
                                value={mail}
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                autoComplete="email"
                                autoFocus />
                            <input
                                value={password}
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Contraseña"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                            <input
                                type='checkbox'
                                label="Recordarme" />
                            <input
                                type="submit"
                                fullWidth
                                variant="contained"
                                value="Iniciar Sesion"
                                sx={{ mt: 3, mb: 2 }}
                            />

                        </form>
                    </div>
                    <div >
                        <div >
                            <a href="#" variant="body2">
                                Olvidaste tu constraseña?
                            </a>
                        </div>
                        <div >
                            <a href="/crear-usuario" variant="body2">
                                {"No tienes una cuenta? Crear una"}
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}