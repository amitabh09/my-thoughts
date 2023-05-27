import React from 'react'
import { useState } from 'react'

function Todo()
{
    const [task,setTask]=useState([]);
    const handleClick=(e)=>
    {
        e.preventDefault();
        let task2=[];
        
        task2=task2.concat(task);
        task2.push(e.target.tas.value);
        setTask(task2);
    }
  return (
    <div>
        <h1>TODO LIST</h1>
        <form onSubmit={handleClick}>
            <input type="text" name="tas" />
            <button type="submit">Submit</button>
        </form>
        {
            task.map((val,k)=>
            {
                return(<><h1>{k+1}:{val}</h1>
                <button>Done</button>
                <button>Not Done</button></>)
            })
        }
    </div>
  )
}

export default Todo