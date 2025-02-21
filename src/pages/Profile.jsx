import React, { useEffect, useRef, useState } from 'react'
import { useAppContext } from '../context/AppContex'
import { Link } from 'react-router-dom'
import bcryptjs from "bcryptjs";
import "@fortawesome/fontawesome-free/css/all.css";
import axios from 'axios';
import origin from '../config';

export default function Profile() {

const {  profile ,todos , logOut , logOutLoading , collections } =  useAppContext();

const [showEdit ,setShowEdit] = useState(false) 
const [CollectionData , setCollectionData] = useState(null)

const CompletedTodos  = todos.filter((t)=> t.completed === true).length;
const remainingTodos = todos.filter( (t)=> t.completed === false ).length;

const fetchTotalCollection = async ()=>{  

  try {
    const {data} =await axios.get(`${import.meta.env.VITE_ORIGIN}/collection/total` , { withCredentials :true })
    setCollectionData(data.data)
    console.log(data.data);
    
    
  } catch (error) {
    
    console.log("Total Collection Are Not Fetched :)" ,error);
    
  }

}

useEffect(()=>{
  fetchTotalCollection()
}, [])

  return (<>
{/* {todos.length} */}
  <div  className="min-h-screen h-auto w-full bg-myBlue text-myWhite flex justify-center items-center ">

{/* Back */}
<Link to={"/"} className="md:h-[60px] md:w-[60px] h-[45px] w-[45px]  md:border-[2px] border  fixed top-1 left-1 flex justify-center items-center rounded-full">
  <div className="md:h-[52px] md:w-[52px] h-[40px] w-[40px] hover:justify-end  bg-white  rounded-full flex justify-center items-center rotate-180" >
  <i class="fa-solid fa-arrow-right text-myBlue md:text-[30px] text-[20px]"></i>
  </div> 
</Link>



<div className=" flex justify-center items-center flex-col ">

<figure className='h-[210px] w-[210px] border-[2px] rounded-full flex justify-center items-center' >
  <img className='h-[200px] w-[200px] rounded-full' src={profile?.avatar} alt="" />
</figure>

<h1 className='text-center text-3xl' >{profile?.name}</h1>
<div class="flex justify-center mt-5">
  <table class="table-auto border-collapse border border-gray-500">
    <thead>
      <tr>
        <th class="border border-white text-start px-4 py-2">Todos</th>
        <th class="border border-white px-4 py-2 text-start ">Collections</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="border border-white px-2 py-2">
          <ul>
            <li className='flex items-center text-[15px] md:text-[18px]  ' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Total Todos </span> : {todos.length}</li>
            <li className='flex items-center text-[12px] md:text-[18px]' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Completed Todos </span> : {CompletedTodos}</li>
            <li className='flex items-center text-[13px] md:text-[18px]' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Remaining Todos </span> : {remainingTodos}</li>
          </ul>          
        </td>
   <td class="border border-white px-2 py-2">
           <ul>
            <li className='flex items-center text-[15px] md:text-[18px]' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Total Collections </span> : {CollectionData?.collections
            }</li>
            <li className='flex items-center text-[15px] md:text-[18px]' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Total Todos </span> : {CollectionData?.totalObjects}
            </li>
            <li className='flex items-center text-[15px] md:text-[18px]' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Completed Todos </span> : {CollectionData?.trueObject}</li>
            <li className='flex items-center text-[15px] md:text-[18px]' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Remaining Todos </span> : {CollectionData?.falseObjects}</li>
          </ul>
        </td>        
      </tr>
    </tbody>
  </table>
</div>




</div>

{/* logout */}

<button onClick={logOut} className="md:h-[40px] md:w-[130px] h-[30px] w-[100px] cursor-pointer border fixed top-1 right-1 flex justify-center items-center p-1 ">
<div className="md:h-[35px] md:w-[128px] h-[25px] w-[97px] hover:opacity-90 text-myBlue md:text-[20px] text-[15px] bg-white gap-1 flex justify-center items-center p-1 ">
<i class="fa-solid fa-arrow-right-from-bracket text-myBlue"></i>  Logout
  </div>
</button>

{/* Edit Button */}

<button onClick={()=>setShowEdit(true)} className="md:h-[40px] md:w-[130px] h-[30px] w-[100px] cursor-pointer border fixed top-[50px] right-1 flex justify-center items-center p-1 ">
<div className="md:h-[35px] md:w-[128px] h-[25px] w-[97px] hover:opacity-90 text-myBlue md:text-[17px] text-[12px] bg-white gap-1 flex justify-center items-center p-1 ">
<i class="fa-solid fa-pen-to-square text-myBlue"></i>  Edit Profile
  </div>
</button>

{/* Edit Body */}

{
  showEdit ? 
<EditProfile showEdit={showEdit} setShowEdit= {setShowEdit}/>
:null

}


{
  logOutLoading ?
<div className="h-screen w-full backdrop-blur-sm fixed top-0 flex z-30 justify-center items-center">
<div 
  className="h-[300px] w-[300px] border-4 border-t-transparent border-myHalfWhite rounded-full animate-spin"
></div> 
</div>
:""
}



  </div>
</>  )
}

function EditProfile({ showEdit, setShowEdit }) {
const { profile , passwordForVerification , fetchProfile } = useAppContext();

const [editname, setEditName] = useState(false);
const [profilePreview , setProfilePreview] = useState(null)
const imgRef = useRef();
const [submitLoading , setSubmitLoading] = useState(false)

// Fields
  const [name, setName] = useState(profile.name); //done
  const [newProfile,setProfile] = useState(null);    // done
  const [email , setEmail] = useState(profile.email); // done
  const [password , setPassword] = useState("app password here"); // done

  // Open file input when clicking the image or camera button

  const showGetImg = () => {
    imgRef.current.click();
  };
  const handleFileChange = (e) => {

    const file = e.target.files[0]; // Get the selected file
    if (file) {
      // Convert file to URL for preview
      const imageUrl = URL.createObjectURL(file);
      // setProfile(imageUrl);
      setProfilePreview(imageUrl)
      setProfile(file)
    }

  };

const hanldeSubmit = async (e)=>{

e.preventDefault();

const formData =new FormData();
if(name != profile.name) formData.append("name" , name)
if(email != profile.email) formData.append("email" , email);
if(!password.includes("app") &&  password !== passwordForVerification ) formData.append("password" ,password);
if(newProfile) {
  formData.append("newProfile" , newProfile)
}
try {
setSubmitLoading(true)
const {data} = await axios.post(`${origin}/user/update`, formData , {
  withCredentials:true,
  headers:{
    "Content-Type":"multipart/form-data"
  }
} )
if(data) {
  setShowEdit(false);
  fetchProfile()
}

} catch (error) {
  console.log("Profile not Edited ::" ,error ) ;
}
finally{setSubmitLoading(false)}
}

  return (
    <div className="edit-profile-blur-body">
      <form  onSubmit={hanldeSubmit} className="edit-profile-form h-auto w-[300px] rounded-md border flex flex-col p-3">
        {/* Profile Image Section */}
        <figure className="border p-1 h-[250px] w-[250px] rounded-full mx-auto relative">
          <img
            onClick={showGetImg}
            className="hover:opacity-95 cursor-pointer h-full w-full rounded-full"
            src={profilePreview ? profilePreview : profile.avatar}
            alt="Profile"
          />
          {/* Camera Button */}
          <button
            type="button"
            onClick={showGetImg}
            className="border hover:opacity-80 h-[30px] w-[30px] rounded-full text-xl bottom-5 right-0 bg-white text-myBlue absolute"
          >
            <i className="fa-solid fa-camera text-myBlue"></i>
          </button>
          {/* Hidden File Input */}
          <input ref={imgRef} onChange={handleFileChange} type="file" className="hidden" />
        </figure>

        {/* Name Edit Section */}
        <div className="flex justify-between items-center w-full mt-5">

          <input
            onClick={() => setEditName(true)}
            readOnly={!editname}
            value={name}
            onChange={(e)=>setName(e.target.value)}
            className={`text-xl rounded-md p-1 outline-none md:w-auto w-[85%] ${
              editname ? "border-[1px] shadow-lg bg-[#2C8FFF]" : "bg-transparent text-xl border-0"
            }`}
            type="text"
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setEditName(!editname);
            }}
            className="h-[30px] w-[30px]"
          >
            {editname ? (
              <i title="save" className="fa-solid fa-folder-open text-2xl hover:opacity-90"></i>
            ) : (
              <i title="update" className="fa-solid fa-pen hover:opacity-90"></i>
            )}
          </button>
        </div>

        {/* Email And Password Change */}
        <EditEmailAndPassword email={email} setEmail = {setEmail} password={password} setPassword ={setPassword}  />

        {/* Submission and Cancellation */}
        <div className="w-full flex justify-end items-end gap-2 mt-5">
          <button className="text-xl border py-[1px] hover:opacity-70 rounded px-1" onClick={() => setShowEdit(false)}>
            Cancel
          </button>
          <button type='submit' className={`text-xl hover:opacity-70 border py-[1px] rounded px-1 bg-white text-myBlue ${submitLoading ?"bg-myBlue animate-pulse pointer-events-none cursor-not-allowed":""} `}>
            {
              submitLoading ? 
"Updating...":"Update"
            }
          </button>
        </div>
      </form>
    </div>
  );
}

function EditEmailAndPassword({email , setEmail , password , setPassword}) {
const {profile ,passwordForVerification , setPasswordForVerification } =useAppContext()

const [showEditEmailPassword , setShowEditEmailPassword] = useState(false)
const [showVerifyPassword ,setShowVerifyPassword ]  =useState(false)
const [isPasswordCorrect , setIsPasswordCorrect]= useState(false)
// const [passwordForVerification,setPasswordForVerification] =useState("");
const [editEmail , setEditEmail] = useState(false)
const [editPassword ,setEditPassword ] = useState(false) 
const [passwordError , setPasswordError] =useState(false)

const verifyPassword = async (e)=>{

e.preventDefault()
const isPasswordValid = await bcryptjs.compare(passwordForVerification.trim(),profile.password)
console.log(isPasswordValid);

if(isPasswordValid){

  setShowVerifyPassword(false)
setIsPasswordCorrect(true)
setPasswordError(false);
setPassword(passwordForVerification);
}else{
  setPasswordError(true);
}

}

const popUpref = useRef(null)
const clzVerifyPasswordClikOutSide = (e)=>{
  if(popUpref.current && !popUpref.current.contains(e.target)){
    setShowVerifyPassword(false)
  }
}

useEffect(()=>{
window.addEventListener("mousedown"  ,clzVerifyPasswordClikOutSide);
window.addEventListener("touchstart"  ,clzVerifyPasswordClikOutSide)
} , [showVerifyPassword])

return(<>
<div className="mt-5 relative">

<div onClick={()=>setShowEditEmailPassword(!showEditEmailPassword)} className=" flex justify-between items-center cursor-pointer hover:opacity-90">
  <p className='text-[#ffffffa8]' > Edit Password And Email</p>
  <div className={`${showEditEmailPassword ?"rotate-180":" rotate-0"} duration-200`}>
    <i class="fa-solid fa-chevron-down"></i>
  </div>
</div>

{/* emial and passaoed div */}
{
  showEditEmailPassword ?
  (<>

  <div className={`emial-password-edit-div`}>
{/* emial div */}
<div className=" flex justify-between items-center mt-3">
  


<div className=" flex items-center gap-3">
<i class="fa-solid fa-envelope text-xl"></i>
<input readOnly={ editEmail ? false:true } value={email}  onChange={(e)=>setEmail(e.target.value)}
 className={` rounded-md outline-none ${
  editEmail ? "border-[1px] shadow-lg bg-[#2C8FFF] p-[2px]" : "bg-transparent border-0"
}`} onClick={()=>setEditEmail(isPasswordCorrect  ? true: false)}

type={isPasswordCorrect ?"text" :"password"} name="" id="" />
</div>
{
  isPasswordCorrect ? 
<button onClick={(e)=>{ e.preventDefault() ;setEditEmail(!editEmail)}} className='cursor-pointer hover:opacity-80' >
  {
    editEmail ? 
    <i class="fa-solid fa-folder-open"></i>
    :
<i class="fa-solid fa-pen"></i>
  }

</button>
  :
  <button onClick={(e)=> {e.preventDefault() ;  setShowVerifyPassword(true)}}  className='cursor-pointer hover:opacity-80' >
<i class="fa-solid fa-lock"></i></button>

}


</div>

{/* password div */}
<div className=" flex justify-between items-center mt-3">

<div className=" flex items-center gap-3">
<i class="fa-solid fa-key text-xl"></i>
<input onChange={(e)=>setPassword(e.target.value)} readOnly={ editPassword ? false:true } value={password}  className={` rounded-md outline-none ${
  editPassword ? "border-[1px] shadow-lg bg-[#2C8FFF] p-[2px]" : "bg-transparent border-0"
}`} onClick={()=>setEditPassword(isPasswordCorrect  ? true: false)} type={isPasswordCorrect ? "text":"password"} name="" id="" />
</div>
{
  isPasswordCorrect ? 
<button onClick={(e)=>{ e.preventDefault() ;setEditPassword(!editPassword)}} className='cursor-pointer hover:opacity-80' >
  {
    editPassword ? 
    <i class="fa-solid fa-folder-open"></i>
    :
<i class="fa-solid fa-pen"></i>
  }

</button>
  :
  <button onClick={(e)=> {e.preventDefault() ;  setShowVerifyPassword(true)}}  className='cursor-pointer hover:opacity-80' >
<i class="fa-solid fa-lock"></i></button>

}



</div>



</div>
  </>):null

}


{/* Verify  Password PopUp Div */}
{
  showVerifyPassword ? 
  (<>
  
<div ref={popUpref} className="h-auto z-20 w-full bg-myBlue border rounded-md absolute top-0 verify-passwrod-popup-div px-2 pb-2">
<div className="text-center text-2xl">
<i class="fa-solid fa-lock"></i>
</div>
<div className="mt-2">
  <label htmlFor="">Enter Your App Password*</label>
  <input onFocus={()=>setPasswordError(false)} value={passwordForVerification} onChange={(e)=>setPasswordForVerification(e.target.value)} className={`bg-[#0000ff00] w-full outline-none ${passwordError ? "border-[red] text-[red]":""} border `}  type="text" />
  {
    passwordError ?
    <span className='text-[red]' >Incorrect Password</span>
    : null
  }
</div>
<div className=" mt-2 flex gap-1 justify-end">
<button onClick={(e)=>{e.preventDefault() ; setShowVerifyPassword(false)}} className='border py-[1px] px-2 rounded-md hover:opacity-80' >Cancel</button>
<button onClick={verifyPassword} className='bg-myWhite text-myBlue py-[1px] px-2 rounded-md hover:opacity-80' >Verify</button>
</div>




</div>

  
  </>):null
}







</div>



  
  </>)
  
}