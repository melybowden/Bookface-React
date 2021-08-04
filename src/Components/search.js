import React, { Component } from 'react'
import axios from 'axios'
import Booktile from './booktile';
import book_not_found from './book_not_found.jpg';
import Header from './header';
import firebase from "firebase/app";
import "firebase/database";

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          keyword: '',
          searchRes: [],
          shelves:[]
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getIdentifier = this.getIdentifier.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
      }

      componentDidMount() {
        // console.log("https://cygnus-bookface.herokuapp.com/bookface/user/"+this.props.match.params.user)
        axios.get("https://cygnus-bookface.herokuapp.com/bookface/user/"+this.props.match.params.user)
        .then(res =>
          // console.log(res.data)
          this.setState({shelves: res.data})
          )
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+this.state.keyword)
        .then(res => 
          this.setState({searchRes: res.data.items})
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
        return (
          <div style={{overflow:'hidden'}}>
            <Header user={this.props.match.params.user}/>
            <form onSubmit={this.handleSubmit} >
              <input type="text" name="keyword" value={this.state.keyword} placeholder="Search for a book..." onChange={this.handleChange} />
              <input type="submit" value="Search!" />
            </form>
            <div className="book-search">
            {this.state.searchRes.map(book => 
              <Booktile key={this.getIdentifier(book.volumeInfo.industryIdentifiers)} 
              title={book.volumeInfo.title} 
              author={book.volumeInfo.authors} 
              year={book.volumeInfo.publishedDate.substring(0,4)} 
              isbn={this.getIdentifier(book.volumeInfo.industryIdentifiers)}
              imgURL={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : book_not_found}
              shelf={this.state.shelves}
              user={this.props.match.params.user}/>)}
            </div>
          </div>
        );
      }
    }