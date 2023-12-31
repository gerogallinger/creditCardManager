import './App.css';
import Registrador from './components/Registrador';
import SignIn from './components/SignIn';
import InteresCompuesto from './components/interesCompuesto';
import ReglaTres from './components/reglaTres';
import RegistradorTC from './components/registradorTC'
import Movimientos from './components/movimientos'

import React from 'react';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom'
import SignUp from './components/SignUp';
import ListaOpciones from './components/listaOpciones';


function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/inicio" Component={Inicio} />

        <Route path="/registrador" Component={Registrador} />
        <Route path="/option-list" Component={ListaOpciones} />
        <Route path="/register-credit-car" Component={RegistradorTC} />

        <Route path="/login" Component={SignIn} />
        <Route path="/singup" Component={SignUp} />
        <Route path="/new-mov" Component={Movimientos} />
        <Route path="/calcu-int-comp" Component={InteresCompuesto} />
        <Route path="/regla3" Component={ReglaTres} />
        <Route path="/" Component={SignIn} />

      </Routes>

    </BrowserRouter>

  );
}

function Inicio() {
  return (
    <>
      <h1>Bienvenido al inicio</h1>
      <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro ipsum, fugit nisi nobis dolore magnam qui corrupti necessitatibus dolores dicta quibusdam id obcaecati, impedit veritatis ad commodi sapiente et ut.</h3>
      <h3>Estamos probando el router</h3>
    </>
  );
}

export default App;
