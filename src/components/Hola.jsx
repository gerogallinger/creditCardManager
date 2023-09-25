import React, { Fragment } from 'react';

class MiComponente extends React.Component {
  constructor(props) {
    super(props);
    // Aquí puedes inicializar el estado del componente si es necesario
  }

  render() {

    let prueba = "Porcion de codigo"

    return (
      <div>
        <h2>Este es un componente de prueba</h2>
        <h4>Probando : {prueba} </h4>
      </div>
    );
  }
}

export default MiComponente;
