import React, { Component } from 'react'
import axios from 'axios'

export default class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
          keyword: ''
        };
    
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
      }
    
      handleSubmit(event) {
        alert(this.state.keyword + 'results logged to console')
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+this.state.keyword).then(res => console.log(res.data.items))
      }
    
      render() {
        return (
          <form onSubmit={this.handleSubmit}>
            <label>
              Search by book title: 
              <input type="text" name="keyword" value={this.state.keyword} onChange={this.handleChange} />
            </label>
            <br />
            <input type="submit" value="Submit" />
          </form>
        );
      }
    }