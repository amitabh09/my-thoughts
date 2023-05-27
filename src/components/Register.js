import {React,useEffect} from 'react'
import './Styling.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function Register(props) {
  const nav=useNavigate();
  useEffect(() => {
    if(props.people)
    {
      nav('/home');
    }
  }, [props.people]);
  return (
    <div className='container p-3 contDiv1'>
    <div className='card p-2 my-1 contDiv2' style={{width:'70%',margin:'auto'}}>
        <h2 style={{textAlign:'center',color:'blue'}}>My Thoughts</h2>
        <h2 style={{textAlign:'center'}}>Register Here</h2>
        <p style={{textAlign:'center'}}>{props.message}</p>
        <button className='btn btn-dark'>Sign Up With Google</button>
        <form onSubmit={props.registerationHandler}>
          <div className="mb-3 my-2">
          Name 
          <input type="text" className="form-control" name="uname" aria-describedby="emailHelp" required/>
          </div>
          <div className="mb-3 my-2">
          Email address 
          <input type="email" className="form-control" name="email" aria-describedby="emailHelp" required/>
          </div>
          <div className="mb-3">
          Password
          <input type="password" className="form-control" name="password" required autoComplete="on"/>
          </div>
          <div className="mb-3">
          Confirm Password
          <input type="password" className="form-control" name="cnfPassword" required autoComplete="on"/>
          </div>
          <button type="submit" className="btn btn-primary" style={{width:'100%'}}>Submit</button>
        </form>
        <Link to="/login" style={{textAlign:'center',textDecoration:'none'}}>New USer Signup <span style={{cursor:'pointer',color:'blue',fontWeight:'bold'}} >Login</span></Link>
    </div>
    </div>
  )
}

export default Register