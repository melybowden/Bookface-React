import React, { Component } from 'react'
import Booktile from './booktile'
import Header from './header'
// import flickity from 'flickity'
import Flickity from 'flickity';
export default class Library extends Component {
    constructor(props){
        super(props)
        // Do GET
        this.state={ booklist: [
            {
                "title":"Harry Potter",
                "author":"JK Rowling",
                "year":1998
            },
            {
                "title":"To Kill a Mockingbird",
                "author":"Harper Lee",
                "year":1960
            },
            {
                "title":"Lord of the Rings",
                "author":"JRR Tolkien",
                "year":1954
            }
        ]}
        this.makeFlickity = this.makeFlickity.bind(this);
    }


    makeFlickity() {
      var flkty = new Flickity('.carousel');
      flkty.next();
      flkty.select( 3 );
    }

   

    render() {
        return (
            <div>
              <link rel="stylesheet" href="../node_modules/flickity/css/flickity.css" media="screen"/>
              <script src="../node_modules/flickity/dist/flickity.pkgd.min.js"></script>
              
              <Header user={this.props.match.params.user}/>
              {/* {this.state.booklist.map(book=><Booktile title={book.title} author={book.author} year={book.year}/>)} */}
              {/* {this.makeFlickity} */}
              <h1>Flickity - half-width cells</h1>
              {/* <div class="carousel js-flickity" 
              data-flickity='{ "cellAlign": "left", "contain": true }'> */}
              <div class="main-gallery js-flickity" 
              data-flickity-options='{ "cellAlign": "left", "contain": true, "pageDots": false, "prevNextButtons": false }'>
                <div class="gallery-cell">first thing here</div>
                <div class="gallery-cell">another</div>
                <div class="gallery-cell">next one</div>
                <div class="gallery-cell">almost done</div>
                <div class="gallery-cell">finito</div>
                <div class="gallery-cell">first thing here</div>
                <div class="gallery-cell">another</div>
                <div class="gallery-cell">next one</div>
                <div class="gallery-cell">almost done</div>
                <div class="gallery-cell">finito</div>
              </div>
            </div>
        )
    }
}
