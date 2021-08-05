import React from 'react'
import logo from '../logo_white.svg'
import text_logo from '../text_logo.svg'
import { NavLink, useHistory } from 'react-router-dom'
import { BiSearch, BiUserCircle } from 'react-icons/bi'
import { ImBooks } from 'react-icons/im'
import {GiStairsGoal} from 'react-icons/gi'

export default function Header(props) {
  function signOut(history) {
    sessionStorage.removeItem('token');
    history.push("/");
    console.log("sign out")
  }

  let userDN = JSON.parse(sessionStorage.getItem('token')).displayname;
  let user = JSON.parse(sessionStorage.getItem('token')).username;
  // console.log(user)
  let history = useHistory();
  return (
    <div className="header">
        <div className="flex-container" justify content="space-between" style={{padding:'3vh'}}>
          <div className="flex-logo">
            <img src={logo} alt="logo" height={40} width={40} />
            <img src={text_logo} alt="Bookface" height={40}/>
          </div>
          <h3 className="header-link"><NavLink to={"/search/"+user} activeClassName="active"><BiSearch />  Search</NavLink></h3>
          <h3 className="header-link"><NavLink to={"/library/"+user} activeClassName="active"><ImBooks />  My Library</NavLink></h3>
          <h3 className="header-link"><NavLink to={"/goals/"+user} activeClassName="active"><GiStairsGoal />  My Goals</NavLink></h3>
          <h3 style={{color:'white'}} onClick={() => signOut(history)}><BiUserCircle />  Hello, {userDN}</h3> 
        </div>
    </div>
  )
}