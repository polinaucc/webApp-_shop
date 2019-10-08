import React, { Component } from 'react'
import Header from '../Components/Header';
import { apiUrl } from '../config';
import { Route, Redirect } from 'react-router'

import axios from 'axios';

const initialState = {
  form: {
    product_name: '',
    description: '',
    category: 'Devices',
    product_image: ''
  },
  selectedProductId: '',
  isEditing: false,
  editImage: false,
  defaultSelect: true,
  error: false,
  success: false,
  authed: false
}

export default class NewProduct extends Component {
  constructor(props){
    super(props);
    this.state = {
      ...initialState,
      allProducts: [],
    };
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

  getAllProducts = () => axios.get(`${apiUrl}/product`)
    .then(products => this.setState({ allProducts: products.data }))


  componentWillMount(){
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
    this.getAllProducts();
  }

  onChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id] : e.target.value
      }
    })
  }

  onSelect = e => {
    this.fillForm(e.target.value)
  }

  fillForm = _id => {
    const newForm = this.state.allProducts.filter(field => field._id === _id);

    this.setState({
      form: newForm[0],
      defaultSelect: false,
      isEditing: _id === 'Empty option' ? false : true,
      selectedProductId: '/'+_id
    })
  }

  getFile = e => {
    this.setState({
      form: {
        ...this.state.form,
        product_image: e.target.files[0]
      },
      editImage: true
    })
  }

  clearState = () => {
    this.setState({...initialState, authed: this.state.authed})
  }

  makeFormData = () => {
    const formData = new FormData();
    
    for(let i in this.state.form){
      formData.append(i, this.state.form[i])
    }

    return formData;
  }

  makeRequest = () => {
    const formData = this.makeFormData();
    const token = this.state.user.token;
    const auth = {
      headers: {'Authorization': "bearer " + token}
    }
    const requestData = [`${apiUrl}/product${this.state.selectedProductId}`, formData, auth]
    return type => {
      if(type === 'post'){
        return axios.post(...requestData)
      } else {
        return axios.put(...requestData)
      }
    }
  }

  onDelete = () => {
    const token = this.state.user.token;
    const auth = {
      headers: {'Authorization': "bearer " + token}
    }
    axios.delete(`${apiUrl}/product${this.state.selectedProductId}`, auth)
      .then(res => {
        if(res.status !== 200){
          this.setState({
            error: true
          })
        } else {
          this.setState({
            ...initialState,
            authed: this.state.authed,
            success: true
          })
        }
      })
      .then(() => this.getAllProducts())
  }

  onSubmit = e => {
    e.preventDefault();

    const requestType = this.state.isEditing ? 'put' : 'post'

    const request = this.makeRequest()(requestType)

    request
      .then(res => {
        if(res.status !== 200){
          this.setState({
            error: true
          })
        } else {
          this.setState({
            ...initialState,
            authed: this.state.authed,
            success: true
          })
        }
      })
      .then(() => this.getAllProducts())
      .catch(err => {
        this.setState({
          error: true
        })
      })
  }

  render() {
    return (
      this.state.authed && this.state.user.isAdmin ?
      <div>
        <Header/>
      <div className="contact">
      <label htmlFor="inputGroupSelect04">Select product</label>
      <div className="input-group">
        <select onChange={this.onSelect} className="custom-select" id="inputGroupSelect04">
          <option disabled={true} value='Empty option' selected={this.state.defaultSelect}>Empty option</option>
            {
              this.state.allProducts &&
              this.state.allProducts.map(product => (
                <option value={product._id} key={product._id}>{product.product_name}</option>
              ))
            }
        </select>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" onClick={this.clearState} type="button">Clear</button>
        </div>
      </div>
        <form id="product_form" onSubmit={this.onSubmit}>
        <label htmlFor="product_name">Product name</label>
        <div className="form-group">
          <input
            required
            type="text"
            className="form-control"
            id="product_name"
            placeholder="iPhone"
            value={this.state.form.product_name}
            onChange={this.onChange}
          />
        </div>
        <div className="form-group">
            <label htmlFor="description">Decription</label>
            <input
              required
              type="text"
              className="form-control"
              id="description"
              placeholder="Product description"
              value={this.state.form.description}
              onChange={this.onChange}
            />
          </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select required className="form-control" id="category" onChange={this.onChange}>
            <option>Devices</option>
            <option>Household</option>
            <option>Food</option>
            <option>Other</option>
          </select>
        </div>
        <div className="form-group">
        <label htmlFor="product_image">Product image</label>
        <div class="custom-file">
          <input
            type="file"
            class="custom-file-input"
            required={!this.state.isEditing}
            accept="image/*"
            id="product_image"
            onChange={this.getFile}
          />
          <label class="custom-file-label" for="product_image">{this.state.form.product_image ? 'File chosen' : 'Choose file'}</label>
        </div>
        </div>
        <input type="submit" disabled={this.state.isEditing} className="btn btn-primary" style={{ marginRight: '1vw' }}/>
        <input type="submit" disabled={!this.state.isEditing} className="btn btn-primary" style={{ marginRight: '1vw' }} value="Edit"/>
        <input type="button" disabled={!this.state.isEditing} className="btn btn-primary" value="Delete" onClick={this.onDelete}/>
    </form>
    {
      this.state.success ? <h3 style={{color: 'green'}} id="success_message">Operation successfull</h3> : null
    }
    {
      this.state.error ? <h3 style={{color: 'red'}} id="fail_message">Error</h3> : null
    }
      </div>
      </div>
      : <Redirect to="/login"/>
    )
  }
}
