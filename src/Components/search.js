import React, { Component } from 'react'
import axios from 'axios'
import Booktile from './booktile';
import book_not_found from './book_not_found.jpg';
import Header from './header';

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          keyword: '',
          searchRes: []
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getIdentifier = this.getIdentifier.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        // alert(this.state.keyword + 'results logged to console')
        event.preventDefault();
        // axios.get("https://www.googleapis.com/books/v1/volumes?q="+this.state.keyword).then(res => console.log(res.data.items[0].volumeInfo.imageLinks.smallThumbnail))
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+this.state.keyword)
        .then(res => 
          // console.log(res.data.items),
          this.setState({searchRes: res.data.items})
          
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
          <div>
            <Header user={this.props.match.params.user}/>
            <form onSubmit={this.handleSubmit}>
              <label>
                Search by book title:  
                <input type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} />
              </label>
              <input type="submit" value="Search" />
            </form>
            <div className="book-search">
            {/* book.volumeInfo.industryIdentifiers[1].identifier */}
            {this.state.searchRes.map(book => 
              <Booktile key={this.getIdentifier(book.volumeInfo.industryIdentifiers)} 
              title={book.volumeInfo.title} 
              author={book.volumeInfo.authors} 
              year={book.volumeInfo.publishedDate.substring(0,4)} 
              isbn={this.getIdentifier(book.volumeInfo.industryIdentifiers)}
              imgURL={book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : book_not_found}/>)}
            </div>
          </div>
        );
      }
    }