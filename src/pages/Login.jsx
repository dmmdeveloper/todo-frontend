import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Login() {


const [isFocus,setIsFocus] = useState(false)
const [showPassword ,setShowPassword] = useState(false)




  return (<>

<div className="h-screen w-full bg-myBlue flex justify-center items-center">

<form className="min-h-[300px] h-auto w-[270px] border border-[white] flex flex-col rounded-lg p-4">

{/* Inputs Div */}

<div className="mt-10 flex  flex-col  gap-7">

<div className="">
<input className='w-full h-[40px] border border-t-0 border-r-0 focus:outline-none focus:border-b-2 focus:border-l-2 focus:bg-myBlue outline-none bg-myBlue p-2 placeholder:text-[#ffffffa5]' type="email" placeholder='Type email'  />
</div>



<div className={`h-[40px] w-full flex items-center border border-t-0 border-r-0 ${isFocus ? "border-b-2 border-l-2":""} `}>

<input  onFocus={()=>setIsFocus(true)} onBlur={()=>setIsFocus(false) } className='h-full w-[85%] outline-none p-3 bg-myBlue placeholder:text-myHalfWhite' placeholder='Password'  type={`${showPassword ?"text":"Password"}`}/>

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

<button  className='h-[40px] w-full border hover:text-myHalfWhite mt-10 rounded-md text-xl hover:border-[2px] duration-100' >Login</button>
<p className='text-end pr-2  w-full'  >
<Link href='/' className='text-myHalfWhite decoration-myHalfWhite hover:text-myWhite hover:underline-offset-3 hover:tracking-wide duration-150 underline'>
  signup
</Link>

</p>

</div>







</form>

</div>

</>  )
}
