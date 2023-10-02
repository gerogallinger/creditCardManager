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
            <div class=''>

                <form onSubmit={Validar} class=''>
                    <input class='' placeholder='Introduce nombre ' type="text" onChange={
                        (e) => { setNombre(e.target.value) }
                    } />
                    <input class='' placeholder='Introduce la edad' type="number" onChange={
                        (e) => { setEdad(e.target.value) }
                    } />
                    <input class='' type="submit" />
                </form>
            </div>

        </div>
    );
}

export default Formulario;
