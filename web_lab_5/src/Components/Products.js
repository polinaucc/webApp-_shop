import React, { Component } from 'react'
import axios from 'axios'
import { apiUrl, fileUrl } from '../config';
import Header from '../Components/Header'

export default class Products extends Component {

  constructor(props){
    super(props);

    this.state = {
      products: [],
      cache: []
    }
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

  onSelect = e => {
    const selectedCategory = e.target.value;
    let newState;
    
    if(selectedCategory !== 'All'){
      newState = this.state.cache.filter(product => product.category === selectedCategory)
    } else {
      newState = this.state.cache;
    }
    console.log(newState, this.state.cache)
    this.setState({
      products: newState
    })
  }

  addToCart = productId => {
    const userId = this.state.user._id
    const token = this.state.user.token;
    const auth = {
      headers: {'Authorization': "bearer " + token}
    }
    const body = { userId, productId }
    axios.post(`${apiUrl}/cart`, body, auth)
  }

  componentDidMount(){
    try{
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        this.setState({
          authed: true,
          user
        })
      }
    } catch (e) {
      console.log(e)
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', this.localStorageUpdated)
  }
    axios.get(`${apiUrl}/product`)
    .then(res => {
      if(res.status !== 200 || res.data.length < 1){
        this.setState({ error: true })
      } else {
        this.setState({
          products: res.data,
          cache: res.data
        })
      }
    })
  }

  render() {
    return (
        <div>
        <Header/>
        <div class="contact">
        <select required className="form-control" id="category" onChange={this.onSelect}>
          <option value="All">All</option>
          <option value="Devices">Devices</option>
          <option value="Household">Household</option>
          <option value="Food">Food</option>
          <option value="Other">Other</option>
        </select>
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
                      {
                        this.state.authed ? <button className="btn btn-outline-primary" onClick={() => this.addToCart(product._id)}>Add to cart</button> : null
                      }
                    </tr>
                  ))
              }
            </tbody>
        </table>
        {
          this.state.error ? <h3>No data to display</h3> : null
        }
    </div> 
      </div>
    )
  }
}
