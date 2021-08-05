import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import logo from '../login_logo.svg';
import { FiPlus } from 'react-icons/fi'

async function loginUser(credentials) {
  console.log("login")
  return axios.post('https://cygnus-bookface.herokuapp.com/users/login', credentials)
    .then(res => 
      // console.log(res)
      res.data
    ) // {first: "user created?logged in?failed?", second: {username:"",displayname:"",id:#, loggedIn:bool,password:""}}
 }

export default function Login({setToken}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  let history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    const token = await loginUser({
      username,
      password
    });
    // console.log(token)
    setToken(token);
    history.push("/library/"+username);
  }
  
  return (
      <div className="lockscreen">
        <img style={{height:"100%"}} src={logo} alt="BookFace-Logo" />
        <div className="login-card">
          <form onSubmit={handleSubmit}>
            <h1 style={{color: '#1877F2'}}>Login</h1>
            <input type="text" name="username"  placeholder="Enter Username" value={username} onChange={e => setUsername(e.target.value)} />
            <br />
            <input type="password" name="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
            <br />
            <input type="submit" value="Submit" />
          </form>
          <div style={{marginTop: "30%"}}>
            <Link to="/createuser" style={{color:"red"}}><FiPlus />  New User? Create Account Here</Link>
          </div>
        </div>
      </div>
  )
}

// export default class login extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       username: '',
//       password:''
//     };

//     this.handleChange = this.handleChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleChange(event) {
//     this.setState({[event.target.name]: event.target.value});
//   }

//   handleSubmit(event) {
//     event.preventDefault();
//     axios.post('https://cygnus-bookface.herokuapp.com/users/login',this.state)
//     .then(results => 
//       // useToken(results.data.second)
//       console.log(results)
//     // this.props.setToken(results)
//     // alert(results.data.first)
//     )
//   .catch(error => console.log("error: " + error))
//   }

//   render() {
//     return (
      // <div className="lockscreen">
      //   <img style={{height:"100%"}} src={logo} alt="BookFace-Logo" />
      //   <div className="login-card">
      //     <form onSubmit={this.handleSubmit}>
      //       <h1 style={{color: '#1877F2'}}>Login</h1>
      //       <input type="text" name="username"  placeholder="Enter Username" value={this.state.username} onChange={this.handleChange} />
      //       <br />
      //       <input type="password" name="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleChange} />
      //       <br />
      //       <input type="submit" value="Submit" />
      //     </form>
      //     <div style={{marginTop: "30%"}}>
      //       <Link to="/createuser" >New User? Create Account Here</Link>
      //     </div>
      //   </div>
      // </div>
//     );
//   }
// }
