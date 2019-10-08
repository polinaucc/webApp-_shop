import React, { Component } from 'react'
import axios from 'axios'
import Header from '../Components/Header'
import { apiUrl, fileUrl } from '../config';

export default class Admin extends Component {
  constructor(props){
    super(props);
    this.state = {
      forms: [],
      error: false
    }
  }

  componentDidMount(){
    axios.get(`${apiUrl}/form`)
      .then(res => {
        if(res.status !== 200 || res.data.length < 1){
          this.setState({ error: true })
        } else {
          this.setState({
            forms: res.data
          })
        }
      })
  }

  render() {
    return (
      <div>
        <Header/>
        <div class="contact">
        <table class="table">
            <thead>
              <tr>
                <th scope="col">id</th>
                <th scope="col">Name</th>
                <th scope="col">Organization</th>
                <th scope="col">Appeal type</th>
                <th scope="col">Message</th>
                <th scope="col">Attachment</th>
              </tr>
            </thead>
            <tbody id="forms_table_body">
              {
                this.state.forms.length > 0 &&
                  this.state.forms.map(form => (
                    <tr>
                      <th scope="row">{form._id}</th>
                      <td>{form.name}</td>
                      <td>{form.organization}</td>
                      <td>{form.appeal_type}</td>
                      <td>{form.message}</td>
                      <td><img src={fileUrl+form.attachment} style={{width: '10vw', height: '10vw'}}/></td>
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
