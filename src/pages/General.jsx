import React, { useState } from 'react'
import { useAppContext } from '../context/AppContex'
import Nav from '../components/Nav'
import axios from 'axios'
import toast from 'react-hot-toast'
import { formatCreatedAt } from '../utils/ConvertIntoSimpleTime.js'
import origin from '../config/index.js'

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
{
  todos.length > 0 ?
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
:
<div className="mt-5 flex justify-center items-center flex-col">
  <img 
    className="h-[200px] w-[200px] rounded-full grayscale-80" 
    src="https://res.cloudinary.com/dtqli9uge/image/upload/v1736495904/gkolox3cbymrxluapqs8.png" 
    alt="Profile"
  />
  <h1 className="md:text-[40px] text-[30px] text-myHalfWhite">
Happy Todos Journey!
  </h1>

    <p className="mt-2 text-myHalfWhite text-center">
      Best of luck with your todos! Start adding tasks to make your journey productive and exciting!
    </p>
</div>

}







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
try {
  setLoading(true)
const response = await axios.post(`${origin}/todo/create` , { text} , { withCredentials:true ,
  headers:{
    "Content-Type":"application/json"
  }
})
const data = await response.data
console.log(data);
if( data) setText("")
} catch (error) {
  console.log("Todo Not Created :))"  , error);
  toast.error("OOPS Some Thing ent Wrong ❗❗ \n Todo Not created. ")
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

const [loading , setLoading]  = useState(false)
const [updateLoadin , setUpdateLoading] = useState(false);
const [showEdit  , setShowEdit] = useState(false);
const [text,setText] = useState(todo.text)

  const deleteTodo = async (id)=>{
    // https://todo-server-six-ashen.vercel.app
    try {
      setLoading(true)
      const response  =await axios.delete(`${origin}/todo/delete/${id}` , { withCredentials:true} )
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.log("Todo not Deleted :)" , error);
      toast.error("OOPS Todo Not Deleted ! \n Some Thing Went Wrong",)
    }finally {  setLoading(false)}
  } 

const updateText = async(e)=>{


  e.preventDefault()
  try {
    setUpdateLoading(true)
    const response = await axios.post(`${origin}/todo/update/${todo._id}` ,{ text}  , {

      withCredentials : true,
      headers:{
        "Content-Type":"application/json"
      }
    } )
    const data = await response.data;
    console.log(data);  
    // if(data)
    setShowEdit(false)
  } catch (error) {
    console.log("Text no Updated ::" , error);
    toast.error("Text Not Updated :)")    
  } finally{ setUpdateLoading(false)}
}
const toggleCompleted = async ( id, value)=>{


  try {
    const response = await axios.post(`${origin}/todo/update/${id}` ,{  completed : !value} , {
      withCredentials : true,
      headers:{
        "Content-Type":"application/json"
      }
    } )   
    const data = await response.data; 
  } catch (error) {
    console.log("Todo Not Complted :)", error);

  }
}

  return(<>
  <ul className='mt-5' >
{
  showEdit?
  <form onSubmit={updateText}  className='flex justify-between items-center border border-[#08085b] h-[30px] md:h-[40px] p-1' action="">

  <input onChange={ (e)=>setText(e.target.value)} value={text} className='h-full w-[90%] p-2 bg-myBlue outline-none placeholder:text-myHalfWhite text-[17px]' type="text" placeholder="Edit Todo"/>

<button type='submit' className='h-full bg-myWhite hover:opacity-90 text-myBlue w-[50px] md:w-[50px] text-[20px] flex justify-center items-center' >

  {
    updateLoadin?
    <div 
    className="md:h-[25px]  md:w-[25px] h-[18px] w-[18px]  border-2 border-t-transparent border-myBlue rounded-full animate-spin"
  ></div> 
    : <span className='text-myBlue text-[15px]' >Add</span>
  }
  {/* Save */}
  </button>
  </form>
  :
    <li className=' px:1 md:px-3' >
<div className='flex justify-between items-center' >
<div   className=" flex  w-[70%] items-center gap-1 md:gap-2 cursor-pointer ">
<input className='md:scale-[1.7] cursor-pointer' onClick={()=>toggleCompleted( todo._id, todo.completed)} checked = { todo.completed} type="checkbox" name="" id="" />
  <input
  type="text"
 value={todo.text}
 className={` ${todo.completed ?"text-[#ffffff8a]":"text-myWhite"}  w-[90%] select-none focus:outline-none focus:border-r-2 bg-myBlue overflow-x-auto cursor-text md:text-[20px] `}
 readOnly
 name=""
 id=""
  />
     </div>
      <div className=" flex items-center gap-2 md:gap-5">

<button onClick={()=>setShowEdit(true)} className='text-[18px] md:text-[25px] cursor-pointer h-[30px] md:h-[40px] w-[30px] md:w-[40px] hover:bg-blue-400  duration-150 rounded-md' >
<i class="fa-solid fa-pencil"></i>
</button >
<button onClick={()=>deleteTodo(todo._id)} className={`relative text-[18px] md:text-[25px] cursor-pointer h-[30px] w-[30px] md:h-[40px] md:w-[40px] ${loading?"bg-blue-400":""} hover:bg-blue-400  duration-150 rounded-sm`} >

{
  loading ?
<div className="absolute h-full w-full  top-0 rounded-md flex justify-center items-center ">
<div 
    className="  h-[22px]  md:h-[30px] w-[22px] md:w-[30px] border-2 md:border-4 border-t-transparent border-blue-900 rounded-full animate-spin"
  ></div> 
</div>:""
}

<i class="fa-solid fa-trash"></i>

</button>
      </div>
      </div>
      <p className= 'text-[9px] md:text-[11px]  text-myHalfWhite]' >{formatCreatedAt(todo.createdAt)}</p>
    </li>
}


    
    
  </ul>
  </>)
}