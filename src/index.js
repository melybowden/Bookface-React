import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ReactDom from 'react-dom';
import { Route, NavLink, Link, BrowserRouter as Router, Switch } from 'react-router-dom';
import CreateUser from './Components/createuser';
import App from './App';
import Library from './Components/library';
import Login from './Components/login';
import NotFound from './Components/notfound';
import Search from './Components/search';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route path="/login" component={Login} />
        <Route exact path="/" component={Login} />
        <Route path="/search/:user" component={Search} />
        <Route path="/library/:user" component={Library} />
        <Route path="/search" component={Search} />
        <Route path="/library" component={Library} />
        <Route path="/createuser" component={CreateUser} />
        {/* <Route path="/users/:id" component={Users} />  */}
        {/* check for parameters first! */}
        {/* <Route path="/users" component={Users} /> */}
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