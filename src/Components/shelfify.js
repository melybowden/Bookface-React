import React from 'react';
import Shelf from './shelf';
import firebase from 'firebase/app';
import "firebase/database";

export default function Shelfify(props) {

  function getShelves(shelves,order) {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString).username;
      
    var shelfList = []
    for (var s in shelves) {
      var bookList = []
      firebase.database().ref('shelves/'+userToken+'/'+s+'/')
      .orderByChild(order).on(
        'value',(snapshot) => {
        snapshot.forEach(function(child) {
          bookList.push(child.val());
        })
      })
      shelfList.push({name:s, data:bookList})
    }
    return shelfList                      // returns list of shelf name: book array (data)
  }

    return (
        <div>
            {getShelves(props.books, props.order).map(s => <Shelf key={s.name} shelfName={s.name} booklist={s.data}/> )}
        </div>
    )
}
