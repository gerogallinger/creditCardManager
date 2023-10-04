import React, { Fragment, useState, filter } from 'react';
import uniqid from 'uniqid'



function Registrador() {



    const [listaCuotas, setListaCuotas] = useState([])
    const [nombreCuota, setNombreCuota] = useState('')
    const [montoCuota, setMontoCuota] = useState('')
    const [montoCompra, setMontoCompra] = useState('')
    const [fechaCompra, setFechaCompra] = useState(null)

    const [cantCuotas, setCantidadCuotas] = useState('')
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)

    const [categoria, setCategoria] = useState('')

    const addCuota = (e) => {
        e.preventDefault()

        console.log(nombreCuota, cantCuotas, montoCompra, fechaCompra, categoria);

        if (!(nombreCuota.trim) && (!montoCuota.trim)) {
            console.log('Campo nombre vacio');
            setError('Tiene que completar todos los campos')
            return //para que no haga nada
        }
        const nuevaCuota = {
            id: uniqid(),
            nombre: nombreCuota,
            monto: montoCompra,
            cantCuotas: cantCuotas,
            fechaCompra: fechaCompra,
            categoria: categoria
        }
        setListaCuotas([...listaCuotas, nuevaCuota])
        setNombreCuota('')
        setMontoCompra('')
        setCantidadCuotas('')
        setCategoria('')
        setFechaCompra('')
        setError(null)
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
    const handleChange = (event) => {
        setCategoria(event.target.value);
    };

    return (
        <Fragment>

            <div class="mt-4" >

                <h1 class="text-center text-3xl">Registra tus gastos!</h1>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div class="grid m-5 border-4 border-black p-4 rounded-lg ">
                    <h2 class="text-2xl font-bold mb-4 text-center">
                        Tus cuotas por pagar
                    </h2>
                    <div class="container overflow-y-auto h-[32rem]" >
                        <ul class="item-group mx-auto">

                            <div class="p-2">
                                {
                                    listaCuotas.map(item =>
                                        <li key={item} class="mt-5 rounded-2xl border-2 p-3.5 hover:bg-slate-200">

                                            <div class="flex flex-row">

                                                <div class="basis-3/4">

                                                    <h3 class="font-style: italic text-center">Compra</h3>
                                                    <p class="font-['Open_Sans']">Nombre: {item.nombre}</p>
                                                    {/* Probar cambiar las letras de todos estos parrafos */}
                                                    <p>Monto: {item.monto}</p>
                                                    <p>Cantidad Cuotas: {item.cantCuotas}</p>
                                                    <p>Fecha de Compra: {item.fechaCompra}</p>
                                                    <p>Categoria: {item.categoria}</p>

                                                </div>

                                                <div class="flex flex-col basis-1/4 place-content-center text-xl">

                                                    <button
                                                        type='button'
                                                        class="m-2 rounded-full border-2 border-slate-500/100 hover:bg-sky-300 "
                                                        color='warning'
                                                        onClick={() => { deleteCuota(item.id) }}
                                                    >
                                                        Borrar
                                                    </button>
                                                    <button
                                                        class="m-2 rounded-full border-2 border-slate-500/100 hover:bg-sky-300"
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
                <div class="grid m-5 border-4 border-black p-4 rounded-lg">
                    <h2 class="text-2xl font-bold mb-4 text-center">
                        Carga los datos de tu cuota
                    </h2>
                    <form onSubmit={modoEdicion ? editarCuota : addCuota} class="space-y-4">
                        <div class="flex flex-col space-y-2">
                            <label for="nombreCompra" class="font-medium">Nombre compra</label>
                            <input
                                id="nombreCompra"
                                type="text"
                                value={nombreCuota}
                                class="border p-2 rounded"
                                onChange={(e) => { setNombreCuota(e.target.value) }}
                            />
                        </div>
                        <div class="flex flex-col space-y-2">
                            <label for="montoCompra" class="font-medium">Monto Compra</label>
                            <input
                                id="montoCompra"
                                type="number"
                                value={montoCompra}
                                class="border p-2 rounded"
                                onChange={(e) => { setMontoCompra(e.target.value) }}
                            />
                        </div>
                        <div class="flex flex-col space-y-2">
                            <label for="cantCuotas" class="font-medium">Cantidad de Cuotas</label>
                            <select
                                id="cantCuotas"
                                name="cant-cuotas"
                                class="required border border-black"
                                value={cantCuotas}
                                onChange={(e) => setCantidadCuotas(e.target.value)}
                            >

                                <option defaultChecked>
                                    <p class="text-sm italic">Seleccione una opcion</p>
                                </option>
                                <option>1</option>
                                <option>3</option>
                                <option>6</option>
                                <option>9</option>
                                <option>12</option>

                            </select>

                        </div>
                        <div class="flex flex-col space-y-2">

                            <label for="categoria" class="font-medium">Categoria</label>
                            <select
                                id="categoria"
                                name="category"
                                class="required border border-black"
                                value={categoria}
                                onChange={(e) => setCategoria(e.target.value)}
                            >

                                <option defaultChecked>
                                    <p class="text-sm">Seleccione una opcion</p>
                                </option>
                                <option>Tecnologia</option>
                                <option>Electrodomesticos</option>
                                <option>Vacaciones</option>
                                <option>Transporte</option>
                                <option>Oseo</option>
                                <option>Ropa y Calzado</option>
                            </select>

                        </div>
                        <div class="flex flex-col space-y-2">
                            <label for="fechaCompra" class="font-medium">Fecha Cuota</label>
                            <input
                                id="fechaCompra"
                                type="date"
                                value={fechaCompra}
                                class="border p-2 rounded"
                                onChange={(e) => { setFechaCompra(e.target.value) }}
                            />
                        </div>
                        <input
                            class="bg-blue-500 text-white p-4 rounded w-full"
                            type="submit"
                            value={modoEdicion ? 'Editar Datos' : 'Registrar Cuota'}
                        />
                    </form>
                    {
                        error != null ? (
                            <div class='text-red-500 mt-4'>
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