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
      <div className=''>
        <h1>
          La temperatura es : {num}
        </h1>
        <p>
          {
            num > 21 ? 'Hace calorcito' : 'Esta fresco wey'
          }
        </p>
        <button className='' onClick={SubirTemp}>Aumentar temperatura</button>
        <button className='' onClick={BajarTemp}>Disminuir temperatura</button>
      </div>
    </Fragment>
  );
}

export default Temperatura;
