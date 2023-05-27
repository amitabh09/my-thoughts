import React from 'react'
import './Styling.css'
import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'

function Login(props) {
  const nav=useNavigate();
  useEffect(() => {
    if(props.people)
    {
      nav('/home');
    }
  }, [props.people]);
  
  return (
    <div className='container p-3 contDiv1'>
      <h3 style={{textAlign:'center',margin:'auto',color:'grey'}}>Please Login To Continue</h3>
    <div className='card p-2 my-1 contDiv2' style={{width:'70%',margin:'auto'}}>
        <h2 style={{textAlign:'center',color:''}}><b>My Thoughts</b></h2>
        <h2 style={{textAlign:'center'}}>Login Here</h2>
        <p style={{textAlign:'center'}}>{props.message}</p>
        <form onSubmit={props.loginHandler}>
          <div className="mb-3 my-2">
          Email address 
          <input type="email" className="form-control" name="email" aria-describedby="emailHelp"/>
          </div>
          <div className="mb-3">
          Password
          <input type="password" className="form-control" name="password" autoComplete="on"/>
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Submit</button>
        </form>
        
        <button style={{marginTop:"2px"}} className='btn btn-dark'>Login With Google</button>
        <Link to="/register" style={{textAlign:'center',textDecoration:'none'}}>New USer Signup <span style={{cursor:'pointer',color:'blue',fontWeight:'bold'}} >Register</span></Link>
    </div>
    </div>
  )
}

export default Login