import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import { useParams } from "react-router-dom";
import axios from "axios";
import { formatCreatedAt } from "../utils/ConvertIntoSimpleTime";
import {toast } from "react-hot-toast"
import { useAppContext } from "../context/AppContex";
import { motion  , AnimatePresence} from "framer-motion";
import origin from "../config";

export default function CollectionTodos() {

  const { id } = useParams();
  const [collection, setCollection] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const {fetchCollectionTodos, singleTodoError , SingleTodoLoading  , singleCollection } = useAppContext()

  const completed = singleCollection?.todos.filter(
    (todo) => todo.completed === true
  ).length;
  const progressPercentage =
    singleCollection?.todos.length === 0
      ? 0
      : (completed / singleCollection?.todos.length) * 100;

  useEffect(() => {
    if (id) fetchCollectionTodos(id);
  }, [id]);

  return (

    <>
      <div className="min-h-screen h-auto w-full bg-myBlue pb-9">
        {/* <Nav/> */}
        {singleTodoError ? (

          <div className="h-screen w-full bg-myBlue flex justify-start items-center flex-col">
            {" "}
            OOPs :) Some Thing Went Wront ~
          </div>
        ) : SingleTodoLoading ? (

          <div className="h-screen w-full bg-myBlue flex justify-start items-center flex-col">
            {" "}
            <CollectionTodoPageSkeleton/>
          </div>
        ) : (
          <>
            <PieChart
              name={singleCollection?.name}

              time={formatCreatedAt(singleCollection?.createdAt)}
              progressPercentage={Math.floor(progressPercentage)}
              completed={completed}
              total={singleCollection?.todos.length}
            />
            {/* Todos options Select All Delete All */}
{/* <Options/> */}

{/* Collection Todo */}
<CollectionTodo collectionId ={id} collection= {singleCollection} />
          </>
        )}
      </div>
    </>
  );
}

function PieChart({ name, time, progressPercentage, completed, total }) {


  return (
    <>
      <header>
        <section className="h-auto md:pt-5 pt-3 flex justify-center flex-col items-center">


          <div className="relative md:w-40  md:h-40 h-32 w-32  flex items-center justify-center">

            {/* Pie Chart Shape */}
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `conic-gradient(blue 0% ${progressPercentage}%, #c7c8f0 ${progressPercentage}% 100%)`,
              }}
            ></div>
            {/* Inner Circle for Donut Effect */}
            <div className="absolute  rounded-full flex  justify-center items-center font-bold">
              {" "}
              {completed}/{total}
            </div>
          </div>
          <div className="">
            <input
              value={name}
              readOnly
              className="md:text-3xl w-[90%] md:w-[90%] text-2xl mx-auto font-bold bg-transparent outline-none border-none text-center"
            />
            <p className="text-end mx-auto md:w-[50%] w-[80%] text-myHalfWhite text-[15px]">{time}</p>
          </div>
        </section>
      </header>
    </>
  );
}

function Options() {


  return(<>
<div className="h-[40px] md:w-[40%] w-[90%] mt-2 mx-auto flex justify-between items-center p-3 ">
  {/*  Select All */}
  <div className="">
    <input type="checkbox" className="scale-[2]" />
  </div>

  
<select className="bg-transparent border rounded-sm" name="" id="">
  <option className="text-myBlue" value="">New To Old</option>
  <option className="text-myBlue" value="">Old To New </option>
</select>



  </div>  
  
  </>)
  
}

function CollectionTodo({collectionId  ,collection} ){

const { singleCollection ,createCollectionTodoLoading  } = useAppContext();
const [showEditInput , setShowEditInput] = useState(null);
  return(<>
  <div className="md:w-[50%] mx-auto w-full  mt-3">
    <TodoForm  id={collectionId}/>
{/* When Create a new Todo then it's Sketon shows */}
{
  createCollectionTodoLoading && (<>

 <div className="w-[90%] md:w-[80%]  mx-auto relative md:h-[40px] h-[30px]  pb-4 mt-5 flex items-center gap-2">


<div className="md:h-[30px] md:w-[30px] h-[22px] w-[22px] bg-myHalfWhite animate-pulse rounded-md"></div>

<div className=" flex-1 w-full">

  <h2 className="md:h-[20px] h-[15px] w-[90%] md:w-[80%] bg-myHalfWhite rounded-md animate-pulse" ></h2>
  <p className=" h-[9px] md:h-[10px] w-[100px] md:w-[130px] animate-pulse bg-myHalfWhite mt-1 rounded-md" ></p>
</div>

<div className=" flex md:gap-5 gap-3">

<button className="md:h-[25px] h-[20px] md:w-[25px] w-[20px] bg-myHalfWhite rounded-md animate-pulse" ></button>
<button className="md:h-[25px] h-[20px] md:w-[25px] w-[20px] bg-myHalfWhite rounded-md animate-pulse" ></button>
</div>
 </div>  
  </>)
}
<div className={`${createCollectionTodoLoading ? "mt-3" :"mt-7"}`} > 
     <AnimatePresence >
{
  singleCollection?.todos.map((todo , index)=>{
    return(<>
    <TodoItem time = {todo?.createdAt} collectionId ={collectionId} text={todo.text} _id ={todo?._id} completed={todo?.completed} index={index} showEditInput ={showEditInput} setShowEditInput = {setShowEditInput} />
    
    </>)
  })
}
</AnimatePresence>
</div>
  </div>
  </>) 
}
function TodoForm({id}) {


const [text ,setText] = useState("");
const [loading , setLoading] =useState(false);
const { fetchCollectionTodo , setCreateCollectionTodoLoading}=  useAppContext();

const handleSubmit = async  (e)=>{

  e.preventDefault()
  try {
    setLoading(true)
    setCreateCollectionTodoLoading(true)
    const response = await axios.post(`${origin}/collection/todo/create/${id}` , { text} , {
      withCredentials:true,
      headers:{
        "Content-Type":"application/json" 
      }
    })
    const data = await response.data;
    console.log(data);
    if(data) 
      {
        await fetchCollectionTodo(id)
        setText("");   
        };
    
  } catch (error) {
    toast.error("Todo Not Created :) \n Some thing Went Wrong")
    
    console.log("Todo In Collection Not Created :))", error);
    
  }finally{setLoading(false) ; setCreateCollectionTodoLoading(false)}
}

  return(<>
<form onSubmit={handleSubmit} className="md:w-[80%] w-[90%] mx-auto border md:h-[40px] h-[30px] flex md:gap-3 gap-2 items-center">

  <input
  value={text}
  onChange={(e)=>setText(e.target.value)}
  required
    type="text"
    className="bg-transparent outline-none border-none placeholder:text-myHalfWhite  md:flex-grow w-[80%] h-full px-2"
    placeholder="Add Todo"
  />
  <button type="submit" className="md:h-[34px] h-[26px] md:text-2xl text-[20px] flex justify-center items-center md:w-[100px] w-[70px] bg-white text-myBlue  mr-[2px] md:mr-1">
{
  loading ?
  <span className="md:h-[30px] md:w-[30px]  h-[25px] w-[25px] rounded-full border-myBlue animate-spin border-t-transparent border-[2px]"></span>:
  " Add" 

}


    </button>

 
</form>

  </>)
  
};

function TodoItem({  text ,index , _id , showEditInput , setShowEditInput , completed , collectionId ,time}) {


const {fetchCollectionTodo } = useAppContext();
const [newText ,setText] =useState(text)
const [deleteLoading , setDeleteLoading] = useState(false)
const [updateTextLoading  ,setUpdateTextLoading] =useState(false) 

const {createCollectionTodoLoading} = useAppContext()

  const deleteTodo = async ()=>{
    try {
      setDeleteLoading(true)
      // http://localhost:2000/collection/todo/67a4a0e0f93a3aecec68849e/delete/67a702c7b698fe314d63bdf5
      const response = await axios.delete(`${origin}/collection/todo/${collectionId}/delete/${_id}` , {withCredentials:true}) 
      const data =await response.data;
      console.log(data);
      if(data) fetchCollectionTodo(collectionId)
    } catch (error) {
      console.log("Todo In Collection Not Deleted :)" , error);
      
    }finally{ setDeleteLoading(false)}
  }

  const todocompeleted = async()=>{

    try {
      // http://localhost:2000/collection/todo/67ab0c82631806baa20b7a00/update/67ab0cb5631806baa20b7c69
      const response = await  axios.put(`${origin}/collection/todo/${collectionId}/update/${_id}` , { 
        completed  : completed === true ? false :true
      },
  
      {
        withCredentials :true,
        headers:{
          "Content-Type":"application/json"
        }
      } 

    )
    const data = await response.data;
    console.log(data);
      
    if(data) fetchCollectionTodo(collectionId)
    } catch (error) {
      console.log("Collection Todo Not Completed :)", error);
      
      
    }
  }

  const updateText = async(e)=>{
    e.preventDefault();
    try {
      setUpdateTextLoading(true)
      const response = await axios.put(`${origin}/collection/todo/${collectionId}/update/${_id}` , {
        text :newText
      } ,
      {
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      } 
     )
      
     const data = await response.data;
     console.log(data);
     if(data){
      await fetchCollectionTodo(collectionId)
      setShowEditInput(false);
     }
     
    } catch (error) {
      console.log("Todo  Text Not Updated :)" , error);
      
    }finally{ setUpdateTextLoading(false)}
  }
  return (<>
<motion.div initial={{ opacity: 0, x: index %2 === 0 ? -20 : 20 }} 

            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.5 }}
             className={`md:w-[80%] w-[95%] mx-auto relative md:h-[40px] h-[35px]  flex items-center md:gap-3 gap-1 mt-2 md:mt-3`}>
  {/* Check box */}

  <div  className="md:h-[30px] h-[25px]  md:w-[30px] w-[25px] flex justify-center items-center">

    <input onClick={todocompeleted} checked={completed} type="checkbox" className="md:scale-[2] scale-[1.5] cursor-pointer accent-[#2cd14a]" />
  </div>

  {/* Todo Text and date (Expands dynamically) */}
  <div className="flex-1 min-w-0 ">
    <input
      readOnly
      value={text}
      type="text"
      className={`bg-transparent ${completed ? "text-myHalfWhite":""} outline-none border-none md:text-2xl text-[20px] w-full truncate relative top-2`}
    />
    <br />
    <time className="text-[13px] text-[#ffffffc8]">{formatCreatedAt(time)}</time>
  </div>

  {/* Delete and rename buttons (At the end) */}
  <div className="flex md:gap-5 gap-3">

    <button onClick={()=>setShowEditInput(_id)} className="md:text-xl text-[17px]" >
      
      <i className="fa-solid fa-pen"></i>
    </button>
    <button onClick={deleteTodo} className="md:text-xl text-[17px]" > 
      {
        deleteLoading ? 
      <div className="h-[20px] w-[20px] border-[2px] rounded-full animate-spin border-t-transparent"></div>
:
<i className="fa-solid fa-trash"></i>

      }
    </button>
  </div>
  
{/* Edit Name Div / Input */}
{
showEditInput  === _id && (<>
<form
onSubmit={updateText}
className="md:h-[45px] h-[37px] show-collection-edit-name w-full origin-left absolute top-0 border bg-myBlue items-center flex gap-3">

  <input type="text" value={newText} onChange={(e)=>setText(e.target.value)} className="flex-1 text-xl w-full bg-transparent h-full border-none outline-none p-1" />

  <button type="submit" className="md:w-[70px] w-[60px] hover:opacity-90 bg-white text-myBlue h-[90%] mr-1 text-xl flex justify-center items-center" > 
    {
      updateTextLoading ?
      <div className="h-[30px] w-[30px] border-[2px] border-myBlue rounded-full border-t-transparent animate-spin"></div>
      :

    "Save"
    }

    
    </button>

</form>
</>)
}


</motion.div>
  </>)
} 

function CollectionTodoPageSkeleton() {
  return(<>
<div className=" w-fill md:w-[40%] ">
{/* Pie Chart */}
  <div className="">
  
    <div className="md:w-40 md:h-40 h-32 w-32 bg-myHalfWhite animate-pulse mx-auto rounded-full md:mt-5  mt-3"></div>

    <div className="h-[20px] w-[300px] rounded-md bg-myHalfWhite animate-pulse mx-auto mt-1"></div>

  </div>

{/* Form */}
<form className=" mx-auto w-full border md:h-[40px] h-[30px] flex md:gap-3 gap-2 items-center mt-7">

  <input
readOnly
    type="text"
    className="bg-transparent outline-none border-none placeholder:text-myHalfWhite  md:flex-grow w-[80%] h-full px-2"
    placeholder="Add Todo"
  />
  <button disabled type="submit" className="md:h-[34px] cursor-not-allowed  h-[26px] md:text-2xl text-[20px] flex justify-center items-center md:w-[100px] w-[70px] bg-white text-myBlue  mr-[2px] md:mr-1">
    Add
    </button>

 
</form>

{/* Todo Items */}
<div className="mt-7" >
{
  Array.from({length:7}).map((_ , index)=>{
    return(<>
    
    
    <div key={index} className="md:h-[40px] h-[35px]   md:gap-3 gap-1 flex mt-2 md:mt-3 items-center ">

<div className="w-full">
    <div className="h-[20px] w-[70%] rounded-md bg-myHalfWhite animate-pulse mt-1"></div>

    <div className="h-[10px] w-[30%] rounded-md bg-myHalfWhite animate-pulse mt-1"></div>
    
</div>

<div className="flex md:gap-5 gap-3">
<div className="h-[20px] w-[20px]  rounded-md bg-myHalfWhite animate-pulse "></div>

<div className="h-[20px] w-[20px]  rounded-md bg-myHalfWhite animate-pulse "></div>
</div>


</div>
    </>)
  })
}



</div>


</div>

  
  </>)
  
}