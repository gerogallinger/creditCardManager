import React, { Fragment, useState, useEffect } from 'react';

const ReglaTres = () => {

    const [valorInicial, setValorInicial] = useState('')
    const [valorFinal, setValorFinal] = useState('')
    const [porcentajeInicial, setPorcentajeInicial] = useState('')
    const [porcentajeFinal, setPorcentajeFinal] = useState('')




    const calcularReglaDeTres = (e) => {
        e.preventDefault()

        let resultado = (porcentajeFinal * valorInicial) / porcentajeInicial

        console.log('El valor calculado es ' + resultado)
        alert(`Valor final: ${resultado}`);

    }



    return (
        <>
            <form onSubmit={calcularReglaDeTres} className="text-justify p-8">
                <h2 className="text-center">Calcular la regla de 3</h2>
                <div className="grid grid-cols-2">
                    <input
                        type="number"
                        onChange={(e) => {
                            setPorcentajeInicial(e.target.value);
                        }}
                        value={porcentajeInicial}
                        placeholder="Ingresa el porcentaje Inicial"
                        className="border p-1 rounded bg-white"
                        id=""
                    />
                    <input
                        type="number"
                        onChange={(e) => {
                            setValorInicial(e.target.value);
                        }}
                        value={valorInicial}
                        placeholder="Ingresa el valor 1"
                        className="border p-1 rounded bg-white"
                        id=""
                    />
                    <input
                        type="number"
                        onChange={(e) => {
                            setPorcentajeFinal(e.target.value);
                        }}
                        value={porcentajeFinal}
                        placeholder="Ingresa el porcentaje a calcular"
                        className="border p-1 rounded bg-white"
                        id=""
                    />
                    <input
                        type="number"
                        onChange={(e) => {
                            setValorFinal(e.target.value);
                        }}
                        value={valorFinal}
                        placeholder="Ingresa "
                        className="border p-1 rounded bg-white"
                        id=""
                    />
                </div>
                <div className='text-center py-4 '>
                    <button className='border border-gray-950 rounded px-6' >Calcular</button>

                </div>
            </form>
        </>
    );
}

export default ReglaTres;
