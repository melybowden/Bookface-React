import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './index.css';

import App from './App';
import CreateUser from './Components/createuser';
import Library from './Components/library';
import NotFound from './Components/notfound';
import Search from './Components/search';
import Goals from './Components/goals';

import firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyBms4IuOMYdZzqyobKqj1g4t68QvjruhNg",
    authDomain: "bookface-df88d.firebaseapp.com",
    databaseURL: "https://bookface-df88d-default-rtdb.firebaseio.com",
    projectId: "bookface-df88d",
    storageBucket: "bookface-df88d.appspot.com",
    messagingSenderId: "1068057280002",
    appId: "1:1068057280002:web:51eba2a9d14805cd06b11b"
  };

firebase.initializeApp(firebaseConfig);

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/search/:user" component={Search} />
        <Route path="/library/:user" component={Library} />
        <Route path="/goals/:user" component={Goals} />
        <Route path="/createuser" component={CreateUser} />
        {/* check for parameters first! */}
        <Route component={NotFound} />
      </Switch>
    </div>
  </Router> 
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();