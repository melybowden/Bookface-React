import React, { Component } from 'react'
// import Login from './login'
import logo from '../logo.svg'

export default class Header extends Component {
    constructor(props) {
      super(props)

      this.state = {
        username: '',
        password:''
      }

    }


    render() {
        return (
            <div className="header">
                {/* <Login /> */}
                <div className="flex-container">
                  <img src={logo} alt="logo" height={130} width={130} />
                  <h1>BookFace</h1>
                  <h3>Hello, {this.props.user}</h3> 
                  {/* TODO: Routes for user name */}
                </div>

                <div className="flex-container">
                  <button>Search here</button>
                  <button>My Library</button>
                </div>
            </div>
        )
    }
}
