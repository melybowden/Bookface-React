import React, { Component } from "react";
 
class GoalItems extends Component {
  createTasks(goal) {
    return <li key={goal.key}>{goal.text}</li>
  }
 
  render() {
    var todoEntries = this.props.entries;
    var listItems = todoEntries.map(this.createTasks);
 
    return (
      <ul className="theList">
          {listItems}
      </ul>
    );
  }
};
 
export default GoalItems;