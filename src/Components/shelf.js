import React from 'react'
import Flickity from 'flickity';

export default function Shelf(props) {
    const Book = (props) => <div className="book"><img src={props.img} alt="book cover" className="book-tmb"></img><b>{props.title}</b></div>

    return (
      <div>
      <h3>{props.shelfName}</h3>
        <div className="shelf">
          {props.booklist.map(book => <Book key={book.title} img={book.imageURL} title={book.title}/>)}
          {/* <link rel="stylesheet" href="../node_modules/flickity/css/flickity.css" media="screen"/>
          <script src="../node_modules/flickity/dist/flickity.pkgd.min.js"></script>
          <div class="main-gallery js-flickity" 
            data-flickity-options='{ "cellAlign": "left", "contain": true, "pageDots": false, "prevNextButtons": false }'>
              <div class="gallery-cell"></div>
              <div class="gallery-cell"></div>
          </div> */}
        </div>
      </div>
    )
}
