import React from 'react'
import logo from '../logo_white.svg'
import text_logo from '../text_logo.svg'
import { NavLink, useHistory, useParams } from 'react-router-dom'
import { BiSearch, BiUserCircle } from 'react-icons/bi'
import { ImBooks } from 'react-icons/im'
<<<<<<< HEAD
import { GiStairsGoal } from 'react-icons/gi'

=======
import {GiStairsGoal} from 'react-icons/gi'
>>>>>>> origin/last-update

export default function Header(props) {
  function signOut(history) {
    sessionStorage.removeItem('token');
    history.push("/");
    console.log("sign out")
  }

  let {user} = useParams();
  let history = useHistory();
  return (
    <div className="header">
        <div className="flex-container" justify content="space-between" style={{padding:'3vh'}}>
          <div className="flex-logo">
            <img src={logo} alt="logo" height={40} width={40} />
            <img src={text_logo} alt="Bookface" height={40}/>
          </div>
          <h3 className="header-link"><NavLink to={"/search/"+user} activeClassName="active"><BiSearch />  Search</NavLink></h3>
          <h3 className="header-link"><NavLink to={"/library/"+user} activeClassName="active"><ImBooks />  My Library</NavLink></h3>
          <h3 className="header-link"><NavLink to={"/goals/"+user} activeClassName="active"><GiStairsGoal />  My Goals</NavLink></h3>
          <h3 style={{color:'white'}} onClick={() => signOut(history)}><BiUserCircle />  Hello, {props.user}</h3> 
        </div>
    </div>
  )
}

// export default class Header extends Component {
//     constructor(props) {
//       super(props)

//       this.state = {
//         username: '',
//         password:''
//       }

//     }


//     render() {
//         return (
//             <div className="header">
//                 <div className="flex-container" style={{padding:'2vh'}}>
//                   <div className="flex-logo">
//                   <img src={logo} alt="logo" height={40} width={40} />
//                   <img src={text_logo} alt="Bookface" height={40}/>
//                   </div>
//                   <div activeClassName="active" className="header-link"><NavLink to="/search">Search</NavLink></div>
//                   <div activeClassName="active" className="header-link"><NavLink to="/library">My Library</NavLink></div>
//                   <h3 style={{color:'white'}}>Hello, {this.props.user}</h3> 
//                 </div>
//             </div>
//         )
//     }
// }
