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
      firebase.database().ref('shelves/'+this.props.match.params.user)
      .on('value', (snapshot) => {
        if (snapshot.exists()) {
          // console.log("shelves",snapshot.val());
          this.setState({booklist: snapshot.val()}); //{shelf1:{book1:{},...}, ...}
        }
        else {
          console.log("snapshot does not exist");
          this.setState({booklist:[]})
        }
      })
      // const dbRef = firebase.database().ref('shelves/'+this.props.match.params.user).get()
      // .then((snapshot) => {
      //   if (snapshot.exists()) {
      //     console.log("shelves",snapshot.val());
      //     this.setState({booklist: snapshot.val()}); //{shelf1:{book1:{},...}, ...}
      // }})
      // .catch((error) => {
      //   console.error(error);
      // });
  }

  componentWillUnmount() {
    firebase.database().ref('shelves/'+this.props.match.params.user)
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
        return (
            <div style={{overflow:'hidden'}}>
              <Header user={this.props.match.params.user}/>
              {/* {this.state.booklist.map(s => console.log(s))} */}
              <Shelfify books={this.state.booklist} />
            </div>
        )
    }
}
