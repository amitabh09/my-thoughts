import { useState,useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Register from './components/Register';
import Home from './components/Home';
import Create from './components/Create';
import View from './components/View';
import Profile from './components/Profile';
import ViewAll from './components/ViewAll';
import Todo from './components/Todo';
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";

//firebase coding
import { getAuth , createUserWithEmailAndPassword , signInWithEmailAndPassword ,onAuthStateChanged,updateProfile, signOut} from "firebase/auth";
import { fapp } from './components/Fire';
import { doc, setDoc , getFirestore } from "firebase/firestore";
const db = getFirestore(fapp);
const auth = getAuth(fapp);

//React coding
function App() {
  const nav=useNavigate();
  const[people,setPeople]=useState();
  const[message,setMessage]=useState("");
  console.log("App component render");

  async function fun1()
  {
    console.log("db start")
    await setDoc(doc(db, "cities", people.uid), {
        name: people.displayName,
        email: people.email,
        mobile:"",
        city: "",
        state: "UP"
      });
  }

  const registerationHandler=(event)=>
  {
    //const auth = getAuth();
    event.preventDefault();
    const email=event.target.email.value;
    const uname=event.target.uname.value;
    const password=event.target.password.value;
    const cnfPassword=event.target.cnfPassword.value;
    if(password !== cnfPassword)
    {
      setMessage("Password does not match");
      return ;
    }
    createUserWithEmailAndPassword(auth, email, password)
    .then((data) => 
    {
      setMessage("Registered Successfully");
      fun1();
      console.log(data);
      updateProfile(auth.currentUser, {
        displayName: uname
        }).then(() =>
        {
          nav("/home");
        }).catch((error) => {
        });
      })
      .catch((error) =>
      {
        setMessage("Wrong Email or Paasword too short");
        console.log(error.message);
      });
  }

  const loginHandler=(event)=>
  {
    //const auth = getAuth();
    event.preventDefault();
    const email=event.target.email.value;
    const password=event.target.password.value;
    console.log("success login");
    signInWithEmailAndPassword(auth, email, password)
    .then((user) => {
      setMessage("login successfull");
      nav("/home")
    })
    .catch((error) => {
      setMessage(error.message);
    });
    
  }

  const handleLgout=()=>
  {
    console.log(1);
    signOut(auth);
    console.log(2);
    setPeople(null);
    console.log(3);
  }

  useEffect(() =>
  {
    onAuthStateChanged(auth, (user) =>
    {
      if (user)
      {
        console.log(user);
        setPeople(user);
      }
      else  console.log("Null"); 
    });
  }, [people]);

  return (
    <div>
        <Navbar handleLgout={handleLgout} people={people}/>
        <Routes>
          <Route exact path="/" element={<Home people={people}/>}/>
          <Route exact path="/home" element={<Home people={people}/>}/>
          <Route exact path="/profile" element={<Profile people={people}/>}/>
          <Route exact path="/login" element={<Login message={message} loginHandler={loginHandler} people={people}/>} />
          <Route exact path="/register" element={<Register message={message}  registerationHandler={registerationHandler} people={people}/>} />
          <Route exact path="/create" element={<Create people={people} />}/>
          <Route exact path="/view" element={<View people={people} />} />
          <Route exact path="/viewall" element={<ViewAll people={people} />} />
          <Route exact path="/todo" element={<Todo />} />
        </Routes>
    </div> 
  );
}

export default App;