import React, { useRef, useState , useEffect } from "react";
import Nav from "../components/Nav";
import { useAppContext } from "../context/AppContex";
import axios from "axios";
import { formatCreatedAt } from "../utils/ConvertIntoSimpleTime.js";
import { Link } from "react-router-dom";
import origin from "../config/index.js";

export default function Collection() {
  
  const {  collections } = useAppContext();
  const [nameEditongId , setNameEditingId] = useState(null)

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
              !collections.length  > 0
    ? Array.from({ length: 5 }).map((_, index) => (

        <li key={index}>
          <CollectionSkeleton />
        </li>
      ))
    : collections.map((collection) => (
        <li key={collection?._id}>
          <CollectionItem
            name={collection?.name}
            id={collection?._id}
            time={collection?.createdAt}
            todos={collection?.todos}
            nameEditongId={nameEditongId}
            setNameEditingId={setNameEditingId}
          />
        </li>
      ))
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
  const [loading , setLoading] =useState(false)
  const {collections}  =useAppContext();
  const inputRef = useRef("");

  const handleSubmit = async (e) => {


    e.preventDefault();
    try {
      setLoading(true)
      // http://localhost:2000/collection/create
      const response = await axios.post(
        // `http://localhost:2000/collection/create`,
        `${origin}/collection/create`,
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
      
    }finally{setLoading(false)}
  };

  const openInput = (e) => {
    e.preventDefault();
    setOpenCollectionNameInput(true);
    inputRef.current.focus();
  }
  useEffect(() => {
    if (openCollectionNameInput && inputRef.current) {
      inputRef.current.focus();
    }
  }, [openCollectionNameInput]); // Runs when state changes


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
            ref={inputRef}
            required
              value={name}
              onChange={(e) => setInput(e.target.value)}
              className={`md:h-[40px] h-[30px] w-[80%] absolute md:text-xl text-[17px] top-0 right-0 animated-expand 
              ${loading ? "collap-input-loading":""} bg-myBlue border outline-none px-3 rounded-tl-[30px] rounded-bl-[30px] shadow-sm focus:shadow-md focus:border-[2px] placeholder:text-[#ffffff95] z-20`}
              placeholder="Enter Collection Name"
              type="text"
            />
          ) : 
          <span className="md:text-2xl text-[20px]  md:px-2 px-1">
            {
              collections.length > 0?
              "Create a New Collection":
              "Start Creating Collection"
            }
            </span>
          }
        </div>

        {/* Button section with fixed width */}
        <div className="md:w-[43px] w-[37px] flex justify-center">
          {openCollectionNameInput ? (
            <button
              title="Save"
              type="submit"
              className="md:h-[40px] h-[35px] w-[35px]  md:w-[40px] border-[2px] md:text-2xl text-[20px] rounded-full flex justify-center items-center hover:opacity-80"
            >
              <i class="fa-solid fa-folder-open"></i>
            </button>
          ) : (
            <button
              title="Opne Input"
              onClick={openInput}
              className="md:h-[40px] h-[35px] w-[35px]  md:w-[40px] border-[2px] md:text-2xl text-[20px] rounded-full flex justify-center items-center hover:opacity-80"
            >
              <i className="fa-solid fa-plus"></i>
            </button>
          )}
        </div>
      </form>
    </>
  );
}

function CollectionItem({ name, id, time, todos   ,nameEditongId , setNameEditingId }) {
  const { fetchCollections } = useAppContext();
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [actionType, setActionType] = useState(""); // Track which action (Select/Unselect)
const [loading  , setLoading] = useState(false);
const [loadingDelete ,setLoadingDelete]  =useState(false)
const [newName , setNewName] = useState(name);
const [newNameSavedLoading , setNewNameSavedLoading] = useState(false);
const [isDelete , setIsDelete] = useState(false);

  const completed = todos.filter((todo) => todo.completed === true).length;
  const progressPercentage = todos.length === 0 ? 0 : (completed / todos.length) * 100;

  const unCompletedAllTodos = async () => {
    try {
      const response = await axios.put(`${origin}/collection/uncompleted/${id}`, { withCredentials: true });
      const data = response.data;
      console.log(data);
      if (data) fetchCollections();
    } catch (error) {
      console.log("Todo Not Completed ::", error);
    }
  };

  const completedAllTodos = async () => {
    try {
      const response = await axios.put(`${origin}/collection/completed/${id}`, { withCredentials: true });
      const data = response.data;
      console.log(data);
      if (data) fetchCollections();
    } catch (error) {
      console.log("Todo Not Completed ::", error);
    }
  };
  const deleteTodo = async ()=>{

    try {
      setLoadingDelete(true)
      const response = await axios.delete(
        // `http://localhost:2000/collection/delete/${id}`
        `${origin}/collection/delete/${id}`
         , { withCredentials : true})
      const data = await response.data;
      console.log(data);
      if(data) {
        setIsDelete(false)
      
        fetchCollections()
      }

    } catch (error) {
      console.log("Todo Not Deleted :)", error); 
    }finally{
      setLoadingDelete(false)
    }
    }
  // Handle confirmation and execute the action
  const handleConfirmAction = async () => {

    setLoading(true);
    if (actionType === "select") {
      await completedAllTodos();
    } else {
      await unCompletedAllTodos();
    }
    setLoading(false);
    setShowConfirmPopup(false); // Close popup only after completion
  };

  // http://localhost:2000/collection/edit-name/67a49ba3f93a3aecec66a005
  const editName = async (e)=>{

    e.preventDefault()
    try {
      
      setNewNameSavedLoading(true)
      const response = await axios.put(`${origin}/collection/edit-name/${id}` , {
        text  : newName
      } , 
      {
        withCredentials : true , 
        headers:{
          "Content-Type" :"application/json"
        }
      }
    )
    const data = await response.data;
    console.log(data);
    if(data) setNameEditingId(null)
    } catch (error) {
      console.log("Collection Not Renamed :)" , error); 
    }finally{ setNewNameSavedLoading (false)}
  }
  return (

    <>
      {/* Main Collection Item */}
      <div className="md:h-[40px] h-[35px] relative w-[95%] mx-auto flex gap-1 mt-5 md:mt-9 items-center">
        
        {/* Progress Circle */}
        <div 


          className="relative flex items-center justify-center md:w-[40px] md:h-[40px] h-[32px] w-[32px] rounded-full"
          style={{
            background: `conic-gradient(#00000087 ${progressPercentage}% 0%, #FFFFFF ${progressPercentage}% 100%)`
          }}
        >
          <div className="absolute md:w-[33px] md:h-[33px] h-[28px] w-[28px] bg-myBlue text-black rounded-full"></div>
          <span className="absolute md:text-[12px] font-bold text-[11px] text-white">
            {completed}/{todos.length}
          </span>
        </div>

        {/* Collection Info */}
        <div className="h-full flex-1 flex flex-col justify-center">
<Link to={`/collection/todos/${id}`} className="cursor-pointer" >
          <input
            type="text"
            value={name}
            className={`md:font-bold cursor-pointer font-[500] bg-transparent outline-none border-none md:text-[27px] text-[23px] z-10 w-full relative md:top-0 top-1 
            ${todos.length > 0 && completed !== 0 ? (todos.length === completed ? 'opacity-50' : '') : ''}`}
            readOnly
          />
          <time className="md:text-[12px] text-[10px] text-[#ffffffb2] relative bottom-[6px]">
            {formatCreatedAt(time)}
          </time>
          </Link>
        </div>

        {/* Action Buttons */}
        <div className="flex h-full items-center justify-end md:gap-4 gap-3 md:text-2xl text-[18px] w-[auto]">
          {/* Rename */}
          <button onClick={() => setNameEditingId(id)} className="hover:opacity-80">
            <i className="fa-solid fa-pen"></i>
          </button>

          {/* Completed/Uncompleted with Pop-up Confirmation */}
          <button
            title={
              todos.length === 0
                ? "Create todos"
                : completed === todos.length
                ? "Unselect all"
                : "Select all"
            }
            onClick={() => {
              if (todos.length === 0) return;
              setActionType(completed === todos.length ? "unselect" : "select");
              setShowConfirmPopup(true);
            }}
            disabled={todos.length === 0}
            className={`hover:opacity-80 ${todos.length === 0 ? 'cursor-not-allowed opacity-50' : ''}`}
          >
            <i className={`fa-regular fa-square-check ${
              todos.length === 0 ? 'text-gray-400' : completed === todos.length ? 'text-white' : 'text-[#fdf8f8a4]'
            }`}></i>
          </button>
          {/* Delete */}
          <button 
  onClick={()=>setIsDelete(true)} 
  className="relative flex items-center justify-center h-5 w-5 bg-opacity-20"
  disabled={loadingDelete}
>
<i className="fa-solid fa-trash text-white hover:opacity-80"></i>

</button>
        </div>

        {/* Rename Input Field */}
        {nameEditongId === id &&  (        
          <form className="md:h-[42px] h-[38px]  w-full absolute z-30 bg-myBlue shadow-sm md:gap-3 gap-1 border top-0 left-0 right-0 flex justify-between items-center show-collection-edit-name">

            <input value={newName} onChange={(e)=>setNewName(e.target.value)} className="bg-transparent p-1 md:flex-1 w-[80%] h-full outline-none border-none  md:text-xl text-[17px]" type="text" />
            <button
            type="submit"
              className="md:h-[36px] h-[32px] md:w-[80px] w-[60px] bg-white text-myBlue mr-[2px] text-xl hover:opacity-90 cursor-pointer flex justify-center items-center"
              onClick={editName}
            >
              {
                newNameSavedLoading ?
                <div className=" h-[30px] w-[30px] border-2 border-[#6e6ee4] border-t-transparent rounded-full animate-spin"></div>
                :"Save"
            }


            </button>


          </form>
        )}
      </div>
      {/* Custom Confirmation Modal */}

      {showConfirmPopup && (
        <div style={{backdropFilter : "blur(5px)"}} className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">

          <div className="bg-myBlue select-all-permision-popup border-[2px] rounded-lg p-5 w-[300px] text-center shadow-lg">
            <p className="text-lg font-semibold">
              {actionType === "select" ? "Select all todos?" : "Unselect all todos?"}
            </p>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => setShowConfirmPopup(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded flex items-center justify-center ${
                  loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                }`}
                disabled={loading}
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  "Yes"
                )}
              </button>
            </div>
          </div>
        </div>
      )}

{/* Confirm Delete popup */}
{
  isDelete  && (

<div style={{backdropFilter : "blur(5px)"}} className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-50">


<div className="bg-myBlue select-all-permision-popup border-[2px] rounded-lg p-5 w-[300px] text-center shadow-lg">
<h2 className="text-start text-xl font-bold flex" > <span className="" >Delete</span> <span className="text-red-700 font-normal" >*</span><input value={name} readOnlytype="text" className="flex-1 w-[80%] bg-transparent outline-none truncate border-none"  />?</h2>
<p className="text-myWhite text-sm text-justify mt-1"  >Are you sure you want to delete <span className="font-bold" >{name.slice(0,5)}</span>? </p>
  <div className="flex justify-around mt-4">
    <button
      className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
      disabled={loading}
      onClick={()=>setIsDelete(false)}
    >
      Cancel
    </button>
    <button
    onClick={deleteTodo}
      className={`px-4 py-2 rounded flex items-center justify-center bg-red-600 ${
        loadingDelete ? "bg-blue-300 cursor-not-allowed" : " hover:opacity-80 text-white"
      }`}
      disabled={loading}
    >
      {loadingDelete ? (
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      ) : (
        "Yes"
      )}
    </button>
  </div>
</div>
</div>
  )
}


    </>
  );
}


const CollectionSkeleton = () => {

  return (
    <div className="h-[40px] relative w-[95%] mx-auto animate-pulse flex gap-1 mt-9 items-center ">

      {/* Progress Circle */}
      <div className="relative flex items-center justify-center md:w-[40px] md:h-[40px] h-[35px] w-[35px] rounded-full bg-white bg-opacity-50 animate-pulse">

        <div className="absolute md:w-[33px] md:h-[33px] h-[30px] w-[30px] animate-pulse bg-myBlue bg-opacity-50 rounded-full"></div>
      </div>

      {/* Collection Info */}
      <div className="h-full flex-1 flex flex-col justify-center">
        <div className="w-3/4 h-6 bg-[white] bg-opacity-50 rounded-md"></div>
        <div className="w-1/3 h-4 bg-white bg-opacity-30 rounded-md mt-1"></div>
      </div>

      {/* Action Buttons */}
      <div className="flex h-full items-center justify-end gap-4 md:text-2xl text-[20px] w-[auto]">
        {/* Rename */}
        <div className="w-[34px] h-[34px] bg-white bg-opacity-50 rounded-md"></div>

        {/* Completed/Uncompleted Button */}
        <div className="w-[34px] h-[34px] bg-white bg-opacity-50 rounded-md"></div>

        {/* Delete Button */}
        <div className="relative w-[34px] h-[34px] flex items-center justify-center bg-white bg-opacity-50 rounded-md">
          {/* <div className="absolute w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> */}
        </div>
      </div>
      
      {/* Rename Input Field */}
      {/* <div className="h-[42px] w-full absolute z-30 bg-white bg-opacity-50 shadow-sm gap-3 border top-0 left-0 right-0 flex justify-between items-center">
        <div className="w-full h-full bg-white bg-opacity-50 rounded-md"></div>
        <div className="md:h-[36px] h-[32px] md:w-[80px] w-[60px] bg-white bg-opacity-50 rounded-md flex justify-center items-center">
          <div className="h-[30px] w-[30px] border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div> */}
    </div>
  );
};

