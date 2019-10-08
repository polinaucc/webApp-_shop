import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import App from './App';
import About from './Components/About';
import Contacts from './Components/Contacts'
import Admin from './Components/Admin'
import NewProduct from './Components/NewProduct'
import Products from './Components/Products';
import Register from './Components/Register';
import Login from './Components/Login';
import Cart from './Components/Cart'

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/about" component={About}/>
      <Route path="/contacts" component={Contacts}/>
      <Route path="/admin" component={Admin}/>
      <Route path="/new-product" component={NewProduct}/>
      <Route path="/products" component={Products}/>
      <Route path="/register" component={Register}/>
      <Route path="/login" component={Login}/>
      <Route path="/cart" component={Cart}/>
      <Route exect path="/" component={App}/>
    </Switch>
  </BrowserRouter>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
