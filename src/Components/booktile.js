import axios from 'axios';
import React, {useState} from 'react'

export default function Booktile(props) {
    const [shelf, setShelf] = useState('');

    const [isShown, setIsShown] = useState(false);

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

  function showShelves() {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Add to shelf:
          <select value={shelf} onChange={e => setShelf(e.target.value)}>
            <option value="Grapefruit">Grapefruit</option>
            <option value="Lime">Lime</option>
            <option value="Coconut">Coconut</option>
            <option value="Mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Add to Shelf" />
      </form>
    )
  }

    return (
        <div className="book-list" onMouseEnter={() => setIsShown(true)} onMouseLeave={() => setIsShown(false)}>
            <img src={props.imgURL} alt="book cover" className="book-tile"/>
            <div>
                <b>{props.title}</b>
                <div>{props.author[0]}</div>
                <div>&copy; {props.year} </div>
                <div>ISBN-13:</div>
                <div>{props.isbn}</div>
            </div>
            {isShown && showShelves()}
        </div>
    )
}
