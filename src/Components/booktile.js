import axios from 'axios';
import React, {useState} from 'react'

export default function Booktile(props) {
    const [shelf, setShelf] = useState('');

    const handleSubmit = (event) => {
      event.preventDefault();
      
      const body = {
        "title": props.title,
        "author": props.author[0],
        "imageURL": props.imgURL,
        "year": props.year,
        "isbn": props.isbn
      }

      // axios.defaults.headers.post['Content-Type'] = 'application/json';
      axios.post("https://mysterious-plains-09256.herokuapp.com/bookface", body)
      .then(function (response) {
        console.log(response);
        alert("Added " + props.title + " to " + shelf);
      })
      .catch(function (error) {
        console.log("error: "+error);
      });
  }

    return (
        <div className="book-list">
            <img src={props.imgURL} alt="book cover" className="book-tile"/>
            <div>
                <b>{props.title}</b>
                <div>{props.author[0]}</div>
                <div>&copy; {props.year} </div>
                <div>ISBN-13:</div>
                <div>{props.isbn}</div>
            </div>
            <form onSubmit={handleSubmit}>
              <label>
                Pick your favorite flavor:
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
