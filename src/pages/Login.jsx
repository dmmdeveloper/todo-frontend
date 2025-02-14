import axios from 'axios'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import {  Link, useNavigate } from 'react-router-dom'
import { useAppContext } from '../context/AppContex'
import origin from '../config'

export default function Login() {
const {setProfile} = useAppContext();
const navigate = useNavigate(null)
const [isFocus,setIsFocus] = useState(false)

const [showPassword ,setShowPassword] = useState(false)

const [formData , setFormData]= useState({
  email : "",
  password :""

});
const [ loading , setLoading] = useState(false)

const handleInput = (e)=>{
  e.preventDefault()
  const {name  , value} = e.target; 
  setFormData( (prev) => ( { ...prev , [name] : value}))  
}
// console.log(formData);

const handleSubmit = async (e)=>{

  e.preventDefault();
  try {
    setLoading(true)
const dataSendTo = new FormData();
dataSendTo.append("email", formData.email)
dataSendTo.append("password" , formData.password);

const response = await axios.post(
  `${origin}/user/login`
    // `http://localhost:2000/user/login`

, dataSendTo , {
  withCredentials : true ,
  headers : {
    "Content-Type":"multipart/form-data"
  }
})
const data  = await response.data;
console.log(data.data.token);
setProfile(data.data)
toast.success(data.message)
localStorage.setItem("token", data?.data?.token)
navigate("/")

  } catch (error) {
    console.log("Form Not Submitted ::" , error);
    if(error?.response?.data) toast.error(error?.response?.data?.message)

  }finally{
     setLoading(false)}
}

  return (<>

<div className="h-screen w-full bg-myBlue flex justify-center items-center">

<form onSubmit={handleSubmit} className="min-h-[300px] h-auto w-[270px] border border-[white] flex flex-col rounded-lg p-4">

{/* Inputs Div */}

<div className="mt-10 flex  flex-col  gap-7">

<div className="">
<input onChange={handleInput} value={formData.email} required name='email' className='w-full h-[40px] border border-t-0 border-r-0 focus:outline-none focus:border-b-2 focus:border-l-2 focus:bg-myBlue outline-none bg-myBlue p-2 placeholder:text-[#ffffffa5]' type="email" placeholder='Type email'  />
</div>



<div className={`h-[40px] w-full flex items-center border border-t-0 border-r-0 ${isFocus ? "border-b-2 border-l-2":""} `}>

<input  onChange={handleInput} value={formData.password} required name='password' onFocus={()=>setIsFocus(true)} onBlur={()=>setIsFocus(false) } className='h-full w-[85%] outline-none p-3 bg-myBlue placeholder:text-myHalfWhite' placeholder='Password'  type={`${showPassword ?"text":"Password"}`}/>

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


</div>



{/* log in */}

<div className="">


<button type='submit'  className='h-[40px] w-full border hover:text-myHalfWhite mt-10 rounded-md text-xl hover:border-[2px] duration-100 flex justify-center items-center' >
{
  loading?
  <div 
  className="h-[25px]  md:h-[30px] w-[25px] md:w-[30px] border-2 md:border-4 border-t-transparent border-myWhite rounded-full animate-spin"
></div>
:<span>Login</span>
}  
  </button>
<p className='text-end pr-2  w-full'  >
<Link to='/register' className='text-myHalfWhite decoration-myHalfWhite hover:text-myWhite hover:underline-offset-3 hover:tracking-wide duration-150 underline'>
  signup
</Link>

</p>

</div>







</form>

</div>

</>  )
}
