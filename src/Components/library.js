import React, { Component } from 'react'
import Header from './header';
import Shelfify from './shelfify';
import firebase from 'firebase/app';
import "firebase/database";
import { Redirect } from 'react-router';
import { RiBook2Fill, RiBook2Line, RiStarFill, RiStarLine, RiUserFill, RiUserLine } from 'react-icons/ri';

export default class Library extends Component {
    constructor(props){
        super(props)
        this.state = {
          booklist: [],
          sortBy:'rating'
        }
        this.componentDidMount = this.componentDidMount.bind(this);
        this.sortOrder = this.sortOrder.bind(this);
        this.handleSortChange = this.handleSortChange.bind(this);
    }

    componentDidMount() {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString).username;
      firebase.database().ref('shelves/'+userToken)
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

  handleSortChange(e) {
    console.log(e);
    this.setState({sortBy:e});
  }

  sortOrder() {
    return(
    <h1 style={{display:'flex', flexFlow:'row', justifyContent:'center', padding:0, marginTop:'5vh'}}>
      <button style={{marginRight:'1vw'}} value='title' onClick={() => this.handleSortChange('title')}>{this.state.sortBy === 'title' ? <RiBook2Fill /> : <RiBook2Line />}</button>
      <button style={{marginRight:'1vw'}} value='author' onClick={() => this.handleSortChange('author')}>{this.state.sortBy === 'author' ? <RiUserFill /> : <RiUserLine />}</button>
      <button style={{marginRight:'1vw'}} value='rating' onClick={() => this.handleSortChange('rating')}>{this.state.sortBy === 'rating' ? <RiStarFill /> : <RiStarLine />}</button>
    </h1>)
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
              {this.sortOrder()}
              <Shelfify books={this.state.booklist} order={this.state.sortBy}/>
            </div>
        )
    }
}
