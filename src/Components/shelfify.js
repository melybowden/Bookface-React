import React, { useState } from 'react';
import Shelf from './shelf';

export default function Shelfify(props) {

  function getShelves(shelves) {
    var shelfList = []
    for (var s in shelves) {
      var bookList = []
      for (var b in shelves[s]) {
        bookList.push(shelves[s][b]);
      }
      shelfList.push({name:s, data:bookList})
    }
    console.log(shelfList)
    return shelfList                      // returns list of shelf name: book array (data)
  }

    return (
        <div>
            {getShelves(props.books).map(s => <Shelf key={s.name} shelfName={s.name} booklist={s.data}/> )}
        </div>
    )
}
