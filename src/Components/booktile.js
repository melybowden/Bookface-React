import axios from 'axios';
import React, {useState} from 'react'
import book_not_found from './book_not_found.jpg';

export default function Booktile(props) {
    const [shelf, setShelf] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      alert("Added " + props.title + " to " + shelf)
      axios.post("http://mysterious-plains-09256.herokuapp.com/bookface", 
        {title: props.title,
        author: props.author,
        imageURL: props.imgURL,
        year: props.year,
        isbn: props.isbn})
  }

    return (
        <div className="book-list">
            <img src={props.imgURL} alt="book cover" className="book-tile"/>
            {/* TODO: Fix for undefined book images */}
            <div>
                <b>{props.title}</b>
                <div>{props.author}</div>
                {/* TODO: Handle multiple authors */}
                <div>&copy; {props.year} </div>
                <div>ISBN-13:</div>
                <div>{props.isbn}</div>
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                Pick your favorite flavor:
                {/* <select value={shelf} onChange={e => console.log(e.target.value)}> */}
                <select value={shelf} onChange={e => setShelf(e.target.value)}>
                  <option value="grapefruit">Grapefruit</option>
                  <option value="lime">Lime</option>
                  <option value="coconut">Coconut</option>
                  <option value="mango">Mango</option>
                </select>
              </label>
              <input type="submit" value="Submit" />
            </form>
        </div>
    )
}
