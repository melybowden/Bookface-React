import React, { useState } from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import logo from '../login_logo.svg';
import { FiPlus } from 'react-icons/fi';
import firebase from 'firebase/app';
import "firebase/database";

function CheckUserData(username, password, history, setToken) {
  const dbRef = firebase.database().ref();
  dbRef.child("users").child(username).get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      if (snapshot.val().password === password) {
        console.log("User logged in!");
        setToken(snapshot.val());
        history.push('/library/'+snapshot.val().username);
      }
      else {
        console.log("Username or password do not match.");
        history.push('/')
      }
    } else {
      console.log("User does not exist.");
      history.push('/createuser');
    }
  }).catch((error) => {
    console.error(error);
  });
}

export default function Login({setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    CheckUserData(username,password,history,setToken);
  }
  
  return (
      <div className="lockscreen">
        <img style={{height:"100%"}} src={logo} alt="BookFace-Logo" />
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <h1 style={{color: '#1877F2'}}>Login</h1>
            <input type="text" name="username"  placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
            <br />
            <input type="password" name="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <div style={{marginTop: "20%"}}>
            <Link to="/createuser" style={{color:"navy"}}>New User? Create Account Here <FiPlus /></Link>
          </div>
        </div>
      </div>
  )
}