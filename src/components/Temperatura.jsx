import React, { Fragment, useState } from 'react';

function Temperatura() {

  const [num, setTemperatura] = useState(19)

  const SubirTemp = () => {
    setTemperatura(num + 1)
  }
  const BajarTemp = () => {
    setTemperatura(num - 1)
  }


  return (
    <Fragment>
      <div className='App mt-5'>
        <h1>
          La temperatura es : {num}
        </h1>
        <p>
          {
            num > 21 ? 'Hace calorcito' : 'Esta fresco wey'
          }
        </p>
        <button className='btn btn-danger btn-block' onClick={SubirTemp}>Aumentar temperatura</button>
        <button className='btn btn-success btn-block' onClick={BajarTemp}>Disminuir temperatura</button>
      </div>
    </Fragment>
  );
}

export default Temperatura;
