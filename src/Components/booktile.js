import firebase from 'firebase/app';
import "firebase/database";
import React, {useState} from 'react';


export default function Booktile(props) {
    const [shelf, setShelf] = useState('New Shelf');
    const [newShelf, setNewShelf] = useState('New Shelf');
    const [isShown, setIsShown] = useState(false);

    const handleSubmit = (event) => {
      event.preventDefault();
      var addTo = shelf === "New Shelf" ? newShelf : shelf;
      alert("Added " + props.title + " to " + addTo);

      // const book = {
      //   "title": props.title,
      //   "author": props.author[0],
      //   "imageURL": props.imgURL,
      //   "year": props.year,
      //   "isbn": props.isbn
      // }

      const shelfData = {
        "userdisplayname": props.user,
        "shelf": addTo,
        "title": props.title,
        "author": props.author[0],
        "imageURL": props.imgURL,
        "year": props.year,
        "isbn": props.isbn
      }

      // Add to books table
      // firebase.database().ref('books/' + props.isbn).set(book)
      // .then(function (response) {
      //   console.log(response);
      //   alert("Added " + props.title + " to " + addTo);
      // })
      // .catch(function (error) {
      //   console.log("error: "+error);
      // });
      // Add a shelf
      firebase.database().ref('shelves/' + props.user + '/' + addTo + '/' +props.isbn).set(shelfData)
      .then(function (response) {
        console.log(response);
        // alert("Added " + props.title + " to " + addTo);
      })
      .catch(function (error) {
        console.log("error: "+error);
      });

  }

  function cleanShelves(shelves) {
    var clean = []
    for (var b in shelves) {
      if (shelves[b].shelf !== undefined && !(clean.includes(shelves[b].shelf))) {
        clean.push(shelves[b].shelf)
      }
    }
    clean.push("New Shelf")
    return clean
  }

  function showShelves() {
    return (
      <form onSubmit={handleSubmit}>
        <label>
          Add to shelf:
          <select value={shelf} onChange={e => setShelf(e.target.value)}>
            {/* {props.shelf.map(b => <option value={b.shelf}>{b.shelf}</option>)} */}
            {cleanShelves(props.shelf).map(s => <option value={s}>{s}</option>)}
          </select>
        </label>
        {shelf === "New Shelf" ? <input type="text" placeholder="Enter a new shelf name" onChange={e => setNewShelf(e.target.value)}/> : <></>}
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
