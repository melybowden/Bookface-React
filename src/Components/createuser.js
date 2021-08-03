import axios from 'axios';
import React, { Component } from 'react';
import logotype from '../welcome_logo.svg';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password:'',
      displayname: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
    // TODO: Check if username is available on change (GET)
    // TODO: Check pw meets criteria
    // TODO: retype pw & ensure matching
    // TODO: flavor text for creating username, un vs display name, and creating pw
    // TODO: prevent submission until username unique (in DB) & pw criteria met
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post('https://cygnus-bookface.herokuapp.com/users/register', this.state)
    .then(results => 
      // console.log(results)
      alert(results.data.first)
    )
    .catch(error => 
      console.log("error: " + error))
  }

  render() {
    return (
      <div className="lockscreen" style={{flexDirection:'column'}}>
        <img src={logotype} alt="Bookface logotype" style={{width:'600px', marginTop:'100px'}}/>
        <form onSubmit={this.handleSubmit} className="login-card">
          <h1 style={{color: '#1877F2'}}>Create Account</h1>
          <input type="text" name="username" placeholder="Enter Username" value={this.state.username} onChange={this.handleChange} />
          <input type="text" name="displayname" placeholder="Enter Display Name" value={this.state.displayname} onChange={this.handleChange} />
          <br />
          <input type="password" name="password"placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}