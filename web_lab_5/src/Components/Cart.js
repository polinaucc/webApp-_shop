import React, { Component } from 'react'
import Header from './Header';
import { Redirect } from 'react-router';
import { apiUrl, fileUrl } from '../config'
import axios from 'axios'

export default class Cart extends Component {
  constructor(props){
    super(props);

    this.state = {
      products: [],
      authed: false,
      error: false,
      success: false
    }
  }

  getAllProducts = () => {
    const token = this.state.user.token;
    const auth = {
      headers: {'Authorization': "bearer " + token}
    }
    axios.get(`${apiUrl}/cart/${this.state.user._id}`, auth)
      .then(cart => this.setState({
        products: cart.data
      }))
  }

  onDelete = productId => {
    const userId = this.state.user._id
    const token = this.state.user.token;
    axios.delete(`${apiUrl}/cart`, { data: { userId, productId } , headers: {'Authorization': "bearer " + token} } )
      .then(res => this.getAllProducts())
      .catch(err => console.log(err))
  }

  localStorageUpdated = () => {
    try{
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        this.setState({
          authed: true,
          user
        })
      } else {
        this.setState({ authed: false })
      }
    } catch (e) {
      console.log(e)
    }
  }

  componentWillMount(){
    try{
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        this.setState({
          authed: true,
          user
        }, () => {
          this.getAllProducts();
        })
      }
    } catch (e) {
      console.log(e)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.localStorageUpdated)
  }
  }

  render() {
    return (
      this.state.authed ?
      <div>
        <Header/>
        <div class="contact">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Product name</th>
                <th scope="col">Description</th>
                <th scope="col">Category</th>
                <th scope="col">Product image</th>
              </tr>
            </thead>
            <tbody id="forms_table_body">
              {
                this.state.products.length > 0 &&
                  this.state.products.map(product => (
                    <tr>
                      <th scope="row">{product._id}</th>
                      <td>{product.product_name}</td>
                      <td>{product.description}</td>
                      <td>{product.category}</td>
                      <td><img src={fileUrl+product.product_image} style={{width: '10vw', height: '10vw'}}/></td>
                      <button className="btn btn-outline-primary" onClick={() => this.onDelete(product._id)}>Remove from cart</button>
                    </tr>
                  ))
              }
            </tbody>
        </table>
        {
          this.state.error ? <h3>No data to display</h3> : null
        }
    </div> 
      </div> : <Redirect to="/login" />
    )
  }
}
