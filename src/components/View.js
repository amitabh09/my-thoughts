import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { collection,getFirestore, doc, getDocs, deleteDoc} from "firebase/firestore";
import { fapp } from './Fire';
import ViewAll from './ViewAll';

function View(props) {
  console.log("rfce");
  const[dis,setDis]=useState([]);
  const nav=useNavigate();
  const db = getFirestore(fapp);
  async function funAuth()
  {
    const x=await props.people;
    if(!x)
    {
      console.log("action not allowed")
      nav('/login');
    }
    
  }
  funAuth();

  const fetchData=async()=>
  {
    const x=await props.people;
    if(x)
    {
      let dis2=[];
      const docRef = collection(db,"quoteCollection",props.people.uid,"qSub");
      const querySnapshot = await getDocs(docRef);
      querySnapshot.forEach((doc) => {
        dis2.push(doc.data());
        console.log(doc.id, " => ", doc.data());
      });
      //console.log(dis2);
      setDis(dis2);
      //console.log("hiii");
    }
  }
  
  const deleteHandler=(ppl,qq)=>
  {
    const docRef = (doc(collection(db,"quoteCollection",ppl,"qSub"),qq))
    deleteDoc(docRef).then((user)=>{console.log("deleted successfully")});
  }

  useEffect(() => {fetchData();console.log("use effect of view")},[props.people]);

  return (
    <>
      {console.log("return of view")}
      {props.people?
      <div className='container' style={{backgroundColor:''}}>
        <br/>
        {dis.length>0 ?
        dis.map((doc,index)=>{
          return(
          <>
          <div key={index}>
            <div className="card" style={{backgroundColor:'beige'}}>
              <div className="card-body">
                <h5 className="card-title"><strong style={{color:'magenta'}}></strong> {doc.qtitle}</h5>
                <p className="card-text">{doc.qtext}.</p>
                <h5 style={{color:'blue'}}>Likes : {doc.qlike.length}</h5>
                <p style={{color:'brown'}}>{doc.qid.slice(0,16)}</p>
                <button className='btn btn-danger' onClick={()=>{deleteHandler(doc.aid,doc.qid)}}>Delete Post</button>
              </div>
            </div>
          </div>
          <br></br>
          </>
        )})
        :<h1>OOPS! NO Data Found<br/>Create New Quotes To View Them.....</h1>
        }
      </div>
      :<h1>OOPS! NO Data Found<br/>Create New Quotes To View Them.....</h1>}
    </>
  )
}

export default View