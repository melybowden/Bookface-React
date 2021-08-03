import './App.css';

// import Header from './Components/header';
// import Library from './Components/library';
// import Search from './Components/search';
import React from 'react';
import Login from './Components/login';
import useToken from './Components/useToken';

function App() {
  const { token, setToken } = useToken();

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
