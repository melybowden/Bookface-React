import './App.css';

// import Login from "./Components/login";
// import Header from "./Components/header";
// import Library from './Components/library';
import Search from './Components/search';
import React, { useState } from 'react';
import Login from './Components/login';

function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken)); 
  // Expects {token: 'test123'}
}

function getToken() {
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}

function App() {
  const token = getToken();

  if(!token) {
    return <Login setToken={setToken} />
  }

  return (
    <div>
      <h1>App.js</h1>
    </div>
  );
}

export default App;
