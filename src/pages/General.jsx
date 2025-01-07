import React, { useState } from 'react'
import { useAppContext } from '../context/AppContex'
import Nav from '../components/Nav'
import axios from 'axios'
import toast from 'react-hot-toast'

export default function General() {

 const { profile , todos }  =  useAppContext()

  return (<>

<div className=" min-h-screen h-auto w-full bg-myBlue">
  <Nav/>

  <div className="min-h-[70vh]  h-auto  w-[90%] mt-9 mx-auto sm:w-[90%] md:w-[70%] lg:w-[50%]">

{/* Todo Form */}
{/* here we create a todo /create */}
<TodoForm/>

{/* Todo Items */}
{/* Here We Fetch the the Todo */}
<div className=" mt-9">
{
  todos.map((todo)=>{
    return(<>
    <div key={todo._id} >
<  TodoItem  todo= {todo} />
    
    </div>
    </>)
  })
}
</div>
{/* 
<ul>
<li></li>
<li></li>
<li></li>
<li></li>
</ul> */}

  </div>
</div>
</>)
}

//  /create 
function TodoForm() {
const [text , setText] = useState("");
const [loading , setLoading] = useState(false)


const handleSubmit = async( e)=>{
e.preventDefault();  
if(!text)  {
  toast.warning("Write Todo in Input")
}
try {
  setLoading(true)
const response = await axios.post(` http://localhost:2000/todo/create` , { text} , { withCredentials:true ,
  headers:{
    "Content-Type":"application/json"
  }
})
const data = await response.data
console.log(data);
if( data) setText("")
} catch (error) {
  console.log("Todo Not Created :))"  , error);
} finally{ setLoading(false)}
}



  return(<>
<form onSubmit={handleSubmit} className='flex justify-between items-center border h-[40px] md:h-[50px] p-1' action="">
  <input value={text} onChange={(e)=>setText(e.target.value)} required className='h-full w-[90%] p-3 bg-myBlue outline-none placeholder:text-myHalfWhite text-[20px]' type="text" placeholder='Add tasks' />

<button type='submit' className='h-full bg-myWhite hover:opacity-90 text-myBlue w-[70px] md:w-[100px] text-[20px] flex justify-center items-center' >
  {
    loading?
    <div 
    className="h-[25px]  md:h-[30px] w-[25px] md:w-[30px] border-2 md:border-4 border-t-transparent border-myBlue rounded-full animate-spin"
  ></div> 
    :"Add"
  }
  </button>
  </form>
  </>)
  
}


// fetch
function TodoItem({todo}) {

  const deleteTodo = async (id)=>{
    try {
      const response  =await axios.delete(`https://todo-server-six-ashen.vercel.app/todo/delete/${id}` , { withCredentials:true} )
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log("Todo not Deleted :)" , error);
    }

  } 


  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
    const formattedMinutes = minutes.toString().padStart(2, '0'); // Ensure 2 digits for minutes
    const formattedDate = date.toLocaleDateString(); // Format as MM/DD/YYYY
    return `${formattedHours}:${formattedMinutes} ${ampm} | ${formattedDate}`;
  };

  return(<>
  <ul className='mt-5' >
    <li className=' px-3' >
<div className='flex justify-between items-center' >
      <div  className=" flex justify-center items-center gap-2 cursor-pointer ">
{/* .cutom Input Radio */}
<div className="  h-[25px] md:h-[30px] w-[25px] md:w-[30px] border md:border-[2px] rounded-full flex justify-center items-center"> <div className="h-[20px] md:h-[22px] md:w-[22px]  w-[20px] bg-myWhite rounded-full"></div> </div>
{/* .cutom Input Radio END */}
<label className=' text-[22px] md:text-[25px]  cursor-pointer' htmlFor="">{todo.text}</label>
      </div>
      <div className=" flex items-center gap-2 md:gap-5 ">
<button className='text-[22px] md:text-[25px] cursor-pointer h-[40px] w-[40px] hover:bg-blue-400  duration-150 rounded-md' >
<i class="fa-solid fa-pencil"></i>
</button >
<button onClick={()=>deleteTodo(todo._id)} className=' text-[22px] md:text-[25px] cursor-pointer h-[40px] w-[40px] hover:bg-blue-400  duration-150 rounded-md' >
<i class="fa-solid fa-trash"></i>
</button>
      </div>

      </div>
      <p className= ' text-[9px] md:text-[11px]  text-myHalfWhite]' >{ formatDate( todo.createdAt)}</p>
    </li>
  </ul>
  </>)
}