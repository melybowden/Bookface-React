import React, { Component } from 'react'
import Header from './header'
import Flickity from 'flickity';
export default class Library extends Component {
    constructor(props){
        super(props)
    }

    render() {
        return (
            <div>
              <link rel="stylesheet" href="../node_modules/flickity/css/flickity.css" media="screen"/>
              <script src="../node_modules/flickity/dist/flickity.pkgd.min.js"></script>
              
              <Header user={this.props.match.params.user}/>
              <h1>Flickity - half-width cells</h1>
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
