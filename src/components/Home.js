import { useEffect } from 'react';
import React from 'react'
import './Styling.css'
import ViewAll from './ViewAll';
//import { Link } from 'react-router-dom'

function Home(props)
{
  useEffect(() => {
    if(props.people)
    {
      console.log("Home use effect");
    }
  },[]);
  return (
    <>
    <div id="carouselExampleIndicators" className="carousel slide carouselImg" data-bs-ride="true">
      <div className="carousel-indicators">
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img  src="https://blog.hubspot.com/hubfs/Example%201%20(2)-png.png" className="d-block" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://i0.wp.com/blog.rescuetime.com/wp-content/uploads/2017/12/time-isnt-the-main-thing.png?fit=1000%2C500&ssl=1" className="d-block w-100" alt="..."/>
        </div>
        <div className="carousel-item">
          <img src="https://marynashkvorets.com/wp-content/uploads/2020/06/inspirational-quotes-public-speaking-confidence-2-mark-twain.png" className="d-block w-100" alt="..."/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
        <span style={{color:'red'}} className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span style={{color:'red'}} className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
        <span style={{color:'red'}} className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
    <div className='container'>
      <h1>{props.people?"Hello "+props.people.displayName:"Hello Guest"}</h1>
      {props.people && <ViewAll />}
    </div>
    </>
  )
}

export default Home