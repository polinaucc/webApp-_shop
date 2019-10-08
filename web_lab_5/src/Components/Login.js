import React, { Component } from 'react'
import Header from './Header';
import axios from 'axios';
import { apiUrl } from '../config';

const initialState = {
  form: {
    username: '',
    password: ''
  },
  clearText: false,
  error: false,
  success: false
}

export default class Login extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  showPassword = () => this.setState({ clearText: !this.state.clearText })

  onChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id] : e.target.value
      }
    })
  }

  clearState = () => this.setState(initialState)

  makeFormData = () => {
    const formData = new FormData();
    
    for(let i in this.state.form){
      formData.append(i, this.state.form[i])
    }

    return formData;
  }

  onSumit = e => {
    this.setState({ error: false, success: false })
    e.preventDefault();

    const formData = this.makeFormData();

    axios.post(`${apiUrl}/login`, formData)
      .then(res => {
        if(res.status !== 200){
          this.setState({
            error: true,
            success: false
          })
        } else {
          try{
            localStorage.setItem('user', JSON.stringify(res.data))
          } catch (e){
            console.log(e)
          }
          this.setState({
            ...initialState,
            success: true,
            error: false
          })
        }
      })
  }

  render() {
    return (
      <div>
        <Header />
        <div style={{ marginLeft: '30%' }}>
        <form style={{width: '30vw'}} onSubmit={this.onSumit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              className="form-control"
              type="text"
              value={this.state.form.username}
              onChange={this.onChange}
              required
              />
          </div>
        <label htmlFor="password">Password</label>
        <div className="form-group" style={{ display: 'flex' }}>
          <input
            id="password"
            className="form-control"
            type={this.state.clearText ? 'text' : 'password'}
            value={this.state.form.password}
            onChange={this.onChange}
            required
            />
            <div style={{ width: '3vw', marginLeft: '1vw' }} onClick={this.showPassword}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22"><g transform="matrix(.02146 0 0 .02146 1 1)" fill="#4d4d4d"><path d="m466.07 161.53c-205.6 0-382.8 121.2-464.2 296.1-2.5 5.3-2.5 11.5 0 16.9 81.4 174.9 258.6 296.1 464.2 296.1 205.6 0 382.8-121.2 464.2-296.1 2.5-5.3 2.5-11.5 0-16.9-81.4-174.9-258.6-296.1-464.2-296.1m0 514.7c-116.1 0-210.1-94.1-210.1-210.1 0-116.1 94.1-210.1 210.1-210.1 116.1 0 210.1 94.1 210.1 210.1 0 116-94.1 210.1-210.1 210.1" /><circle cx="466.08" cy="466.02" r="134.5"/></g></svg>
            </div>
        </div>
        <input type="submit" className="btn btn-primary"/>
        </form>
        {
          this.state.success ? <h3 style={{color: 'green'}} id="success_message">Operation successfull</h3> : null
        }
        {
          this.state.error ? <h3 style={{color: 'red'}} id="fail_message">Error</h3> : null
        }
        </div>
      </div>
    )
  }
}
