import React, { Component } from 'react'
import Header from '../Components/Header'

import aboutImg from '../img/about.jpg'
import aboutVideo from '../video/video.mp4'

export default class About extends Component {
  render() {
    return (
      <div>
        <Header/>
        <section>
            <div class="about-us">
                <h1>About us</h1>
                <p>Our online store - the most popular online store in Ukraine</p>
                <div class="row">
                    <div class="col-lg-6"><img src={aboutImg} height="100%" width="100%" style={{float:'left'}}/></div>
                    <div class="col-lg-6"><p>
                        We offer a wide range of electronics, home appliances and various consumer goods from clothing to alcoholic beverages.
                <br/><br/> </p>
                <h2 >We will help you choose, do not let to be bored!</h2>
                <p id="text">Our task is not only to just sell the right product, but also to inform and educate the buyer. To do this, we shoot a video review of new products, prepare articles and news. Armed with comprehensive information about the interesting device and its main competitors, you will be able to make an informed decision about the purchase of exactly the product you need.
                </p> <br/><br/><br/>
                <p>Address<br/>
                    We will be glad to see you at the address: Kiev, st. Yangel 20</p>
                </div>
            </div>
            <br/>
            <video controls="controls" autoplay height="100%" width="100%">
                <source src={aboutVideo}/>
            </video>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.6347868625667!2d30.449400315697744!3d50.44790297947501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc26fd25e1e1%3A0xe9c8486538484580!2z0YPQuy4g0JDQutCw0LTQtdC80LjQutCwINCv0L3Qs9C10LvRjywgMjAsINCa0LjQtdCyLCAwMjAwMA!5e0!3m2!1sru!2sua!4v1555886111248!5m2!1sru!2sua" width="100%" height="450" frameborder="0" style={{border:0}} allowfullscreen></iframe>
            </div>
        </section>
      </div>
    )
  }
}
