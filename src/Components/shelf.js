import React from 'react'
import book_not_found from './book_not_found.jpg'

export default function Shelf(props) {
  function coverimage(props){
  return <div className = "book-tmb" style = {{backgroundColor: "red"}}>{ props.title} by {props.author}</div> 





  }






    const Book = (props) =>
     <div className="book">
       {props.img != book_not_found ? <img src={props.img} alt="book cover" className="book-tmb"></img>:coverimage(props)}
       <b>{props.title}</b>
       </div>

    return (
      <div className= "shelf">
      <h3>{props.shelfName}</h3>
        
        <div className="scrolling-wrapper-flexbox">
          {props.booklist.map(book => <div className="card"><Book key={book.title} img={book.imageURL} title={book.title } author= {book.author}/></div>)}
        </div>
      </div>
    )
}
