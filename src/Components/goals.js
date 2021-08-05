import React, { Component } from 'react'
import Header from './header';
import Shelfify from './shelfify';
import firebase from 'firebase/app';
import "firebase/database";
import GoalItems from "./GoalItems";

export default class Goals extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            goals: []
          };
        this.addGoal = this.addGoal.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    // componentDidMount(){
    //     firebase.database().ref('goals/' + this.props.match.params.user).on()
    //         .then('value',(promise) => {this.setState({goalList:promise.val()})})
    //     }
    // componentDidMount() {
        
    //     firebase.database().ref('shelves/'+this.props.match.params.user)
    //     .on('value', (snapshot) => {
    //       // console.log(snapshot)
    //       if (snapshot.exists()) {
    //         console.log(Object.keys(snapshot.val()));
    //         this.setState({shelves: Object.keys(snapshot.val())});
    //     }})
    // }
    componentDidMount() {
        firebase.database().ref('goals/'+this.props.match.params.user)
        .on('value', (promise) => {
          if (promise.exists()) {
            var res = promise.val()
            var goals = []
            for (var g in res) {
              goals.push({key:g, text:res[g].goal, status:res[g].status})
            }
            this.setState({goals: goals});
          }
        })
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
        var n = this.state.goals.length;
        firebase.database().ref('goals/' + this.props.match.params.user + '/' + newGoal.key).set({
            goal: newGoal.text,
            status: 'new'
          });
      }

    render() {
        return (
            <div style={{overflow:'hidden'}}>
              <Header user={this.props.match.params.user}/>
              {/* {this.state.booklist.map(s => console.log(s))} */}
              <div id="goallist">
                    <form onSubmit={this.addGoal} className="form-box">
                    
                        <input ref={(a) => this._inputElement = a} 
                            placeholder="Enter a new reading goal" />
                        
                        <input type="submit" value="Add" />
                    </form>
                    <div >
                        <GoalItems entries={this.state.goals}/>
                    </div>
                </div>
    
            </div>
        )
    }
}
