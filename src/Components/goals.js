import React, { Component } from 'react'
import Header from './header';
import firebase from 'firebase/app';
import "firebase/database";
import GoalItems from "./GoalItems";
import { Redirect } from 'react-router';

export default class Goals extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            goals: []
          };
        this.addGoal = this.addGoal.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);

    }

    componentDidMount() {
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString).username;
        firebase.database().ref('goals/'+userToken)
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
      const tokenString = sessionStorage.getItem('token');
      const userToken = JSON.parse(tokenString).username;
        
      e.preventDefault();

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

        firebase.database().ref('goals/' + userToken + '/' + newGoal.key).set({
            goal: newGoal.text,
            status: 'new'
          });
      }

    render() {
      const tokenString = sessionStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        if (userToken === null) {
          return <Redirect to="/" />
        }
        return (
            <div style={{overflow:'hidden'}}>
              <Header user={this.props.match.params.user}/>
              <div id="goallist">
                    <form onSubmit={this.addGoal} className="search-container">
                    
                        <input type="text" ref={(a) => this._inputElement = a} 
                            placeholder="Enter a new reading goal" />
                        
                        <input type="submit" value="Add" />
                    </form>
                    <div className="goal-container">
                        <GoalItems entries={this.state.goals}/>
                    </div>
                </div>
            </div>
        )
    }
}