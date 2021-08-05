import React, { useState } from 'react';
import logotype from '../welcome_logo.svg';
import { useHistory } from 'react-router-dom';
import firebase from "firebase/app";
import "firebase/database";

 function writeUserData(username, name, password) {
   firebase.database().ref('users/' + username).set({
     username: username,
     displayname: name,
     password : password
   });
 }

export default function CreateUser() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [displayname, setDisplayname] = useState('');
  let history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    writeUserData(username, displayname, password);
    alert('Welcome ' + displayname + "!");

    history.push("/");
  }

  return (
    <div className="lockscreen" style={{flexDirection:'column'}}>
        <img src={logotype} alt="Bookface logotype" style={{width:'600px', marginTop:'100px'}}/>
        <form onSubmit={handleSubmit} className="login-card">
          <h1 style={{color: '#1877F2'}}>Create Account</h1>
          <input type="text" name="username" placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
          <input type="text" name="displayname" placeholder="Enter Display Name" value={displayname} onChange={e => setDisplayname(e.target.value)} />
          <br />
          <input type="password" name="password"placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
          <br />
          <input type="submit" value="Submit" />
          <div style={{marginTop: "30%"}}>
          </div>
        </form>
      </div>
  )
}