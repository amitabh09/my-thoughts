import React from 'react'
import { Link } from 'react-router-dom'
import './Styling.css'

function Navbar(props)
{
  return (
  <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
    <div className="container-fluid"> 
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="navbar-brand">
            <Link className="nav-link" to="/home" style={{textAlign:'center',textDecoration:'none',color:'white'}}>Thoughts</Link>
          </li>
          <li className="navbar-brand">
            <Link className="nav-link" to="/profile" style={{textAlign:'center',textDecoration:'none',color:'white'}}>My Account</Link>
          </li>
          <li className="navbar-brand">
            <Link className="nav-link" to="/view" style={{textAlign:'center',textDecoration:'none',color:'white'}}>View My Posts</Link>
          </li>
          <li className="navbar-brand">
            <Link className="nav-link" to="/create" style={{textAlign:'center',textDecoration:'none',color:'white'}}>Create New Thoughts</Link>
          </li>
          <li className="navbar-brand">
            <Link className="nav-link" to="/contact" style={{textAlign:'center',textDecoration:'none',color:'white'}}>Contact Us</Link>
          </li>
          {
            !props.people
            ?<li className="navbar-brand"><Link className="nav-link" to="/login" style={{textAlign:'center',textDecoration:'none',color:'white'}}>Login </Link></li>
            :<li className="navbar-brand"><p className="nav-link" onClick={props.handleLgout} style={{cursor:'pointer',textAlign:'center',textDecoration:'none',color:'white'}}>Logout </p></li>
          }
        </ul>
      </div>
    </div>
  </nav>
  )
}

export default Navbar