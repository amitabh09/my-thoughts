import React from 'react'
import { useEffect,useState } from 'react';
import { collection,getFirestore, getDocs,getDoc,doc,updateDoc} from "firebase/firestore";
import { fapp } from './Fire';

function ViewAll(props) {
  console.log("rfce");
  const[dis,setDis]=useState([]);
  const db = getFirestore(fapp);

  const fetchData=async()=>
  {
      const q = collection(db, "cities")
      var dis2=[];
      await getDocs(q).then((querySnapshot)=>
      {
        querySnapshot.forEach(async(doc) =>
        {
          console.log(doc.id);
          const docRef = collection(db,"quoteCollection",doc.id,"qSub");
          await getDocs(docRef).then((docc)=>
          {
              docc.forEach(doc => {
              dis2.push(doc.data());
              dis2=dis2.concat(dis);
              setDis(dis2);
              //console.log(doc.data());
              });
              //console.log(dis);
              //setDis(dis);
          });
        });
        console.log(dis.length);
        //setDis(dis2);
      });
  }
  
  const likeHandler=(ppl,qq)=>
  {
    //console.log(ppl+" like this quote "+qq);
    const docRef = (doc(collection(db,"quoteCollection",ppl,"qSub"),qq))
    getDoc(docRef).then((user)=>{
      //console.log(user.data());
      let x=user.data().qlike;
      if(x.length>0 && (x.includes(props.people.uid)))
      {
        console.log("already liked");
      }
      else if(props.people.uid)
      {
        x.push(props.people.uid);
        updateDoc(docRef, {
          qlike:x
        }).then(()=>{
          console.log("successfully liked");
          //fetchData();
        });
      }
    })
  }

  useEffect(() => {fetchData();console.log("use effect of view")},[props.people]);

  return (
    <>
      {console.log("return of view all")}
      <div className='container' style={{backgroundColor:''}}>
        <br/>
        {dis.length>0?
        dis.map((doc,index)=>{
          return(
          <div key={index}>
            <div className="card" style={{backgroundColor:'beige'}}>
              <div className="card-body">
                <h5 style={{color:'brown'}}>{doc.qAuthor}</h5>
                <h5 className="card-title"><strong style={{color:'magenta'}}></strong>{doc.qtitle}</h5>
                <p className="card-text">{doc.qtext}.</p>
                <button className='btn btn-primary' onClick={()=>{likeHandler(doc.aid,doc.qid)}}>Like</button>
                <h5 id='id1' style={{color:'blue',display:'inline-block',marginLeft:'10px'}}>{doc.qlike.length}</h5>
                <p style={{color:'brown'}}>{doc.qid.slice(0,16)}</p>
              </div>
            </div>
            <br />
          </div>
          
        )})
        :<h1>Loading.....</h1>
        }
      </div>
    </>
  )
}

export default ViewAll