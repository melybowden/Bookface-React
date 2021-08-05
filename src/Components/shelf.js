import React, { useState } from 'react'
import book_not_found from './book_not_found.jpg'
import ReactStars from "react-rating-stars-component";
import firebase from 'firebase/app';
import "firebase/database";
import { FiMinusCircle } from 'react-icons/fi';
import { MdEdit } from 'react-icons/md';

export default function Shelf(props) {
      function coverimage(props){
        return <div className="book-tmb" style={{backgroundColor:"#74ABE2", margin:'2vh', padding:'1vh', height:'13vh'}}>{props.title} by {props.author}</div> 
      }
      
      function Book(props) {
        const [show, setShow] = useState();
        const username = props.token.username;
        const shelf = props.shelfName;
        const id = props.isbn;
        
        function ratingChanged(newRating, username, shelf, id) {
          firebase.database().ref('shelves/'+username+'/'+shelf+'/'+id).update({rating:newRating})
        } 

        return (
          <div className="book" onMouseEnter={e => setShow(true)} onMouseLeave={e => setShow(false)}>
            {show ? <h2 style={{textAlign:'right',padding:0,margin:0}}><FiMinusCircle onClick={() => remove(props.token.username,props.shelfName,props.isbn)}/></h2> : <></>}
            {props.img !== book_not_found ? <img src={props.img} alt="book cover" className="book-tmb"></img>:coverimage(props)}
            <b>{props.title}</b>
            <ReactStars
              count={5}
              onChange={e => ratingChanged(e, username, shelf, id)}
              size={24}
              activeColor="#ffd700"
              value={props.rating}
            />
          </div>
          )
      };
    
    function remove(username, shelf, id) {
      console.log(username,shelf,id)
      firebase.database().ref('shelves/'+username+'/'+shelf+'/').child(id).remove()
      .then(() => console.log("removed"))
      .catch((error) => console.log("error", error))
    }

    function renameShelf(oldName, newName, username) {
      firebase.database().ref('shelves/'+username+'/'+oldName).get()
      .then((snapshot) => {
        console.log(snapshot.val())
        firebase.database().ref('shelves/'+username+'/'+oldName).remove()
        firebase.database().ref('shelves/'+username+'/'+newName).set(snapshot.val())
      })
      .catch((error) => console.log(error))
    }

    let token = JSON.parse(sessionStorage.getItem("token"));
    const [edit, setEdit] = useState();
    const [newName, setName] = useState('');
    
    return (
      <div className="shelf" >
      <h3 style={{textAlign:'left',display:'flex',flexFlow:'row'}} onMouseEnter={() => setEdit(true)} onMouseLeave={() => setEdit(false)}>{props.shelfName}  
      {edit ? 
        <form className="form-box" style={{marginLeft:'1vw'}} onSubmit={() => renameShelf(props.shelfName,newName,token.username)}> 
          <input type="text" value={newName} placeholder="Rename bookshelf" onChange={e => setName(e.target.value)}/>
          <MdEdit style={{marginLeft:'1vw'}} onClick={() => renameShelf(props.shelfName,newName,token.username)}/> 
        </form> 
        : <></>
      }</h3>
        <div className="scrolling-wrapper-flexbox">
          {
          props.booklist.map(book => 
            <div className="card" key={book.title} >
              
            <Book key={book.title} img={book.imageURL} title={book.title} author={book.author} token={token} shelfName={props.shelfName} isbn={book.isbn} rating={book.rating?book.rating:0}/>
            </div>)
          }
        </div>
      </div>
    )
}
