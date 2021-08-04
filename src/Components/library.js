import React, { Component } from 'react'
import Header from './header';
import axios from 'axios';
import Shelfify from './shelfify';
// import Shelf from './shelf';
export default class Library extends Component {
    constructor(props){
        super(props)
        this.state = {
          booklist: []
        }
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
      // console.log("mounted")
      // console.log("https://cygnus-bookface.herokuapp.com/bookface/user/"+this.props.match.params.user)
      axios.get("https://cygnus-bookface.herokuapp.com/bookface/user/"+this.props.match.params.user)
      .then(res =>
        this.setState({booklist: res.data})
      );
    }

    render() {
        return (
            <div style={{overflow:'hidden'}}>
              <Header user={this.props.match.params.user}/>
              <Shelfify books={this.state.booklist} />
              {/* {console.log(this.state.booklist)} */}
              {/* {this.getShelves(this.state.booklist).map(s => console.log(s))} */}
              {/* <Shelf shelfName="Book Club" booklist={this.state.booklist} />
              <Shelf shelfName="Summer Reading List" booklist={this.state.booklist} /> */}
            </div>
        )
    }
}
