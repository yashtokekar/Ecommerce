import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { Register } from './pages/auth/Register';
import { Login } from './pages/auth/Login';
import { Home } from './pages/Home';
import { Header } from './components/nav/Header';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
      </Switch>
    </>
  );
}

export default App;
