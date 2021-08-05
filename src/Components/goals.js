import React, { Component } from 'react'
import Header from './header';
import Shelfify from './shelfify';
import firebase from 'firebase/app';
import "firebase/database";
import GoalItems from "./GoalItems";

export default class Goals extends Component {
    
    // constructor(props){
    //     super(props)
    //     this.state = {
    //       goallist: []
    //     }
    //     this.componentDidMount = this.componentDidMount.bind(this);
    // }

    // componentDidMount() {
      
    //   firebase.database().ref('shelves/'+this.props.match.params.user)
    //   .on('value', (snapshot) => {
    //     if (snapshot.exists()) {
    //       // console.log("shelves",snapshot.val());
    //       this.setState({booklist: snapshot.val()}); //{shelf1:{book1:{},...}, ...}
    //     }
    //   })
      // const dbRef = firebase.database().ref('shelves/'+this.props.match.params.user).get()
      // .then((snapshot) => {
      //   if (snapshot.exists()) {
      //     console.log("shelves",snapshot.val());
      //     this.setState({booklist: snapshot.val()}); //{shelf1:{book1:{},...}, ...}
      // }})
      // .catch((error) => {
      //   console.error(error);
      // });
//   }
    constructor(props) {
        super(props);
        this.state = {
            goals: []
          };
        this.addGoal = this.addGoal.bind(this);
    }

    addGoal(e) {
        if (this._inputElement.value !== "") {
          var newGoal = {
            text: this._inputElement.value,
            key: Date.now()
          };
       
          this.setState((prevState) => {
            return { 
              goals: prevState.goals.concat(newGoal) 
            };
          });
         
          this._inputElement.value = "";
        }
         
        console.log(this.state.goals);
           
        e.preventDefault();
      }

    render() {
        return (
            <div style={{overflow:'hidden'}}>
              <Header user={this.props.match.params.user}/>
              {/* {this.state.booklist.map(s => console.log(s))} */}
              <div id="goallist">
                    <form onSubmit={this.addGoal}>
                    
                        <input ref={(a) => this._inputElement = a} 
                            placeholder="Enter a new reading goal">
                        </input>
                        
                        <button type="submit">add</button>
                    </form>
                    <div >
                        <GoalItems entries={this.state.goals}/>
                    </div>
                </div>
    
            </div>
        )
    }
}
