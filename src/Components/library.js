import React, { Component } from 'react'
import Header from './header';
import Shelfify from './shelfify';
import firebase from 'firebase/app';
import "firebase/database";

export default class Library extends Component {
    constructor(props){
        super(props)
        this.state = {
          booklist: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      // const dbRef = firebase.database().ref();
      // dbRef.child("books").child(username).get()
      console.log("mounted");
      const dbRef = firebase.database().ref('shelves/'+this.props.match.params.user).get()
      .then((snapshot) => {
        console.log(snapshot)
        if (snapshot.exists()) {
          console.log(snapshot.val());
          // this.setState({booklist: res.data})
      }})
      .catch((error) => {
        console.error(error);
      });
  }

    render() {
        return (
            <div style={{overflow:'hidden'}}>
              <Header user={this.props.match.params.user}/>
              <Shelfify books={this.state.booklist} />
            </div>
        )
    }
}
