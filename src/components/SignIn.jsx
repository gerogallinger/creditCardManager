import * as React from 'react';
import { useState } from 'react'

import { auth, provider, db } from '../configs.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';
import { doc, setDoc, collection, getDocs } from "firebase/firestore";





export default function SignIn() {

    const [mail, setMail] = useState('')
    const [password, setPassword] = useState('')

    const navigate = useNavigate();


    const handleSubmit = async (event) => {
        event.preventDefault();



        if (mail && password) {      // Inicio de sesión con correo electrónico y contraseña      
            if (!mail || !password) {
                console.log("Please enter your username and password.");
                //TODO: hacer un popup para que muestre que debe ingresar alguno de los 2 campos
                return;
            }
            try {
                await auth.signInWithEmailAndPassword(mail, password);

                const userToFirebase = {
                    mail: mail
                }

                console.log("Usuario identificado por mail" + JSON.stringify({
                    email: mail,
                    password: password
                }));


                setMail('')
                setPassword('')
                navigate('/option-list');
                // Aquí puedes manejar lo que sucede después del inicio de sesión      
            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error ' + errorCode + ' ' + errorMessage);
            }
        } else {
            // Inicio de sesión con Google      

            try {
                signInWithPopup(auth, provider).then((data) => {
                    console.log(JSON.stringify(data.user));

                    sendUserDataFirebase(data.user)
                    console.log("id:" + data.user.uid);

                    localStorage.setItem("uid", data.user.uid)


                    navigate('/option-list');
                })





            } catch (error) {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error ' + errorCode + ' ' + errorMessage);
            }
        }
    };


    async function sendUserDataFirebase(user) {

        const userToFirebase = {
            mail: user.email,
            name: user.displayName,
            mailVerified: user.emailVerified
        }

        try {
            const userRef = doc(db, 'users', user.uid);
            await setDoc(userRef, userToFirebase);
            console.log('Usuario agregado correctamente a Firestore');
        } catch (error) {
            console.error('Error al agregar usuario a Firestore:', error);
            throw error;
        }
    }
    // const SignInGoogle = () => {

    //     signInWithPopup(auth, provider).then((data) => {
    //         console.log(JSON.stringify(data.user));

    //         localStorage.setItem("uid", data.user.uid)

    //         console.log("id: " + data.user.uid);


    //     })
    // }



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
                        <div>

                            <button
                                style={{
                                    display: "flex", alignItems: "center", borderRadius: "4px",
                                    width: "256px", backgroundColor: "#ffffff", color: "#000000",
                                    padding: "10px", boxShadow: "rgba(0, 0, 0, 0.25) 1px 2px 8px 0px",
                                    cursor: "pointer",
                                }}
                            // onClick={SignInGoogle}
                            >
                                <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google Logo" className="w-5 h-5 mr-2" />
                                Iniciar sesión con Google
                            </button>

                        </div>
                        <div className='flex flex-col text-end'>
                            <a
                                className="text-blue-500 hover:text-blue-800 text-sm"
                                href="#">
                                Olvidaste tu contraseña?
                            </a>
                            <a
                                className="text-blue-500 hover:text-blue-800 text-sm"
                                href="/singup">
                                Crear una cuenta
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>





    );
}