import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import logo from '../login_logo.svg';

export default class login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  handleSubmit(event) {
    alert('User: ' + this.state.username + ' logged in!');
    event.preventDefault();
    axios.post('https://mysterious-plains-09256.herokuapp.com/',{ 
      username: '',
      password:''
  })
  .then(results => console.log(results))
  .catch(error => console.log("error: " + error))
  }

  render() {
    return (
      <div className="lockscreen">
        <img style={{height:"100%"}} src={logo} alt="BookFace-Logo" />
        <div className="login-card">
          <form onSubmit={this.handleSubmit}>
            <h1 style={{color: '#1877F2'}}>Login</h1>
            <input type="text" name="username"  placeholder="Enter Username" value={this.state.username} onChange={this.handleChange} />
            <br />
            <input type="text" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <div style={{marginTop: "30%"}}>
            <Link to="/createuser" >New User? Create Account Here</Link>
          </div>
        </div>
      </div>
    );
  }
}
