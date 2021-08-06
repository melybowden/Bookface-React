import React, { Component } from 'react'
import Header from './header';
import Shelfify from './shelfify';
import firebase from 'firebase/app';
import "firebase/database";
import { Redirect } from 'react-router';

export default class Library extends Component {
    constructor(props){
        super(props)
        this.state = {
          booklist: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      firebase.database().ref('shelves/'+this.props.match.params.user)
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          this.setState({booklist: snapshot.val()}); //{shelf1:{book1:{},...}, ...}
        }
        else {
          console.log("snapshot does not exist");
          this.setState({booklist:[]})
        }
      })
  }

  componentWillUnmount() {
    const tokenString = sessionStorage.getItem('token');
    const userToken = JSON.parse(tokenString).username;
    firebase.database().ref('shelves/'+userToken)
    .on('value', (snapshot) => {
      if (snapshot.exists()) {
        this.setState({booklist: snapshot.val()}); //{shelf1:{book1:{},...}, ...}
      }
      else {
        this.setState({booklist:[]})
      }
    })
  }

    render() {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      if (userToken === null) {
        return <Redirect to="/" />
      }
        return (
            <div style={{overflow:'hidden'}}>
              <Header user={this.props.match.params.user}/>
              <Shelfify books={this.state.booklist} />
            </div>
        )
    }
}
