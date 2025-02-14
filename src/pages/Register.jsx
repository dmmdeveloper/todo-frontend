import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from 'react-hot-toast'
import origin from '../config'

export default function Register() {


const [formData , setFormData] = useState({
  name :"",
  email:"",
  password:""
})
const [loading,setLoading] = useState(false)
const [avatar , setAvatar] = useState(null)
const navigate = useNavigate(null)
const handleInput = (e)=>{

const {name, value} = e.target;
setFormData( (prev) => ({
  ...prev , [name]:value
}) )

}
// console.log(formData);
// 
const handleSubmit = async(e)=>{

  e.preventDefault()
  const formToSend = new FormData();
  formToSend.append("name", formData.name); // Use formData state for text fields
  formToSend.append("email", formData.email);
  formToSend.append("password", formData.password);
  formToSend.append("avatar", avatar); // Append the avatar file

try {
  setLoading(true)
const respose  =  await axios.post(
  `${origin}/user/register`
  // `http://localhost:2000/user/register`

   , formToSend , {
  withCredentials : true,
  headers:{
    "Content-Type":"multipart/form-data"
  }
})
const data = await respose.data;
localStorage.setItem("token",data?.data?.token)
console.log( "Data", data);  
if(data){
  toast.success(data.message);
  navigate("/select-mode")

}


} catch (error) {
  console.log("Form Not Submitted"  , error);
  if(error?.response?.data){
    toast.error(error.response.data.message)
  }
  toast.error("Form Not Submitted .. Something went wrong")
}
finally{
  setLoading(false);
}
}

const [isFocus,setIsFocus] = useState(false)
const [showPassword ,setShowPassword] = useState(false)
const [fileName, setFileName] = useState('No file chosen');
const [previweImage , setPreviewImage] = useState("");


const handleFileChange = (event) => {
    const file = event.target?.files[0];
    setAvatar(file)
    console.log(file);
    setFileName(file ? file.name : 'No file chosen');
const reader = new FileReader()
reader.readAsDataURL(file)
reader.onload = ()=>{
    setPreviewImage(reader.result)
}


  };





  
  return (<>

<div className="h-screen w-full bg-myBlue flex justify-center items-center">

<form onSubmit={handleSubmit} className="min-h-[300px] h-auto w-[270px] border border-[white] flex flex-col rounded-lg p-4">

{/* Inputs Div */}

<div className="mt-10 flex  flex-col  gap-7">

<div className="">
<input onChange={handleInput} required value={formData.name} name='name' className='w-full h-[40px] border border-t-0 border-r-0 focus:outline-none focus:border-b-2 focus:border-l-2 focus:bg-myBlue outline-none bg-myBlue p-2 placeholder:text-[#ffffffa5]' type="text" placeholder='Type name'  />
</div>

<div className="">
<input onChange={handleInput} required value={formData.email} name='email'  className='w-full h-[40px] border border-t-0 border-r-0 focus:outline-none focus:border-b-2 focus:border-l-2 focus:bg-myBlue outline-none bg-myBlue p-2 placeholder:text-[#ffffffa5]' type="email" placeholder='Type email'  />
</div>


<div className={`h-[40px] w-full flex items-center border border-t-0 border-r-0 ${isFocus ? "border-b-2 border-l-2":""} `}>

<input onChange={handleInput} required value={formData.password} name='password'   onFocus={()=>setIsFocus(true)} onBlur={()=>setIsFocus(false) } className='h-full w-[85%] outline-none p-3 bg-myBlue placeholder:text-myHalfWhite' placeholder='Password'  type={`${showPassword ?"text":"Password"}`}/>

<div className='h-full flex items-center justify-center' >
<button onClick={(e)=>{setShowPassword(!showPassword) ; e.preventDefault() ; }} >
    {
        showPassword ?
<i className="fa-regular fa-eye-slash text-myHalfWhite hover:text-myWhite p-2"></i>
:
<i  className="fa-regular fa-eye text-myHalfWhite hover:text-myWhite p-2"></i>
    }
    </button>
</div>


</div>
<div className="flex items-center justify-between ">
      {/* Label triggers the file input */}
      <div>
      <label
        htmlFor="file-input"
        className="bg-[#4c99f2]  text-white px-4 py-2 rounded cursor-pointer hover:bg-[#589ce9]"
      >
        Choose Avatar
      </label>
      {/* Hidden file input */}
      <input
        type="file"
        id="file-input"
        className="hidden"
        onChange={handleFileChange}
      />
      </div>

      {/* Display selected file name */}
      {
        previweImage ?
        <img  className='h-[40px] w-[40px]' src={previweImage} alt="" />
        :
        <span className=" text-myHalfWhite">{fileName}</span>
      }
    </div>
</div>

{/* log in */}

<div className="">

<button 
  type="submit" 
  className="h-[40px] w-full border hover:text-myHalfWhite mt-10 rounded-md text-xl hover:border-[2px] duration-100 flex items-center justify-center"
>
  {
    loading ?
    <div 
    className="h-[25px]  md:h-[30px] w-[25px] md:w-[30px] border-2 md:border-4 border-t-transparent border-myWhite rounded-full animate-spin"
  ></div> :
  <span className="ml-2">Signup</span>

  }
</button>
<p className='text-end pr-2  w-full'  >
<Link to='/login' className='text-myHalfWhite decoration-myHalfWhite hover:text-myWhite hover:underline-offset-3 hover:tracking-wide duration-150 underline'>
  login
</Link>
</p>
</div>

</form>

</div>

</>  )
}
