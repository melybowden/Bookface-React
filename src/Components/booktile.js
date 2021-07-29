import axios from 'axios';
import React, {useState} from 'react'
// import book_not_found from './book_not_found.jpg';

export default function Booktile(props) {
    const [shelf, setShelf] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      alert("Added " + props.title + " to " + shelf)
      // axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.post("https://mysterious-plains-09256.herokuapp.com/bookface", 
      // {"title": "harry potter",
      // "author": "jk rowling",
      // "imageURL": "google.com",
      // "year": 1998,
      // "isbn": 123}
      {"title": props.title,
      "author": props.author[0],
      "imageURL": props.imgURL,
      "year": props.year,
      "isbn": props.isbn}
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("error: "+error);
      });

      // const data = {    title: 'abc',  author: 'abc',  imageURL: 'google.com',  year: 123,  isbn: 123}
      // fetch('https://bookface-df88d.web.app', {  method: 'POST',  headers: {    'Content-Type': 'application/json', 'Mode':'cors' },  body: JSON.stringify(data),})
      // .then(response => response.json())
      // .then(data => {  console.log('Success:', data);})
      // .catch((error) => {  console.error('Error:', error);});

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
