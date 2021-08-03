import React, { Component } from 'react'
import Header from './header';
import axios from 'axios';
import Shelf from './shelf';
export default class Library extends Component {
    constructor(props){
        super(props)
        this.state = {
          booklist: [], 
          shelfview: null
        }
        this.getShelves = this.getShelves.bind(this);
    }

    componentDidMount() {
      axios.get("https://cygnus-bookface.herokuapp.com/bookface/user/"+this.props.match.params.user)
      .then(res =>
        this.setState({booklist: res.data})
      );
    }

    // getShelves(books) {
    //   var shelves = {"Other": []}
    //   for (var b in books) {
    //     if (books[b].shelf && shelves.includes(books[b].shelf)) {
    //       shelves[books[b].shelf].push(books[b])
    //     }
    //     else if (books[b].shelf) {
    //       shelves[books[b].shelf] = [books[b]]
    //     }
    //     else {
    //       shelves["Other"].push(books[b])   // books[b] has no shelf name
    //     }
    //   }
    //   console.log(shelves)
    //   return shelves                        // returns dict of shelf name: book array
    // }

    render() {
        return (
            <div style={{overflow:'hidden'}}>
              <Header user={this.props.match.params.user}/>
              {this.getShelves(this.state.booklist).map(s => console.log(s))}
              {/* <Shelf shelfName="Book Club" booklist={this.state.booklist} />
              <Shelf shelfName="Summer Reading List" booklist={this.state.booklist} /> */}
            </div>
        )
    }
}
