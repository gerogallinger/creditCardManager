import React, { Fragment, useState } from 'react';

function ReglaTres() {

    const [valor1, setvalor1] = useState('')
    const [valor2, setvalor2] = useState('')
    const [porcentaje1, setporcentaje1] = useState('')
    const [porcentaje2, setporcentaje2] = useState('')




    const calcular = () => {
        //validarEntradas()

        if (!porcentaje1) {
            showResult((porcentaje2 * valor1) / valor2, true);

        } else if (!valor1) {
            showResult((valor2 * porcentaje1) / porcentaje2, false);

        } else if (!porcentaje2) {
            showResult((porcentaje1 * valor2) / valor1, true);

        } else if (!valor2) {
            showResult((valor1 * porcentaje2) / porcentaje1, false);

        }
    }

    const showResult = (valor, isPorcentaje) => {

        if (isPorcentaje) {
            alert("Tu resultado es " + valor + "%")
        } else {

            alert('Tu resultado es ' + valor)
        }

    }

    const validarEntradas = () => {
        if (!porcentaje2 || !porcentaje1 || !valor2 || !valor1) {
            console.log('Campos incompletos');
            alert("Tenes que completar todos los campos")
            return;
        } else {
            console.log("Campos completos");
        }
    }


    return (
        <section className="min-h-screen h-1/4 bg-gray-200 items-center text-center">
            <div>

                <h1 className="h-1/4 font-bold pt-8 text-3xl">
                    Calcular la regla de 3
                </h1>
                <h3 className='font pt-6 px-24 '>
                    Ingresa los 3 campos para calcular el restante

                </h3>
            </div>
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4 h-3/4  items-stretch">


                <input
                    type="number"
                    onChange={(e) => {
                        setporcentaje1(e.target.value);
                    }}
                    value={porcentaje1}
                    placeholder="Ingresa el porcentaje Inicial"
                    className="border p-1 rounded bg-white m-1"
                    id=""
                />

                <input
                    type="number"
                    onChange={(e) => {
                        setvalor1(e.target.value);
                    }}
                    value={valor1}
                    placeholder="Ingresa el valor 1"
                    className="border p-1 rounded bg-white m-1"
                    id=""
                />

                <input
                    type="number"
                    onChange={(e) => {
                        setporcentaje2(e.target.value);
                    }}
                    value={porcentaje2}
                    placeholder="Ingresa el porcentaje a calcular"
                    className="border p-1 rounded bg-white m-1"
                    id=""
                />
                <input
                    type="number"
                    onChange={(e) => {
                        setvalor2(e.target.value);
                    }}
                    value={valor2}
                    placeholder="Valor final "
                    className="border p-1 rounded bg-white m-1"
                    id=""
                />
                <div className='py-4'>
                    <button className='border border-gray-950 rounded py-3 px-6'
                        onClick={calcular}>
                        Calcular
                    </button>
                </div>

            </div>

        </section>
    );
}

export default ReglaTres;
