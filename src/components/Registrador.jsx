import React, { Fragment, useState, filter, useEffect } from 'react';
import uniqid from 'uniqid'
import { getAuth } from "firebase/auth";
import { db } from '../configs'
import { useNavigate } from 'react-router-dom';

import { doc, getDoc } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

function Registrador() {




    const [listaCuotas, setListaCuotas] = useState([])
    const [nombreCuota, setNombreCuota] = useState('')
    const [montoCuota, setMontoCuota] = useState('')
    const [montoCompra, setMontoCompra] = useState('')
    const [fechaCompra, setFechaCompra] = useState('')
    const [mesSeleccion, setMesSeleccion] = useState('')


    const [cantCuotas, setCantidadCuotas] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const [categoria, setCategoria] = useState('')
    const navigate = useNavigate();



    function validarCampos(objeto) {
        //validamos los campos del formulario y devolvemos
        Object.keys(objeto).forEach((propiedad) => {
            if (typeof objeto[propiedad] === 'string' && !objeto[propiedad].trim()) {
                console.log(`El campo ${propiedad} está vacío`);
                setError(`El campo ${propiedad} está vacío`);
                return false;
            }
        });
        return true;
    }

    // useEffect(() => {

    //     const auth = getAuth();
    //     const user = auth.currentUser;
    //     if (!user) {
    //         navigate('/login');
    //     }
    //     console.log(user);
    //     if (user) {
    //         const userRef = doc(db, "user", user.uid);
    //         getDoc(userRef)
    //             .then((userSnapshot) => {

    //                 if (userSnapshot.exists()) {
    //                     setUserName(userSnapshot.get('name'))
    //                     console.log("User data: ", userSnapshot.data());
    //                 } else {
    //                     console.log("El usuario no existe");
    //                 }
    //             })
    //             .catch((error) => {
    //                 console.log("Error getting document:", error);
    //             });
    //     }
    // }, [])


    const addCuota = (e) => {
        e.preventDefault()

        console.log(nombreCuota, cantCuotas, montoCompra, fechaCompra, categoria);


        const nuevaCuota = {
            id: uniqid(),
            nombre: nombreCuota,
            monto: montoCompra,
            cantCuotas: cantCuotas,
            fechaCompra: fechaCompra,
            categoria: categoria
        }


        if (!validarCampos(nuevaCuota)) {
            return; // No hacer nada si algún campo está vacío
        }

        let montoCuota = montoCompra / cantCuotas
        const cuotaToFirebase = {

            name: nombreCuota,
            amountPurchase: montoCompra,
            amountCouta: montoCuota,
            cuotasSize: cantCuotas,
            date: fechaCompra,
            category: categoria

        }
        let envio = sendCuotaFirebase(cuotaToFirebase);

        if (envio) {

            console.log("Cuota enviada a firebase");
        }

        setListaCuotas([...listaCuotas, nuevaCuota])
        setNombreCuota('')
        setMontoCompra('')
        setCantidadCuotas('')
        setCategoria('')
        setFechaCompra('')
        setError(null)
    }

    async function sendCuotaFirebase(cuotaToFirebase) {
        try {
            const docRef = await addDoc(collection(db, "cuotas"), cuotaToFirebase)
            console.log("Document written with ID: ", docRef.id);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }
    const deleteCuota = (id) => {
        const auxArray = listaCuotas.filter(item => item.id !== id)
        setListaCuotas(auxArray)
    }

    const editCuota = (cuota) => {
        setModoEdicion(true)
        setNombreCuota(cuota.nombre)
        setMontoCuota(cuota.monto)
        setId(cuota.id)

    }

    const editarCuota = (e) => {
        e.preventDefault();
        const auxArray = listaCuotas.map(item =>
            item.id === id ? { id: id, nombre: nombreCuota, monto: montoCuota } : item
        );
        setListaCuotas(auxArray);
        setModoEdicion(false); // Desactiva el modo de edición después de editar
    };

    return (
        <Fragment>

            <div className="mt-4" >

                <h1 className="text-center text-3xl">Registra tus gastos!</h1>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="grid m-5 border-4 border-black p-4 rounded-lg ">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Tus cuotas por pagar
                    </h2>
                    <div className='text-center'>
                        <p>Selecciona el mes</p>
                        <select
                            id='mes'
                            className=''
                            value={mesSeleccion}
                            onChange={(e) => setMesSeleccion(e.target.value)}>

                            <option value={13} defaultChecked >-- Mes --</option>
                            <option value={1}>Enero</option>
                            <option value={2}>Febrero</option>
                            <option value={3}>Marzo</option>
                            <option value={4}>Abril</option>
                            <option value={5}>Mayo</option>
                            <option value={6}>Junio</option>
                            <option value={7}>Julio</option>
                            <option value={8}>Agosto</option>
                            <option value={9}>Septiembre</option>
                            <option value={10}>Octubre</option>
                            <option value={11}>Noviembre</option>
                            <option value={12}>Diciembre</option>
                        </select>
                    </div>
                    <div className="container overflow-y-auto h-[32rem]" >
                        <ul className="item-group mx-auto">

                            <div className="p-2">
                                {
                                    listaCuotas
                                        // .filter(item => {
                                        //     const fechaCompra = new Date(item.fechaCompra);
                                        //     //console.log("Mes seleccionado:" + mesSeleccion);
                                        //     //console.log("Mes :" + fechaCompra.getMonth());
                                        //     return fechaCompra.getMonth() === parseInt(mesSeleccion);
                                        // })
                                        .map(item =>
                                            <li key={item} className="mt-5 rounded-2xl border-2 p-3.5 hover:bg-slate-200">

                                                <div className="flex flex-row">

                                                    <div className="basis-3/4">

                                                        <h3 className="font-style: italic text-center">Compra</h3>
                                                        <p className="">Nombre: {item.nombre}</p>
                                                        {/* Probar cambiar las letras de todos estos parrafos */}
                                                        <p>Monto: {item.monto}</p>
                                                        <p>Cantidad Cuotas: {item.cantCuotas}</p>
                                                        <p>Fecha de Compra: {item.fechaCompra}</p>
                                                        <p>Categoria: {item.categoria}</p>

                                                    </div>

                                                    <div className="flex flex-col basis-1/4 place-content-center text-xl">

                                                        <button
                                                            type='button'
                                                            className="m-2 rounded-full border-2 border-slate-500/100 hover:bg-sky-300 "
                                                            color='warning'
                                                            onClick={() => { deleteCuota(item.id) }}
                                                        >
                                                            Borrar
                                                        </button>
                                                        <button
                                                            className="m-2 rounded-full border-2 border-slate-500/100 hover:bg-sky-300"
                                                            type='button'
                                                            color='info'
                                                            onClick={() => { editCuota(item) }}
                                                        >Editar</button>
                                                    </div>
                                                </div>
                                            </li>
                                        )

                                }
                            </div>
                        </ul>
                    </div>
                </div>
                <div className="grid m-5 border-4 border-black p-4 rounded-lg">
                    <h2 className="text-2xl font-bold mb-4 text-center">
                        Carga los datos de tu cuota
                    </h2>
                    <form onSubmit={modoEdicion ? editarCuota : addCuota} className="space-y-4">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="nombreCompra" className="font-medium">Nombre compra</label>
                            <input
                                id="nombreCompra"
                                type="text"
                                value={nombreCuota}
                                className="border p-2 rounded"
                                onChange={(e) => { setNombreCuota(e.target.value) }}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="montoCompra" className="font-medium">Monto Compra</label>
                            <input
                                id="montoCompra"
                                type="number"
                                value={montoCompra}
                                className="border p-2 rounded"
                                onChange={(e) => { setMontoCompra(e.target.value) }}
                            />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="cantCuotas" className="font-medium">Cantidad de Cuotas</label>
                            <select
                                id="cantCuotas"
                                name="cant-cuotas"
                                className="required border border-black"
                                value={cantCuotas}
                                onChange={(e) => setCantidadCuotas(e.target.value)}>

                                <option defaultChecked>Seleccione una opcion</option>

                                <option>1</option>
                                <option>3</option>
                                <option>6</option>
                                <option>9</option>
                                <option>12</option>

                            </select>

                        </div>
                        <div className="flex flex-col space-y-2">

                            <label htmlFor="categoria" className="font-medium">Categoria</label>
                            <select
                                id="categoria"
                                name="category"
                                className="required border border-black"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}>

                                <option defaultChecked>Seleccione una opcion</option>
                                <option>Tecnologia</option>
                                <option>Electrodomesticos</option>
                                <option>Vacaciones</option>
                                <option>Transporte</option>
                                <option>Oseo</option>
                                <option>Ropa y Calzado</option>
                            </select>

                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="fechaCompra" className="font-medium">Fecha Cuota</label>
                            <input
                                id="fechaCompra"
                                type="date"
                                value={fechaCompra}
                                className="border p-2 rounded"
                                onChange={(e) => { setFechaCompra(e.target.value) }}
                            />
                        </div>
                        <input
                            className="bg-blue-500 text-white p-4 rounded w-full"
                            type="submit"
                            value={modoEdicion ? 'Editar Datos' : 'Registrar Cuota'}
                        />
                    </form>
                    {
                        error != null ? (
                            <div className='text-red-500 mt-4'>
                                {error}
                            </div>
                        ) :
                            (
                                <div> </div>
                            )
                    }
                </div>

            </div>

        </Fragment>
    );
}

export default Registrador;