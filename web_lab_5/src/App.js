import React from 'react';
import logo from './logo.svg';
import './App.css';

import slider from './img/slider2.jpg';
import shopImg from './img/shop.png'

import Header from './Components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <section>

        <div class="photo">
          <picture>
            <source src={slider} height="10%" width="100%" />
            <img src={slider} height="10%" width="100%" />
          </picture>
        </div>

        <div class="items">
          <a>Bestsellers</a><br /><br />
          <div class="container-fluid">
            <div class="row">
              <div class="col-lg-3">
                <div class="item">
                  <div class="col-xs-6">
                    <div class="item_img">
                    </div>
                  </div>
                  <br />
                  <div class="col-xs-6"><p>Дуо-капсулы для<br />стирки Persil Color</p><h2>299 грн</h2><br />
                    <div class="add">+</div>
                  </div>
                </div>
              </div>
              <br /><br />
              <div class="col-lg-3">
                <div class="item">
                  <div class="col-xs-6">
                    <div class="item_img">
                    </div>
                  </div>
                  <br />
                  <div class="col-xs-6"><p>Дуо-капсулы для<br />стирки Persil Color</p><h2>299 грн</h2><br />
                    <div class="add">+</div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="item">
                  <div class="col-xs-6">
                    <div class="item_img">
                    </div>
                  </div>
                  <br />
                  <div class="col-xs-6"><p>Дуо-капсулы для<br />стирки Persil Color</p><h2>299 грн</h2><br />
                    <div class="add">+</div>
                  </div>
                </div>
              </div>
              <div class="col-lg-3">
                <div class="item">
                  <div class="col-xs-6">
                    <div class="item_img">
                    </div>
                  </div>
                  <br />
                  <div class="col-xs-6"><p>Дуо-капсулы для<br />стирки Persil Color</p><h2>299 грн</h2><br />
                    <div class="add">+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </section>
        <footer>
            <nav>
                <div id="logo">SHOP</div>
                <label for="drop2" class="toggle">Menu</label>
                <input type="checkbox" id="drop2"/>
                <ul class="menu">
                    <li><a href="index.html">Main</a></li>
                    <li><a href="#">Action</a></li>
                    <li><a href="about.html">About us</a></li>
                    <li><a href="#">Shipping and payment</a></li>
                    <li><a href="#">Warranty</a></li>
                    <li><a href="#">Return</a></li>
                    <li><a href="contact.html">Contacts</a></li>
                    <li><a href="login.html">Enter</a></li>
                    <li><a href="login.html">Registration</a></li>
                    <li>
                    <a href="">
                    <picture>
                            <source src={shopImg} height="25px" width="25px"/>
                            <img src={shopImg} height="25px" width="25px" alt="K"/> 
                        </picture>My shoppings
                    </a>
                    </li>
                </ul>
            </nav>
        </footer>

    </div >
  );
}

export default App;
