import React, { Component } from 'react'
import Header from './header'
// import Flickity from 'flickity';
import axios from 'axios';
import Shelf from './shelf';
export default class Library extends Component {
    constructor(props){
        super(props)
        this.state = {booklist:[]}
    }

    componentDidMount() {
      axios.get("https://cygnus-bookface.herokuapp.com/bookface")
      .then(res =>
        this.setState({booklist: res.data})
      );
    }

    render() {
      

        return (
            <div style={{overflow:'hidden'}}>
              {/* <link rel="stylesheet" href="../node_modules/flickity/css/flickity.css" media="screen"/>
              <script src="../node_modules/flickity/dist/flickity.pkgd.min.js"></script> */}
              
              <Header user={this.props.match.params.user}/>
              <Shelf shelfName="Book Club" booklist={this.state.booklist} />
              <Shelf shelfName="Summer Reading List" booklist={this.state.booklist} />
            </div>
        )
    }
}
