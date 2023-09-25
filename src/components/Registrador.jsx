import React, { Fragment, useState, filter } from 'react';
import uniqid from 'uniqid'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Button, TextField } from '@mui/material';
import { Grid } from '@mui/material';
import { OutlinedInput, Card } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';



function Registrador() {

    // const theme = createTheme({
    //     status: {
    //         danger: orange[500],
    //     },
    // });

    const [listaCuotas, setListaCuotas] = useState([])
    const [nombreCuota, setNombreCuota] = useState([])
    const [montoCuota, setMontoCuota] = useState([])
    const [montoCompra, setMontoCompra] = useState([])
    const [fechaCompra, setFechaCompra] = useState([])

    const [cantCuotas, setCantidadCuotas] = useState([])
    const [modoEdicion, setModoEdicion] = useState(false)
    const [id, setId] = useState('')
    const [error, setError] = useState(null)
    // const [categoria, setCategoria] = useState('Suscripciones', 'Supermercado', 'Transporte', 'Ahorros')
    const [categoria, setCategoria] = useState('')

    const addCuota = (e) => {
        e.preventDefault()
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


    return (
        <Fragment>
            <div className="container">

                <h1>Registra tus gastos!</h1>
                <div className="row">
                    {/* SECTION: LISTA DE CUOTAS */}
                    <div className="col">
                        <h2 className='h1-center'>
                            Tus cuotas a pagar
                        </h2>
                        <ul className='item-group'>


                            <Grid container direction="column" spacing={2}>
                                Tabla de gastos
                                {
                                    listaCuotas.map(item =>
                                        <Grid2>
                                            <Card key={item.id} className='list-group-item list-group-item-warning'>
                                                {item.nombre}. $ {item.monto}. Cant Cuota {item.cantCuotas}
                                                <Button
                                                    color='warning'
                                                    onClick={() => { deleteCuota(item.id) }}
                                                >
                                                    Borrar
                                                </Button>
                                                <Button
                                                    color='info'
                                                    onClick={() => { editCuota(item) }}
                                                >Editar</Button>
                                            </Card>
                                        </Grid2>
                                    )

                                }
                            </Grid>
                        </ul>

                    </div>
                    {/* SECTION: FORMULARIO DE CUOTAS */}
                    <div className="col">
                        <h2>
                            Carga los datos de tu cuota
                        </h2>
                        {/* Formulario con campos para cargar cuotas */}
                        <form onSubmit={modoEdicion ? editarCuota : addCuota} className='form-group'>


                            <Grid container direction="column" spacing={2}>
                                <Grid item>
                                    <TextField
                                        label="Nombre compra"
                                        type="text"
                                        value={nombreCuota}
                                        fullWidth
                                        onChange={(e) => { setNombreCuota(e.target.value) }}
                                    />
                                </Grid>
                                <Grid item>
                                    <TextField
                                        label="Monto Compra"
                                        type="number"
                                        value={montoCompra}
                                        fullWidth
                                        onChange={(e) => { setMontoCompra(e.target.value) }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid>

                                <InputLabel id="demo-simple-select-autowidth-label">Cantidad de Cuotas</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={cantCuotas}
                                    type='number'
                                    onChange={(e) => { setCantidadCuotas(e.target.value) }}
                                    fullWidth
                                    label="Cantidad Cuotas">

                                    <MenuItem value="">
                                        <em>Seleccione una opcion</em>
                                    </MenuItem>
                                    <MenuItem value={10}>1</MenuItem>
                                    <MenuItem value={21}>3</MenuItem>
                                    <MenuItem value={22}>6</MenuItem>
                                    <MenuItem value={23}>9</MenuItem>
                                    <MenuItem value={24}>12</MenuItem>
                                </Select>
                            </Grid>
                            <Grid>

                                <InputLabel id="demo-simple-select-autowidth-label">Categoria</InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={categoria}
                                    onChange={handleChange}
                                    fullWidth
                                    label="Categoria"
                                >
                                    <MenuItem value="">
                                        <em>Seleccione una opcion</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Supermercado</MenuItem>
                                    <MenuItem value={21}>Tecnologia</MenuItem>
                                    <MenuItem value={22}>Hogar</MenuItem>
                                </Select>
                            </Grid>


                            <input className='form-control mb-3'
                                placeholder='Fecha Cuota'
                                type="date"
                                value={fechaCompra}
                                onChange={
                                    (e) => { setFechaCompra(e.target.value) }
                                } />
                            <OutlinedInput
                                fullWidth
                                color='info'
                                type="submit"
                                value={modoEdicion ? 'Editar Datos' : 'Registrar Cuota'} />
                        </form>
                        {
                            error != null ? (
                                <div className='alert alert-danger'>
                                    {error}
                                </div>
                            ) :
                                (
                                    <div> </div>

                                )
                        }
                    </div>
                </div>
            </div>

        </Fragment>
    );
}

export default Registrador;