import * as React from 'react';
import { auth, db } from '../configs.js'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from "firebase/firestore";
import { useState, useEffect } from 'react'
import SimpleSpinner from '../components/miniComponents/simpleSpinner'



export default function SignUp() {


    const [mail, setMail] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [nombre, setNombre] = useState('')
    const [apellido, setApellido] = useState('')
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();


    useEffect(() => {
        //buscamos el user en localstorage para traer los datos
        async function loader() {
            setLoading(true)
            setTimeout(() => {

                setLoading(false)
            }, 1500)

        }

        loader()
    }, []);

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
                navigate('/login');

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log('Error ' + errorCode + ' ' + errorMessage);
                // console.log(JSON.stringify(error));
            });

    };

    return (
        <>
            {loading ? (
                <SimpleSpinner name="Cargando..." />
            ) :
                (
                    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4">
                        <div className="bg-white p-8 rounded shadow-md w-full max-w-md">

                            <div className="flex flex-col items-center">
                                <div className="bg-secondary-main rounded-full p-2 ">
                                    <span class="material-symbols-outlined text-5xl">
                                        person_add
                                    </span>
                                </div>
                                <h1 className="mt-2 text-2xl font-bold">Registrarse</h1>
                            </div>
                            <form onSubmit={handleSubmit} className="mt-3">
                                <div className="grid grid-cols-1 gap-4">
                                    <input
                                        type="text"
                                        name="firstName"
                                        required
                                        placeholder="Nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded  focus:border-primary"
                                    />
                                    <input
                                        type="text"
                                        name="lastName"
                                        required
                                        placeholder="Apellido"
                                        value={apellido}
                                        onChange={(e) => setApellido(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded  focus:border-primary"
                                    />
                                    <input
                                        type="email"
                                        name="lastName"
                                        required
                                        placeholder="Email"
                                        value={mail}
                                        onChange={(e) => setMail(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded  focus:border-primary"
                                    />
                                    <input
                                        type="password"
                                        name="pass1"
                                        required
                                        placeholder="Ingresa la contraseña"
                                        value={password1}
                                        onChange={(e) => setPassword1(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded  focus:border-primary"
                                    />
                                    <input
                                        type="password"
                                        name="pass2"
                                        required
                                        placeholder="Volve a ingresar la contraseña"
                                        value={password2}
                                        onChange={(e) => setPassword2(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded  focus:border-primary"
                                    />

                                </div>
                                <button
                                    type="submit"
                                    className="mt-3 w-full bg-primary text-white p-2 rounded hover:bg-slate-800  bg-gray-600"
                                >
                                    Registrarse
                                </button>
                                <div className="text-center mt-2">
                                    <a href="/login" className="text-blue-500 hover:underline">
                                        ¿Ya tienes una cuenta? Inicia sesión aquí
                                    </a>
                                </div>
                            </form>
                        </div>
                    </div>
                )
            }



        </>

    );
}