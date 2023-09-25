import React, {Fragment, useState, useEffect } from 'react';

export const Contador = () => {

    const [num, setNumero] = useState(0)

    const Aumentar = (numero) => {
        setNumero(num+1)
    }
    const Reducir = (numero) => {
        setNumero(num-1)
    }
    
    const [data, setData] = useState('');
  
    // useEffect(() => {
    //   const obtenerDatos = async () => {
    //     const respuesta = await fetch('https://api.misitio.com/datos');
    //     const datos = await respuesta.json();
    //     setData(JSON.stringify(datos));
    //   };
      
    //   obtenerDatos();
    // }, []);

    return(
        <Fragment>
            <h2>Cantidad del contador: {num} </h2>
            <button onClick={Aumentar}>Aumentar</button>
            <button onClick={Reducir}>Disminuidor</button>
            {/* <button onClick={useEffect}>Llamar api</button> */}
        </Fragment>
    )
}