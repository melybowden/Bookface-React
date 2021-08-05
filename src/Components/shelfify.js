import React, { useState } from 'react';
import Shelf from './shelf';

export default function Shelfify(props) {

  function getShelves(shelves) {
    // var shelves = {"Other": []}
    // for (var b in books) {
    //   if (books[b].shelf && shelves[books[b].shelf] !== undefined) {
    //     shelves[books[b].shelf].push(books[b])
    //   }
    //   else if (books[b].shelf) {
    //     shelves[books[b].shelf] = [books[b]]
    //   }
    //   else {
    //     shelves["Other"].push(books[b])   // books[b] has no shelf name
    //   }
    // }
    var shelfList = []
    for (var s in shelves) {
      // console.log(shelves[s])
      var bookList = []
      for (var b in shelves[s]) {
        // console.log(shelves[s][b])
        // shelfList.push({name:s, data:shelves[]})
        bookList.push(shelves[s][b]);
      }
      if (bookList.length > 0) {        // Hide empty shelves
        shelfList.push({name:s, data:bookList})
      }
    }
    console.log(shelfList)
    return shelfList                      // returns list of shelf name: book array (data)
  }

    return (
        <div>
            {getShelves(props.books).map(s => <Shelf key={s.name} shelfName={s.name} booklist={s.data}/> )}
            {/* {props.books.map(s => console.log(s) )} */}
        </div>
    )
}
