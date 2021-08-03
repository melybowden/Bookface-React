import './App.css';

// import Login from "./Components/login";
// import Header from "./Components/header";
// import Library from './Components/library';
import Search from './Components/search';
import React, { useState } from 'react';
import Login from './Components/login';


function App() {
  const [token, setToken] = useState();

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
