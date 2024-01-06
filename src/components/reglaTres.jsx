import React, { useState, useEffect } from 'react';
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { db } from '../configs'
import ButtonCalculator from '../components/miniComponents/buttonCalculator'


function ReglaTres() {

    const [userName, setUserName] = useState('')
    const [valor1, setvalor1] = useState('')
    const [valor2, setvalor2] = useState('')
    const [porcentaje1, setporcentaje1] = useState('')
    const [porcentaje2, setporcentaje2] = useState('')
    // const { register, handleSubmit, formState: { errors } } = useForm();

    const navigate = useNavigate()
    const { register, handleSubmit, watch } = useForm();
    const watchAllFields = watch();

    //buscamos el user en localstorage para traer los datos sino redirigimos al login
    useEffect(() => {
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



    const onSubmit = (data) => {

        calcular()
        // Aquí va tu lógica para calcular valor e isPorcentaje
        // Usar 'data' para acceder a los valores del formulario
        // showResult(valor, isPorcentaje);
    };

    const validarEntradas = () => {
        const camposCompletos = Object.values(watchAllFields).filter(Boolean);
        if (camposCompletos.length < 3) {
            alert("Tienes que completar al menos tres campos");
            return false;
        }
        return true;
    }


    const calcular = () => {
        if (validarEntradas()) {

            if (!porcentaje1) {
                showResult((porcentaje2 * valor1) / valor2, true);

            } else if (!valor1) {
                showResult((valor2 * porcentaje1) / porcentaje2, false);

            } else if (!porcentaje2) {
                showResult((porcentaje1 * valor2) / valor1, true);

            } else if (!valor2) {
                showResult((valor1 * porcentaje2) / porcentaje1, false);

            }
        }

    }

    const showResult = (valor, isPorcentaje) => {

        if (isPorcentaje) {
            alert("Tu resultado es " + valor + "%")
        } else {

            alert('Tu resultado es ' + valor)
        }

    }

    // const validarEntradas = () => {
    //     if (!porcentaje2 || !porcentaje1 || !valor2) {
    //         console.log('Campos incompletos');
    //         alert("Tenes que completar todos los campos")
    //         return;
    //     } else if (!porcentaje2 || !porcentaje1 || !valor1) {
    //         console.log('Campos incompletos');
    //         alert("Tenes que completar todos los campos")
    //         return;
    //     } else if (!porcentaje2 || !valor2 || !valor1) {
    //         console.log('Campos incompletos');
    //         alert("Tenes que completar todos los campos")
    //         return;
    //     } else if (!porcentaje1 || !valor2 || !valor1) {
    //         console.log('Campos incompletos');
    //         alert("Tenes que completar todos los campos")
    //         return;
    //     }
    //     else {
    //         console.log("Campos completos");
    //     }
    // }


    return (

        <section className="min-h-screen h-1/4 bg-gray-200 items-center text-center">
            <div>

                <h1 className="h-1/4 font-bold pt-8 text-3xl">
                    Calcular la regla de 3
                </h1>
                <h3 className='font pt-6 px-24 '>
                    Ingresa los 3 campos para realizar el calculo

                </h3>
                <div className="p-4 grid grid-cols-1 sm:grid-cols-1 gap-4 h-3/4 items-stretch">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <label > Porcentaje Inicial</label>
                        <div className='flex flex-col'>

                            <input className="border p-1 rounded bg-white m-1"
                                onChange={(e) => {
                                    setporcentaje1(e.target.value);
                                }}
                                {...register("porcentaje1")} />

                        </div>
                        <label > Porcentaje Final</label>
                        <div className='flex flex-col'>
                            <input className="border p-1 rounded bg-white m-1"
                                onChange={(e) => {
                                    setporcentaje2(e.target.value);
                                }}
                                {...register("porcentaje2")} />

                        </div>
                        <label > Valor Inicial</label>
                        <div className='flex flex-col'>
                            <input className="border p-1 rounded bg-white m-1"
                                onChange={(e) => {
                                    setvalor1(e.target.value);
                                }}
                                {...register("valor1")} />
                        </div>
                        <label > Valor Final</label>
                        <div className='flex flex-col'>
                            <input className="border p-1 rounded bg-white m-1"
                                onChange={(e) => {
                                    setvalor2(e.target.value);
                                }}
                                {...register("valor2")} />

                            {/* TODO:falta hacer bien el calculo */}
                        </div>
                        <div className='py-4 grid justify-center'>
                            {/* <button className='border border-gray-950 rounded py-3 px-6'
                                type='submit'>
                                Calcular
                            </button> */}
                            <ButtonCalculator title={"Calcular"} type={"submit"} />
                        </div>
                    </form>
                </div>
            </div>

        </section >
    );


    //         </div>
    //         <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 h-3/4  items-stretch">


    //             <input
    //                 type="number"
    //                 onChange={(e) => {
    //                     setporcentaje1(e.target.value);
    //                 }}
    //                 value={porcentaje1}
    //                 placeholder="Ingresa el porcentaje Inicial"
    //                 className="border p-1 rounded bg-white m-1"
    //                 id=""
    //             />

    //             <input
    //                 type="number"
    //                 onChange={(e) => {
    //                     setvalor1(e.target.value);
    //                 }}
    //                 value={valor1}
    //                 placeholder="Ingresa el valor 1"
    //                 className="border p-1 rounded bg-white m-1"
    //                 id=""
    //             />

    //             <input
    //                 type="number"
    //                 onChange={(e) => {
    //                     setporcentaje2(e.target.value);
    //                 }}
    //                 value={porcentaje2}
    //                 placeholder="Ingresa el porcentaje a calcular"
    //                 className="border p-1 rounded bg-white m-1"
    //                 id=""
    //             />
    //             <input
    //                 type="number"
    //                 onChange={(e) => {
    //                     setvalor2(e.target.value);
    //                 }}
    //                 value={valor2}
    //                 placeholder="Valor final "
    //                 className="border p-1 rounded bg-white m-1"
    //                 id=""
    //             />
    //             <div className='py-4'>
    //                 <button className='border border-gray-950 rounded py-3 px-6'
    //                     onClick={calcular}>
    //                     Calcular
    //                 </button>
    //             </div>

    // );
}

export default ReglaTres;
