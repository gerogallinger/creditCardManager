import React, { Fragment, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { db } from '../configs'
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import OptionElement from './miniComponents/optionElement'


const ListaOpciones = () => {

    const [numeros, SetNumeros] = useState([1, 2, 3, 4, 5, 6])
    const [userName, setUserName] = useState('')

    const [items, setItems] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        //buscamos el user en localstorage para traer los datos
        async function getUser() {
            let uid = localStorage.getItem('uid');
            if (!uid) {
                console.log("No tenemos usuario cargado");
                navigate("/login")
                return
            }
            const userRef = doc(db, 'users', uid);
            const userDoc = await getDoc(userRef);
            console.log('datos:' + JSON.stringify(userDoc));
            if (userDoc.exists()) {
                console.log('Datos del usuario:' + JSON.stringify(userDoc.data()));
                setUserName(userDoc.data().name)
            } else {
                console.log('No se encontró el documento del usuario.');
                navigate("/singup")
            }
        }

        getUser();
    }, []);


    return (
        <Fragment>

            <div className='border-4 flex flex-col items-center justify-center h-screen '>
                <div className='flex flex-col items-center h-1/5'>
                    <h2>Bienvenido {userName} !</h2>
                </div>

                <div className="flex flex-col items-center  align-middle h-4/5 w-full">
                    <OptionElement title="Crear un nuevo reclamo" route="" />
                    <OptionElement title="Registrar un ingreso" route="" />
                    <OptionElement title="Registrar un pago con tarjeta de Crédito" route="/registrador" />
                    <OptionElement title="Calculadora de interés compuesto" route="/calcu-int-comp" />
                    <OptionElement title="Calculadora de regla de 3" route="/regla3" />
                </div>
            </div>



        </Fragment>
    );
}

export default ListaOpciones;