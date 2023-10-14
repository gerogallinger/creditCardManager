import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'

const ListaOpciones = () => {

    const [numeros, SetNumeros] = useState([1, 2, 3, 4, 5, 6])



    return (
        <Fragment>

            <div className='border-4 flex flex-col items-center h-screen '>
                <div className='flex flex-col  h-1/4'>
                    <h2>Bienvenido Usuario!</h2>
                </div>

                <div className="flex flex-col h-3/4 w-full">
                    <a href="" className="border-4 mt-4 w-full text-center">

                        <button className='button-option-list'>
                            Registrar un gasto
                        </button>
                    </a>
                    <a href="" className="border-4 mt-4 w-full text-center">
                        <button className='button-option-list'>
                            Registrar un ingreso
                        </button>
                    </a>
                    <Link to="/registrador" className="border-4 mt-4 w-full text-center">
                        <button className='button-option-list'>
                            Registrar un pago con tarjeta de Credito
                        </button>
                    </Link>
                    <Link to="/calcu-int-comp" className="border-4 mt-4 w-full text-center">
                        <button className='button-option-list'>
                            Calculadora de interes compuesto
                        </button>
                    </Link>
                </div>
            </div>


        </Fragment>
    );
}

export default ListaOpciones;