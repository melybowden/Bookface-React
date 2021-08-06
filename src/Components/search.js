import React, { Component } from 'react'
import axios from 'axios'
import Booktile from './booktile';
import book_not_found from './book_not_found.jpg';
import Header from './header';
import firebase from "firebase/app";
import "firebase/database";
import { Redirect } from 'react-router-dom';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          keyword: '',
          searchRes: [],
          shelves:[],
          nRes:10
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getIdentifier = this.getIdentifier.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
      }

      componentDidMount() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString).username;
        firebase.database().ref('shelves/'+userToken)
        .on('value', (snapshot) => {
          if (snapshot.exists()) {
            console.log(Object.keys(snapshot.val()));
            this.setState({shelves: Object.keys(snapshot.val())});
        }})
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+this.state.keyword+'&maxResults='+this.state.nRes)
        .then(res => 
          this.setState({searchRes: res.data.items, nRes: Math.min(this.state.nRes+10,40)})
          // TODO: more error checking for when properties don't exist in Google API results
          // year: publishedDate YYYY-MM-DD
          // ISBN: industryIdentifiers[1].identifier ([0] is ISBN 10 not ISBN 13)
        );
      }

      getIdentifier(ids) {
        for (var i=0; i < ids.length; i++) {
          if (ids[i].type === "ISBN_13") {
            return ids[i].identifier;
          }
        }
        return ids[0].identifier.replace(/\D/g,''); 
      }
    
      render() {
        const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userToken === null) {
          return <Redirect to="/" />
          // var history = useHistory();
          // history.push('/');
        }
        return (
          <div style={{overflow:'hidden'}}>
            <Header user={this.props.match.params.user}/>
            <div className="form-box">
              <form onSubmit={this.handleSubmit} className="search-container" >
              <input type="text" className="search-keyword" name="keyword" value={this.state.keyword} placeholder="Search for a book..." onChange={this.handleChange} />
              <input type="submit" value="Search" />
              </form>
            </div>
            <div className="book-search">
            {this.state.searchRes.map(book => 
              <Booktile 
              key={book.volumeInfo.industryIdentifiers !== undefined ? this.getIdentifier(book.volumeInfo.industryIdentifiers) : "Unknown"} 
              title={book.volumeInfo.title !== undefined ? book.volumeInfo.title : "Title Unknown"} 
              author={book.volumeInfo.authors !== undefined ? book.volumeInfo.authors : ["Author Unknown"]} 
              year={book.volumeInfo.publishedDate !== undefined ? book.volumeInfo.publishedDate.substring(0,4) : "Year Unknown"} 
              isbn={book.volumeInfo.industryIdentifiers !== undefined ? this.getIdentifier(book.volumeInfo.industryIdentifiers) : "Unknown"}
              imgURL={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : book_not_found}
              shelf={this.state.shelves}
              user={JSON.parse(sessionStorage.getItem('token')).username}/>)}
            </div>
            {
              this.state.searchRes.length > 0 && this.state.nRes < 40 ? 
              <div className="form-box" style={{alignContent:'center',textAlign:'center',marginBottom:'5vh'}}>
              <form onSubmit={this.handleSubmit}>
                <input type="submit" value="Load more results"/>
              </form>
            </div> :
            <></>
            }
          </div>
        );
      }
    }