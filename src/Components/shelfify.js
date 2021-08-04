import React, { useState } from 'react';
import Shelf from './shelf';

export default function Shelfify(props) {

  function getShelves(books) {
    var shelves = {"Other": []}
    for (var b in books) {
      if (books[b].shelf && shelves[books[b].shelf] !== undefined) {
        shelves[books[b].shelf].push(books[b])
      }
      else if (books[b].shelf) {
        shelves[books[b].shelf] = [books[b]]
      }
      else {
        shelves["Other"].push(books[b])   // books[b] has no shelf name
      }
    }
    var shelfList = []
    for (var s in shelves) {
      if (shelves[s].length > 0) {        // Hide empty shelves
        shelfList.push({name:s, data:shelves[s]})
      }
    }
    return shelfList                      // returns list of shelf name: book array (data)
  }

    return (
        <div>
            {getShelves(props.books).map(s => <Shelf key={s.name} shelfName={s.name} booklist={s.data}/> )}
        </div>
    )
}
