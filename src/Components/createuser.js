import axios from 'axios';
import React, { Component } from 'react'

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      Display_Name: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('User: ' + this.state.username + ' Created ');
    event.preventDefault();
    axios.post('https://mysterious-plains-09256.herokuapp.com/',{ 
    username: '',
    password:'',
    Display_Name: ''
})
.then(results=>console.log(results))
  }

  render() {
    return (
      <div className="lockscreen">
      <form onSubmit={this.handleSubmit} className="login-card">
      <h1 style={{color: '#1877F2'}}>Create Account</h1>
          <input type="text" name="username" placeholder="Enter Username" value={this.state.username} onChange={this.handleChange} />
      
          <input type="text" name="Display_Name" placeholder="Enter Display Name" value={this.state.Display_Name} onChange={this.handleChange} />
        <br />

          <input type="text" name="password"placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />

        <br />
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}