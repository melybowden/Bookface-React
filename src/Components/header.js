import React from 'react'
import logo from '../logo_white.svg'
import text_logo from '../text_logo.svg'
import { NavLink, useParams } from 'react-router-dom'
import { BiSearch } from 'react-icons/bi'
import { ImBooks } from 'react-icons/im'
import { BiUserCircle } from 'react-icons/bi'

export default function Header(props) {
  let {user} = useParams();
  return (
    <div className="header">
        <div className="flex-container" justify content="space-between" style={{padding:'3vh'}}>
          <div className="flex-logo">
            <img src={logo} alt="logo" height={40} width={40} />
            <img src={text_logo} alt="Bookface" height={40}/>
          </div>
          {/* <ul>
            <li><NavLink to="/search" className="header-link" activeClassName="active">Search</NavLink></li>
            <li><NavLink to="/library" className="header-link" activeClassName="active">My Library</NavLink></li>
          </ul> */}
          <h3 className="header-link"><NavLink to={"/search/"+user} activeClassName="active"><BiSearch />  Search</NavLink></h3>
          <h3 className="header-link"><NavLink to={"/library/"+user} activeClassName="active"><ImBooks />  My Library</NavLink></h3>
          <h3 style={{color:'white'}}><BiUserCircle />  Hello, {props.user}</h3> 
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
