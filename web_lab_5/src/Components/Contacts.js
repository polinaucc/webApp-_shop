import React, { Component } from 'react'
import Header from '../Components/Header';
import { apiUrl } from '../config';

import axios from 'axios';

const initialState = {
  form: {
    name: '',
    appeal_type: 'Press',
    message: '',
    attachment: ''
  },
  productsList: [],
  error: false,
  success: false
}

export default class Contacts extends Component {
  constructor(props){
    super(props);
    this.state = initialState;
  }

  onChange = e => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.id] : e.target.value
      }
    })
  }

  getFile = e => {
    this.setState({
      form: {
        ...this.state.form,
        attachment: e.target.files[0]
      }
    })
  }

  onSubmit = e => {
    e.preventDefault();

    const formData = new FormData();
    
    for(let i in this.state.form){
      formData.append(i, this.state.form[i])
    }

    axios.post(`${apiUrl}/form`, formData)
      .then(res => {
        if(res.status !== 200){
          this.setState({
            error: true
          })
        } else {
          this.setState({
            ...initialState,
            success: true
          })
        }
      })
  }
  

  render() {
    return (
      <div>
        <Header/>
        <div class="contact">
        <div class="row">
            <div class="col-md-4">
                <h2>Consultations and order by phone</h2>
                Order
                <h2>(044) 537-02-22</h2>
                <h2>(044) 537-02-22</h2>
                Technical support
                <h2>0-800-303-344</h2>
            </div>
            <div class="col-md-4">
                <h2>Schedule of call centers</h2>
                <h4>from 8:00 to 21:00</h4>
                <h6>On Saturday: from 9:00 to 21:00</h6>
                <h6>On Sunday: from 11:00 to 21:00</h6>
            </div>
        </div>
            <form id="contact_form" onSubmit={this.onSubmit}>
              <div class="form-group">
                <label for="name_field">Name</label>
                <input
                  required={true}
                  type="text"
                  class="form-control"
                  id="name"
                  placeholder="John"
                  value={this.state.form.name}
                  onChange={this.onChange}
                />
              </div>
              <div class="form-group">
                  <label for="organization_field">Organization</label>
                  <input
                    required={true}
                    type="text"
                    class="form-control"
                    id="organization"
                    placeholder="Tesla"
                    value={this.state.form.organization}
                    onChange={this.onChange}
                    />
                </div>
              <div class="form-group">
                <label for="appeal_type">Type of appeal</label>
                <select required={true} class="form-control" id="appeal_type" onChange={this.onChange}>
                  <option>Press</option>
                  <option>Partnership</option>
                  <option>Other</option>
                </select>
              </div>
              <div class="form-group">
                <label for="message_field">Your message</label>
                <textarea
                  required={true}
                  class="form-control"
                  id="message"
                  rows="3"
                  value={this.state.form.message}
                  onChange={this.onChange}
                  >
                  </textarea>
              </div>
              <div class="form-group">
                <label for="attachment_field">Attachment</label>
                <input required={true}
                  type="file"
                  class="form-control-file"
                  accept="image/*"
                  id="attachment"
                  onChange={this.getFile}
                  />
              </div>
              <input type="submit" class="btn btn-primary"/>
          </form>
          {
            this.state.success ?
              <h3 style={{color: 'green'}} id="success_message">Data written successfully</h3>
              : null
          }
          {
            this.state.error ?
              <h3 style={{color: 'red'}} id="fail_message">Error</h3>
              : null
          }
        </div>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2540.6347868625667!2d30.449400315697744!3d50.44790297947501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cc26fd25e1e1%3A0xe9c8486538484580!2z0YPQuy4g0JDQutCw0LTQtdC80LjQutCwINCv0L3Qs9C10LvRjywgMjAsINCa0LjQtdCyLCAwMjAwMA!5e0!3m2!1sru!2sua!4v1555886111248!5m2!1sru!2sua" width="100%" height="450" frameborder="0" style={{border:0}} allowfullscreen></iframe>
      </div>
    )
  }
}
