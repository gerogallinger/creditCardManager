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
            cantCuo: cantCuotas,
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

    const people = [
        {
            name: 'Leslie Alexander',
            email: 'leslie.alexander@example.com',
            role: 'Co-Founder / CEO',
            imageUrl:
                'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Michael Foster',
            email: 'michael.foster@example.com',
            role: 'Co-Founder / CTO',
            imageUrl:
                'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Dries Vincent',
            email: 'dries.vincent@example.com',
            role: 'Business Relations',
            imageUrl:
                'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
        {
            name: 'Lindsay Walton',
            email: 'lindsay.walton@example.com',
            role: 'Front-end Developer',
            imageUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Courtney Henry',
            email: 'courtney.henry@example.com',
            role: 'Designer',
            imageUrl:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: '3h ago',
            lastSeenDateTime: '2023-01-23T13:23Z',
        },
        {
            name: 'Tom Cook',
            email: 'tom.cook@example.com',
            role: 'Director of Product',
            imageUrl:
                'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
            lastSeen: null,
        },
    ]


    return (
        <Fragment>

            <div class="mt-4" >

                <h1 class="text-center text-3xl">Registra tus gastos!</h1>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <div class="grid m-5 border-4 border-black p-4 rounded-lg">
                    <h2 class="text-2xl font-bold mb-4 text-center">
                        Tus cuotas por pagar
                    </h2>
                    <div class="container " >
                        <ul class="item-group mx-auto">

                            {
                                listaCuotas.map(item =>
                                    <div class="p-2">
                                        <li class="mt-5 rounded-2xl border-2 p-3.5 hover:bg-slate-200">

                                            <div class="flex flex-row">

                                                <div class="basis-3/4">

                                                    <h3>Compra</h3>
                                                    <p>Nombre: {item.nombre}</p>
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
                                    </div>
                                )

                            }
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