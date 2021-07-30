import React, { Component } from 'react'
import logo from '../logo_white.svg'
import text_logo from '../text_logo.svg'
import { Link } from 'react-router-dom'

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
                <div className="flex-container" style={{padding:'2vh'}}>
                  <div className="flex-logo">
                  <img src={logo} alt="logo" height={40} width={40} />
                  <img src={text_logo} alt="Bookface" height={40}/>
                  </div>
                  <div><Link to="/search" className="header-link">Search</Link></div>
                  <div><Link to="/library" className="header-link">My Library</Link></div>
                  <h3 style={{color:'white'}}>Hello, {this.props.user}</h3> 
                </div>

                {/* <div className="flex-container">
                  <button>Search here</button>
                  <button>My Library</button>
                </div> */}
            </div>
        )
    }
}
