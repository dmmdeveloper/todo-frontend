import React from 'react'
import { useAppContext } from '../context/AppContex'
import { Link } from 'react-router-dom'
import "@fortawesome/fontawesome-free/css/all.css"


export default function Profile() {
const {  profile ,todos } =  useAppContext()

  return (<>
{/* {todos.length} */}
  <div  className="min-h-screen h-auto w-full bg-myBlue text-myWhite flex justify-center items-center ">
{/* Back */}

<Link to={"/"} className="md:h-[60px] md:w-[60px] h-[45px] w-[45px]  md:border-[2px] border  fixed top-1 left-1 flex justify-center items-center rounded-full">
  <div className="md:h-[52px] md:w-[52px] h-[40px] w-[40px] hover:justify-end  bg-white  rounded-full flex justify-center items-center rotate-180" >
  <i class="fa-solid fa-arrow-right text-myBlue md:text-[30px] text-[20px]"></i>
  </div> 
</Link>

<i class="fa-thin fa-arrow-lef text-red-300"></i> 

<div className=" flex justify-center items-center flex-col ">
<figure className='h-[210px] w-[210px] border-[2px] rounded-full flex justify-center items-center' >
  <img className='h-[200px] w-[200px] rounded-full' src={profile.avatar} alt="" />
</figure>


<h1 className='text-center text-3xl' >{profile.name}</h1>
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
          <ul  >
            <li className='flex items-center' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Total Todos </span> : 20</li>
            <li className='flex items-center' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Completed Todos </span> : 20</li>
            <li className='flex items-center' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Remaining Todos </span> : 20</li>
          </ul>

          
        </td>

   <td class="border border-white px-2 py-2">
          <ul  >
            <li className='flex items-center' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Total Collections </span> : 20</li>
            <li className='flex items-center' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Total Todos </span> : 20
            </li>
            <li className='flex items-center' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Completed Todos </span> : 20</li>

            <li className='flex items-center' > <div className='h-[10px] mr-1 w-[10px] rounded-full bg-white' ></div> <span className='text-myHalfWhite'>Remaining Todos </span> : 20</li>
          </ul>

          
        </td>        
      </tr>

    </tbody>
  </table>
</div>




</div>

{/* logout */}

<button className="md:h-[40px] md:w-[130px] h-[30px] w-[100px] cursor-pointer border fixed top-1 right-1 flex justify-center items-center p-1 ">
<div className="md:h-[35px] md:w-[128px] h-[25px] w-[97px] hover:opacity-90 text-myBlue md:text-[20px] text-[15px] bg-white gap-1 flex justify-center items-center p-1 ">
<i class="fa-solid fa-arrow-right-from-bracket text-myBlue"></i>  Logout
  </div>
</button>








  </div>
</>  )
}
