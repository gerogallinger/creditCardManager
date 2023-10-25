import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { db } from '../configs'
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';



const ListaOpciones = () => {

    const [numeros, SetNumeros] = useState([1, 2, 3, 4, 5, 6])
    const [userName, setUserName] = useState('')

    const navigate = useNavigate();

    useEffect(() => {

        const auth = getAuth();
        const user = auth.currentUser;
        if (!user) {
            navigate('/inicio-sesion');
        }
        console.log(user);
        if (user) {
            const userRef = doc(db, "user", user.uid);
            getDoc(userRef)
                .then((userSnapshot) => {

                    if (userSnapshot.exists()) {
                        setUserName(userSnapshot.get('name'))
                        console.log("User data: ", userSnapshot.data());
                    } else {
                        console.log("El usuario no existe");
                    }
                })
                .catch((error) => {
                    console.log("Error getting document:", error);
                });
        }
    }, [])


    return (
        <Fragment>

            <div className='border-4 flex flex-col items-center h-screen '>
                <div className='flex flex-col  h-1/4'>

                    <h2>Bienvenido {userName} !</h2>
                </div>

                <div className="flex flex-col h-3/4 w-full">
                    <Link href="" target='_blank' className="border-4 mt-4 w-full text-center">

                        <button className='button-option-list'>
                            Registrar un gasto
                        </button>
                    </Link>
                    <Link href="" target='_blank' className="border-4 mt-4 w-full text-center">
                        <button className='button-option-list'>
                            Registrar un ingreso
                        </button>
                    </Link>
                    <Link to="/registrador" target='_blank' className="border-4 mt-4 w-full text-center">
                        <button className='button-option-list'>
                            Registrar un pago con tarjeta de Credito
                        </button>
                    </Link>
                    <Link to="/calcu-int-comp" target='_blank' className="border-4 mt-4 w-full text-center">
                        <button className='button-option-list'>
                            Calculadora de interes compuesto
                        </button>
                    </Link>
                    <Link to="/regla3" target='_blank' className="border-4 mt-4 w-full text-center">
                        <button className='button-option-list'>
                            Calculadora de regla de 3
                        </button>
                    </Link>
                </div>
            </div>


        </Fragment>
    );
}

export default ListaOpciones;