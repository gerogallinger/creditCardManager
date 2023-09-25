import React, { Fragment, useState } from 'react';

function Formulario() {

    const [nombre, setNombre] = useState('')
    const [edad, setEdad] = useState('')

    const Validar = (event) => {
        event.preventDefault() //prevent refresh page
        console.log('Pulsando el boton');
        if (!nombre.trim()) {
            console.log('El nombre esta vacio');
        }
    }

    return (
        <div>
            <div className='container'>

                <form onSubmit={Validar} className='form-group'>
                    <input className='form-control mb-3' placeholder='Introduce nombre ' type="text" onChange={
                        (e) => { setNombre(e.target.value) }
                    } />
                    <input className='form-control mb-3' placeholder='Introduce la edad' type="number" onChange={
                        (e) => { setEdad(e.target.value) }
                    } />
                    <input className='btn btn-info mb-3' type="submit" />
                </form>
            </div>

        </div>
    );
}

export default Formulario;
