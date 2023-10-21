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
import { signInWithEmailAndPassword } from 'firebase/auth';






export default function SignIn() {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();



    const handleSubmit = (event) => {
        event.preventDefault();


        if (!mail || !password) {
            console.log("Please enter your username and password.");
            //TODO: hacer un popup para que muestre que debe ingresar alguno de los 2 campos
            return;
        }


        try {
            signInWithEmailAndPassword(auth, mail, password)
                .then((userCredential) => {
                    // Signed in 
                    //setUser(userCredential.user);
                    console.log("Usuario identificado" + JSON.stringify({
                        email: mail,
                        password: password
                    }));
                    setMail('')
                    setPassword('')
                    navigate('/option-list');
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log('Error ' + errorCode + ' ' + errorMessage);
                });


        } catch (e) {
            console.log('Error ' + e);
        }

    };

    return (


        <div className="flex items-center justify-center py-40 h-">
            <div className="relative  ">

                <div className="absolute -top-2 -left-2 -right-2 -bottom-2 rounded-lg bg-gradient-to-r from-slate-400 bg-gray-700 to-blue-400 shadow-lg animate-pulse">

                </div>
                <div id="form-container"
                    className="bg-white p-16 rounded-lg shadow-2xl w-96 relative z-10 transform transition duration-500 ease-in-out ">
                    <h2 id="form-title"
                        className="text-center text-3xl font-bold mb-10 text-gray-800">
                        Inicio de Sesion
                    </h2>
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <input className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                            placeholder="Email"
                            id="mail"
                            name=""
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            type="email" />

                        <input className="w-full h-12 border border-gray-800 px-3 rounded-lg"
                            placeholder="Contraseña"
                            id="pass"
                            name=""
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password" />
                        <button
                            className="w-full h-12 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Iniciar Sesion
                        </button>
                        <div className='flex flex-col text-end'>

                            <a
                                className="text-blue-500 hover:text-blue-800 text-sm"
                                href="#">
                                Olvidaste tu contraseña?
                            </a>
                            <a
                                className="text-blue-500 hover:text-blue-800 text-sm"
                                href="/crear-usuario">
                                Crear una cuenta
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>





    );
}