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


        <div class="flex items-center justify-center py-40 h-">
            <div class="relative  ">

                <div class="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-slate-400 bg-gray-700 to-blue-400 shadow-lg animate-pulse">

                </div>
                <div id="form-container"
                    class="bg-white p-16 rounded-lg shadow-2xl w-96 relative z-10 transform transition duration-500 ease-in-out ">
                    <h2 id="form-title"
                        class="text-center text-3xl font-bold mb-10 text-gray-800">
                        Inicio de Sesion
                    </h2>
                    <form class="space-y-5" onSubmit={handleSubmit}>
                        <input class="w-full h-12 border border-gray-800 px-3 rounded-lg"
                            placeholder="Email"
                            id=""
                            name=""
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            type="email" />

                        <input class="w-full h-12 border border-gray-800 px-3 rounded-lg"
                            placeholder="Contraseña"
                            id=""
                            name=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" />
                        <button
                            class="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Iniciar Sesion
                        </button>
                        <a
                            class="text-blue-500 hover:text-blue-800 text-sm"
                            href="#">
                            Olvidaste tu contraseña?
                        </a>
                    </form>
                </div>
            </div>
        </div>





    );
}