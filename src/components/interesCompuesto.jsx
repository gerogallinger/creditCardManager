import React, { Fragment, useState, useEffect } from 'react';

const InteresCompuesto = () => {

    const [montoInicial, setMontoInicial] = useState('')
    const [cantDias, setCantDias] = useState('')
    const [tasaMensual, setTasaMensual] = useState('')
    const [tasaAnual, setTasaAnual] = useState('')
    const [tasaDiaria, setTasaDiaria] = useState('')
    const [montoFinal, setMontoFinal] = useState('')
    const [aux, setAux] = useState('')



    const [dias, setDias] = useState('');
    const [monto, setMonto] = useState('');
    const [tasa, setTasa] = useState('');
    const [interes, setInteres] = useState('');


    const calcularIngresoFinal = (e) => {
        e.preventDefault()

        setAux(montoInicial)
        const interes = montoInicial * Math.pow((1 + (tasaAnual / 365) / 100), cantDias);

        console.log("El monto final es: " + interes.toFixed(2));
        //alert(`El interés compuesto es: ${interes.toFixed(2)}`);
        setInteres(interes.toFixed(2))
    }



    return (




        <>
            <div className="border-8 border-black p-6 min-h-screen">
                <div className='border-4 border-red-300 p-2'>
                    <h2 className='text-2xl text-center'>
                        Calcula el interes compuesto
                    </h2>
                </div>
                <div className='grid-cols-1 p-1 border-4 border-gray-300'>
                    <div className='px-2 py-4 text-xl text-center'>
                        <form onSubmit={calcularIngresoFinal}>
                            <div className='border-2 flex flex-col px-10'>
                                <label htmlFor="montoIngreso"> Ingresa el monto </label>
                                <input
                                    id="montoInicial"
                                    type="number"
                                    className='bg-white'
                                    placeholder='Monto..'
                                    value={montoInicial}
                                    onChange={(e) => { setMontoInicial(e.target.value) }}
                                />
                            </div>
                            <div className='border-2 flex flex-col px-10'>
                                <label htmlFor="montoIngreso"> Ingresa los dias </label>
                                <input
                                    id="cantDias"
                                    type="number"
                                    className='bg-white'
                                    placeholder='Dias..'
                                    value={cantDias}
                                    onChange={(e) => { setCantDias(e.target.value) }}
                                />
                            </div>
                            <div className='border-2 flex flex-col px-10'>
                                <label htmlFor="montoIngreso"> Ingresa la tasa anual </label>
                                <input
                                    type="number"
                                    placeholder="$0.00"
                                    className="w-full pl-[4.5rem] pr-3 py-2 appearance-none bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                                {/* TODO:  cambiar los input por este tipo arriba*/}
                                <input
                                    id="tasaAnual"
                                    type="number"
                                    className='bg-white'
                                    placeholder='Tasa..'
                                    value={tasaAnual}
                                    onChange={(e) => { setTasaAnual(e.target.value) }}
                                />
                            </div>
                            <button type="submit"
                                className='mx-auto mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                                Calcular
                            </button>
                        </form>

                    </div>
                </div>
                <div>
                    {
                        interes ? (
                            <div className=' flex flex-col text-center p-4'>

                                <h2 className='font-black text-xl px-20'> El resultado de tu interes es </h2>
                                <br />
                                <h2 className='font-black text-xl'>
                                    $ {interes}</h2>
                            </div>
                        ) :
                            (
                                <span></span>
                            )
                    }
                </div>
            </div>

        </>
    );
}

export default InteresCompuesto;
