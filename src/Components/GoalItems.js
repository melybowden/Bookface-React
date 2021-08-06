import React, { useState } from "react";
import firebase from 'firebase/app';
import 'firebase/database';
import { MdEdit, MdDone } from "react-icons/md";

function Goal(props) { 
  const token = JSON.parse(sessionStorage.getItem("token")).username;
  const [edit, setEdit] = useState();
  const [newName, setName] = useState(props.text);
  // const [status, setStatus] = useState(props.status);

  function editGoal(key, newName, username) {
    firebase.database().ref('goals/'+username+'/'+key)
    .on('value', (snapshot) => {
      console.log(newName);
      firebase.database().ref('goals/'+username+'/'+key).update({goal:newName})
    })
  }

  function markDone(key, username) {
    firebase.database().ref('goals/'+username+'/'+key)
    .on('value', (snapshot) => {
      firebase.database().ref('goals/'+username+'/'+key).update({status:'done!'})
    })
  }
// , color:{status==='new'?'blue':'gray'}
  return ( 
      <h3 style={{textAlign:'left',display:'flex',flexFlow:'row'}} onMouseEnter={() => setEdit(true)} onMouseLeave={() => setEdit(false)}>{props.text}  
      {edit ? 
        <div>
        <form className="form-box" style={{marginLeft:'1vw'}} onSubmit={() => editGoal(props.goalKey,newName,token)}> 
          <input type="text" value={newName} placeholder="Edit goal" onChange={e => setName(e.target.value)}/>
          <MdEdit style={{marginLeft:'1vw'}} onClick={() => editGoal(props.goalKey,newName,token)}/>
          <MdDone style={{marginLeft:'1vw'}} onClick={markDone(props.goalKey,token)}/>
        </form> 
        </div>
        : <></>
      }
      </h3>
  )
}



export default function GoalItems(props) {
  

  return(
    <ul className="theList">
      {props.entries.map(goal => <li key={goal.key}>{console.log(goal.key)}<Goal text={goal.text} goalKey={goal.key}/></li>)}
    </ul>
  )
}
 
// class GoalItems extends Component {
//   createTasks(goal) {
//     return <li key={goal.key}>{goal.text}</li>
//   }
 
//   render() {
//     var todoEntries = this.props.entries;
//     var listItems = todoEntries.map(this.createTasks);
 
//     return (
//       <ul className="theList">
//           {listItems}
//       </ul>
//     );
//   }
// };
 
// export default GoalItems;