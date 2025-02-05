import React, { useState } from "react";
import Nav from "../components/Nav";
import { useAppContext } from "../context/AppContex";
import axios from "axios";

export default function Collection() {
  const { profile  ,collections } = useAppContext();


  return (
    <>
      <div className="min-h-screen h-auto w-full bg-myBlue pb-9">
        <Nav />
        {/* Content */}
        <section className="md:w-[60%] w-full mx-auto min-h-[300px] h-auto  mt-7">
          {/* Create Collection Name */}
          <CreateCollection />

          {/* Collection Items */}
          <section className="mt-7 md:w-[80%] w-full mx-auto" >

            <ul>
{
  collections.map((collection)=>{
    return(<>
    
    <li key={collection?._id} >
            <CollectionItem name = { collection?.name} />
              </li>
    </>)
  })
}
      
            </ul>
              </section>
        </section>
      </div>
    </>
  );
}


function CreateCollection() {

  const [openCollectionNameInput, setOpenCollectionNameInput] = useState(false);
  const [name, setInput] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {
      // http://localhost:2000/collection/create
      const response = await axios.post(

        `http://localhost:2000/collection/create`,
        { name },
        {
          withCredentials:true,
          headers:{
            "Content-Type":'application/json'
          }
        }
      );
const data = await response.data;
console.log(data);
if(data){
  setOpenCollectionNameInput(false)
  setInput("")
}
    } catch (error) {
      console.log("Collection Not Created :)", error);
      
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="md:w-[70%] w-[90%]  mx-auto flex    rounded-lg"
      >
        {/* Text section grows automatically */}
        <div className=" flex-1 p-1 relative">

          {openCollectionNameInput ? (
            <input
            required
              value={name}
              onChange={(e) => setInput(e.target.value)}
              className="h-[40px] w-[80%] absolute text-xl top-0 right-0 animated-expand bg-myBlue border outline-none px-3 rounded-tl-[30px] rounded-bl-[30px] shadow-sm focus:shadow-md focus:border-[2px] placeholder:text-[#ffffff95] z-20"
              placeholder="Enter Collection Name"
              type="text"
            />
          ) : 
          <span className="text-2xl px-2">Start Creating Collections</span>
          }
        </div>

        {/* Button section with fixed width */}
        <div className="w-[43px] flex justify-center">
          {openCollectionNameInput ? (
            <button
              title="Save"
              type="submit"
              className="h-[40px] w-[40px] border-[2px] text-2xl rounded-full flex justify-center items-center hover:opacity-80"
            >
              <i class="fa-solid fa-folder-open"></i>
            </button>
          ) : (
            <button
              title="Opne Input"
              onClick={(e) => {
                e.preventDefault();
                setOpenCollectionNameInput(true);
              }}
              className="h-[40px] w-[40px] border-[2px] text-2xl rounded-full flex justify-center items-center hover:opacity-80"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>
      </form>
    </>
  );
}

function CollectionItem({name}) {


  const  [ showEditName , setShowEditName] = useState(false)

  return(<>
<div className="h-[40px] relative w-[95%]  mx-auto flex gap-1 mt-9 items-center">


  {/* Progress Circle - Fixed Width */}
  <div className="relative flex items-center justify-center md:w-[40px] md:h-[40px] h-[35px] w-[35px] rounded-full  bg-[conic-gradient(#00000087_0%_70%,#FFFFFF_70%_100%)]">

    {/* Inner Circle */}
    <div className="absolute md:w-[33px] md:h-[33px] h-[30px] w-[30px] bg-myBlue text-black rounded-full"></div>
    
    {/* Centered Text */}
    <span className="absolute md:text-sm text-[12px] text-white">6/10</span>
  </div>

  {/* Collection and Date - Flexible Width */}
  <div className="h-full flex-1 flex flex-col justify-center">


    <input type="text"  
      value={name} 
      className="md:font-bold font-[500] bg-transparent outline-none border-none md:text-[27px] text-[23px] z-10 truncate w-full"
      readOnly 
    />
    <time className="md:text-[12px] text-[10px] text-[#ffffffb2] relative bottom-[5px] md:bottom-[7px]">2:56 AM | 01/01/25</time>
  </div>

  {/* Action Buttons - Auto Adjust Width */}
  <div className="flex h-full items-center justify-end gap-4 md:text-2xl text-[20px] w-[auto]">
    {/* Rename */}
    <div>
    <button onClick={()=>setShowEditName(true)} className="hover:opacity-80 "><i className="fa-solid fa-pen"></i></button>
    </div>
    {/* Completed/Uncompleted */}
    <button className=" hover:opacity-80" >
      <i className="fa-regular fa-square-check text-[#fdf8f8a4]"></i>
    </button>

    {/* Delete */}
      <i className="fa-solid fa-trash hover:opacity-80 cursor-pointer"></i>
  </div>




  {/* Edited Input */}

  {
    showEditName ?
    <div className="h-[42px]  w-full absolute z-30 bg-myBlue shadow-sm gap-3 border top-0 left-0 right-0  show-collection-edit-name flex justify-between items-center">
    <input value={"Coding "} className="bg-transparent p-1  flex-1 h-full outline-none border-none text-xl" type="text" />

    <button className="md:h-[36px] h-[32px] md:w-[80px] w-[60px] bg-white text-myBlue mr-[2px] text-xl hover:opacity-90 cursor-pointer]" onClick={()=>setShowEditName(false)} >Save</button>

  </div>:""

  }



</div>


    </>)
  
}