import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { doc, setDoc ,collection} from "firebase/firestore";
import { fapp } from './Fire';
import { getFirestore } from "firebase/firestore";

function Create(props) {
  //const[dis,setDis]=useState([]);
  const[prog,setProg]=useState(0);
  const db = getFirestore(fapp);
  const nav=useNavigate();
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

  useEffect(() => {
    let d = new Date();
    d=d.toString()
    console.log(d);
  },[props.people]);

  const handleCreateQuote=async(event)=>
  {
    event.preventDefault();
    setProg(5);
    const qtext=event.target.qtext.value;
    const qtitle=event.target.qtitle.value;
    const qcategory=event.target.qcategory.value;
    console.log(qcategory);
    //const userRef = doc(db, "quoteCollection", "qSub");
    setProg(25);
    let d = new Date();
    d=d.toString();
    //console.log(d);
    await setDoc(doc(collection(db,"quoteCollection",props.people.uid,"qSub"),d) ,{
      qtitle:qtitle,
      qtext:qtext,
      qcategory:qcategory,
      qlike:[],
      qid:d,
      aid:props.people.uid,
      qAuthor:props.people.displayName
    }).then(()=>{
      setProg(100);
      setTimeout(() => {
        setProg(0);
      }, 1800);
    });
    event.target.qcategory.value="DEFAULT";
    event.target.qtext.value="";
    event.target.qtitle.value="";
  }
  return (
    <>
    {props.people?
    <div className='container'>
      <br />
      {prog>0?<div className="progress"><div className="progress-bar" role="progressbar" aria-label="Basic example" style={{width: `${prog}%`}} aria-valuemin="0" aria-valuemax="100"></div></div>:""}
      {prog===100?"Uploaded Successfully !":""}
      <form onSubmit={handleCreateQuote}>
      <div className="mb-3">
        <label htmlFor="exampleFormControlInput1" className="form-label">Title</label>
        <input type="text" className="form-control" name='qtitle' placeholder="enter title of quote"/>
      </div>
      <label htmlFor="exampleFormControlInput1" className="form-label">Select Category</label>
      <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" name='qcategory' defaultValue={'DEFAULT'}>
      <option value="DEFAULT" disabled>Select a category ...</option>
        <option value="General">General</option>
        <option value="Motivational">Motivational</option>
        <option value="Heartfelt">Heartfelt</option>
        <option value="Inspirational">Inspirational</option>
        <option value="Devotional">Devotional</option>
        <option value="Devotional">Religious</option>
      </select>
      <br/>
      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Quote</label>
        <textarea className="form-control" name='qtext' rows="3" placeholder="enter quote"></textarea>
      </div>
      {prog===100?<button disabled className="btn btn-primary" style={{width:'100%'}}>Upload</button>:<button type="submit" className="btn btn-primary" style={{width:'100%'}}>Upload</button>}
      </form>
    </div>:
    "LOADING....."}
    </>
  )
}

export default Create