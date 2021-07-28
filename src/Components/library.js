import React, { Component } from 'react'
import Booktile from './booktile'

export default class Library extends Component {
    constructor(props){
        super(props)
        this.state={ booklist: [
            {
                "title":"Harry Potter",
                "author":"JK Rowling",
                "year":1998
            },
            {
                "title":"To Kill a Mockingbird",
                "author":"Harper Lee",
                "year":1960
            },
            {
                "title":"Lord of the Rings",
                "author":"JRR Tolkien",
                "year":1954
            }
        ]}
    }

   

    render() {
        return (
            <div>
              {this.state.booklist.map(book=><Booktile title={book.title} author={book.author} year={book.year}/>)}
            </div>
        )
    }
}
