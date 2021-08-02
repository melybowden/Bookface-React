import React, { Component } from 'react'

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
  }

  render() {
    return (
      <div className="lockscreen">
      <form onSubmit={this.handleSubmit} className="login-card">
        <label>
          Username: 
          <input type="text" name="username" value={this.state.username} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Password: 
          <input type="text" name="password" value={this.state.password} onChange={this.handleChange} />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
      </div>
    );
  }
}
