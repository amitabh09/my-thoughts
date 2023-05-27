import React, { useState } from 'react'
import { useEffect } from 'react';
import { useNavigate   } from 'react-router-dom';

import { fapp } from './Fire';
import { getFirestore } from "firebase/firestore";
import { doc, setDoc , getDoc } from "firebase/firestore";
import { updateProfile ,getAuth } from 'firebase/auth';
function Profile(props)
{
    const[dis,setDis]=useState([]);
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

    const fetchData=async()=>
    {
      const x=await props.people;
      if(x)
      {
        const docRef = doc(db, "cities", x.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists())
        {
          console.log("Document data:", docSnap.data());
          const obj=docSnap.data();
          const dis2=[obj]
          console.log(dis);
          console.log(dis2[0].state)
          setDis(dis2);
        }
      }
    }

    useEffect(() => {fetchData();},[props.people]);
    //useEffect(() => console.log(dis), [dis]);
    
    const updateProfileHandler =async (event) =>
    {
      event.preventDefault();
      const disName=(event.target.disName.value !=="" ?event.target.disName.value:dis[0].name);
      const mob=(event.target.mob.value !=="" ?event.target.mob.value:dis[0].mobile);
      const address=(event.target.address.value !=="" ?event.target.address.value:dis[0].city);
      const auth = getAuth(fapp);
      updateProfile(auth.currentUser, {
        displayName: disName
        }).then(() =>
        {}).catch((error) => {});
      await setDoc(doc(db, "cities", props.people.uid), {
        name: disName,
        email: props.people.email,
        mobile: mob,
        city: address,
        state: "UP"
      });
      event.target.disName.value="";
      event.target.mob.value="";
      event.target.address.value="";
      fetchData();
    }
    return (
        <>
        {dis.length>0
        ? <div className='container' style={{backgroundColor:'lightGreen',width:"60%",marginLeft:"0px",marginTop:"0px"}}>
          <h1>My Profile</h1>
          <br/>
          <form onSubmit={updateProfileHandler}>
          <div className="container">
            <div className="row">
                <div className="col">
                    <h3>Name  </h3>
                </div>
                <div className="col">
                    <input placeholder={dis[0].name} type="text" name="disName"/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3>Email  </h3>
                </div>
                <div className="col">
                    <input type="text" placeholder={dis[0].email} disabled/>
                </div>
            </div>
            
            <div className="row">
                <div className="col">
                    <h3>Mobile  </h3>
                </div>
                <div className="col">
                    <input type="text" placeholder={dis[0].mobile} name="mob" />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <h3>Address  </h3>
                </div>
                <div className="col">
                    <input type="text" placeholder={dis[0].city} name="address" />
                </div>
            </div>
            
          </div>
          <br/>
          <button type='submit' className='btn btn-primary'>Update</button>
          </form>
          <br/><br/>
          </div>
      :"Loading"}
        </>
    )
}
export default Profile