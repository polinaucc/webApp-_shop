import React, { Component } from 'react'
import '../Styles/main.css'

import shopImg from '../img/shop.png'

export default class Header extends Component {
  render() {
    return (
      <div>
        <nav>
        <div id="logo">SHOP</div>
            <label htmlFor="drop" className="toggle">Menu</label>
          <ul className="list-inline">
                <li className="list-inline-item"><a href="/">Main</a></li>
                <li className="list-inline-item"><a href="#">Action</a></li>
                <li className="list-inline-item"><a href="/about">About us</a></li>
                <li className="list-inline-item"><a href="#">Shipping and payment</a></li>
                <li className="list-inline-item"><a href="#">Warranty</a></li>
                <li className="list-inline-item"><a href="#">Return</a></li>
                <li className="list-inline-item"><a href="/contacts">Contacts</a></li>
                <li className="list-inline-item"><a href="/login">Enter</a></li>
                <li className="list-inline-item"><a href="/register">Registration</a></li>
                <li>
                  <a href="/cart">
                  <picture>
                    <source src={shopImg} height="25px" width="25px"/>
                    <img src={shopImg} height="25px" width="25px" alt="K"/> 
                </picture>My shoppings
                  </a>
                </li>
                <li><a href="/admin">Admin</a></li>
                <li><a href="/new-product">Add product</a></li>
                <li><a href="/products">Products</a></li>
            </ul>
        </nav>
      
      </div>
    )
  }
}
