import React, { Component } from 'react'
import logo from '../logo_white.svg'
import text_logo from '../text_logo.svg'

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
                <div className="flex-container" style={{paddingTop:'2vh'}}>
                  <img src={logo} alt="logo" height={80} width={80} />
                  <img src={text_logo} alt="Bookface" height={80}/>
                  <h3>Hello, {this.props.user}</h3> 
                </div>

                <div className="flex-container">
                  <button>Search here</button>
                  <button>My Library</button>
                </div>
            </div>
        )
    }
}
