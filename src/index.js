import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import './index.css';

import App from './App';
import CreateUser from './Components/createuser';
import Library from './Components/library';
import Login from './Components/login';
import NotFound from './Components/notfound';
import Search from './Components/search';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={App} />
        <Route path="/search/:user" component={Search} />
        <Route path="/library/:user" component={Library} />
        <Route path="/search" component={Search} />
        <Route path="/library" component={Library} />
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