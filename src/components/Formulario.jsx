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
            <div className=''>

                <form onSubmit={Validar} className=''>
                    <input className='' placeholder='Introduce nombre ' type="text" onChange={
                        (e) => { setNombre(e.target.value) }
                    } />
                    <input className='' placeholder='Introduce la edad' type="number" onChange={
                        (e) => { setEdad(e.target.value) }
                    } />
                    <input className='' type="submit" />
                </form>
            </div>

        </div>
    );
}

export default Formulario;
