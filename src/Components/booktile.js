import React from 'react'
import book_not_found from './book_not_found.jpg';

export default function booktile(props) {
    return (
        <div className="book-list">
            <img src={book_not_found} alt="book cover" className="book-tile"/>
            <div>{props.title} by {props.author} &copy; {props.year}</div>
        </div>
    )
}
