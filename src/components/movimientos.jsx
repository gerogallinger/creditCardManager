import React, { useState } from 'react';
import { db } from '../configs'
import uniqid from 'uniqid'
import { collection, addDoc } from "firebase/firestore";

const Movimientos = () => {
    const [monto, setMonto] = useState('');
    const [nombreCompra, setNombreCompra] = useState('');
    const [cantCuotas, setCantCuotas] = useState('');
    const [categoria, setCategoria] = useState('');
    const [tipo, setTipo] = useState('');
    const [fecha, setFecha] = useState('');

    //TODO: traer esto de firebase 
    const categoriasMov = ["Electronica", "Hogar", "Indumentaria", "Otra"]; // Lista de categorías
    const tipos = ["Ingreso", "Egreso"];

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

    const handleSubmit = (e) => {
        e.preventDefault();
        // Agregar lógica para manejar el envío del formulario

        const nuevaCuota = {
            id: uniqid(),
            nombre: nombreCompra,
            monto: monto,
            cantCuotas: cantCuotas,
            fechaCompra: fecha,
            categoria: categoria
        }

        if (!validarCampos(nuevaCuota)) {
            alert("Debes completar todos los campos")
            return; // No hacer nada si algún campo está vacío
        }
        var listCuotas = armarCuotas(monto, cantCuotas, fecha);

        var compraToFirebase = {
            nombre: nombreCompra,
            monto: monto,
            cantCuotas: cantCuotas,
            fechaCompra: fecha,
            categoria: categoria,
            listCuotas: listCuotas
        }


        console.log("Compra : " + JSON.stringify(compraToFirebase));

        let envio = sendCuotaFirebase(compraToFirebase);

        if (envio) {
            console.log("Cuota enviada a firebase");
        }

        setMonto('')
        setNombreCompra('')
        setCantCuotas('')
        setCategoria('')
        setFecha('')

    };


    async function sendCuotaFirebase(compraToFirebase) {
        try {
            const docRef = await addDoc(collection(db, "compras"), compraToFirebase)
            console.log("Document written with ID: ", docRef.id);

        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    function armarCuotas(monto, cantCuotas) {
        // Generar un array con la misma longitud que cantCuotas
        const cuotasArray = Array.from({ length: cantCuotas });

        // Utilizar map para generar un nuevo array de objetos cuota
        const cuotas = cuotasArray.map((_, index) => {
            // Calcular el monto de la cuota
            const montoCuota = monto / cantCuotas;

            // Crear la fecha de compra
            const fechaCompra = new Date();

            // Asignar la fecha de pago inicial
            let fechaPago = asignarFechaPago(fechaCompra);

            // Incrementar un mes a la fecha de pago por cada cuota
            fechaPago.setMonth(fechaPago.getMonth() + index);

            // Crear el objeto cuota
            const cuota = {
                nroCuota: index + 1,
                montoCuota: montoCuota,
                isPaid: false,
                fechaCompra: fechaCompra,
                fechaPago: fechaPago,
            };

            return cuota;
        });

        // Retornar el array de cuotas
        return cuotas;
    }

    function asignarFechaPago(fechaCompra) {
        // Crear una nueva instancia de Date basada en la fecha de compra
        let fechaPago = new Date(fechaCompra);

        // Si el día de la fecha de compra es hasta el día 5 del mes
        if (fechaCompra.getDate <= 5) {
            // Establecer el día de la fecha de pago en el 10 del mes corriente
            fechaPago.setDate(10);
        } else {
            // Establecer el día de la fecha de pago en el 10 del mes siguiente
            fechaPago.setMonth(fechaPago.getMonth() + 1);
            fechaPago.setDate(10);
        }

        // Retornar la fecha de pago
        return fechaPago;
    }


    return (
        <div className="bg-gray-800 min-h-screen flex items-center justify-center">
            <form
                className="bg-gray-900 p-8 rounded-lg shadow-lg w-96"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-semibold text-white mb-6">Registrar Gasto</h2>
                <div className="mb-4">
                    <label htmlFor="nombreCompra" className="text-white block mb-1">
                        Nombre de la Compra
                    </label>
                    <input
                        type="text"
                        id="nombreCompra"
                        className="w-full p-2 border border-gray-700 rounded"
                        value={nombreCompra}
                        onChange={(e) => setNombreCompra(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="monto" className="text-white block mb-1">
                        Monto de Compra
                    </label>
                    <input
                        type="number"
                        id="monto"
                        className="w-full p-2 border border-gray-700 rounded"
                        value={monto}
                        onChange={(e) => setMonto(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cuotas" className="text-white block mb-1">
                        Cantidad de Cuotas
                    </label>
                    <input
                        type="number"
                        id="cuotas"
                        className="w-full p-2 border border-gray-700 rounded"
                        value={cantCuotas}
                        onChange={(e) => setCantCuotas(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="categoria" className="text-white block mb-1">
                        Categoría
                    </label>
                    <select
                        id="categoria"
                        className="w-full p-2 border border-gray-700 rounded"
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Selecciona una categoría</option>
                        {
                            categoriasMov.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="categoria" className="text-white block mb-1">
                        Categoría
                    </label>
                    <select
                        id="tipo"
                        className="w-full p-2 border border-gray-700 rounded"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    >
                        <option value="" disabled>
                            Tipo de movimiento</option>
                        {
                            tipos.map((cat) => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="fecha" className="text-white block mb-1">
                        Fecha
                    </label>
                    <input
                        type="date"
                        id="fecha"
                        className="w-full p-2 border border-gray-700 rounded"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
                        required
                    />
                </div>
                <div className='flex items-center justify-around'>
                    <button
                        type="submit"
                        className=" bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ">
                        Registrar Compra
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Movimientos;
