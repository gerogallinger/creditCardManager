import MiComponente from './components/Hola';
import './App.css';
import { Contador } from './components/contador';
import Listado from './components/listado';
import Temperatura from './components/Temperatura';
import Formulario from './components/Formulario'
import Registrador from './components/Registrador';
import SignIn from './components/SignIn';

import React, { Fragment, useState } from 'react';
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  Routes
} from 'react-router-dom'
import SignUp from './components/SignUp';



function App() {
  return (

    <BrowserRouter>
      <Routes>

        <Route path="/inicio" Component={Inicio} />

        <Route path="/registrador" Component={Registrador} />

        <Route path="/inicio-sesion" Component={SignIn} />
        <Route path="/crear-usuario" Component={SignUp} />
      </Routes>

    </BrowserRouter>

  );
}

function Inicio() {
  return (
    <Fragment>
      <h1>Bienvenido al inicio</h1>
      <h3>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro ipsum, fugit nisi nobis dolore magnam qui corrupti necessitatibus dolores dicta quibusdam id obcaecati, impedit veritatis ad commodi sapiente et ut.</h3>
      <h3>Estamos probando el router</h3>
    </Fragment>
  );
}

export default App;