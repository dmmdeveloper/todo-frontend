import axios from 'axios';
import { useState } from 'react';
import { useAppContext } from '../context/AppContex';



export default function SelectMode() {
const [loading , setLoading] = useState(false);
const { changeMode , modeLoading } = useAppContext()


  return (
<div className="min-h-screen h-auto w-full bg-myBlue ">

{/* .locaidng_part */}

{
  modeLoading?
<div className="h-screen w-full backdrop-blur-sm fixed top-0 flex z-30 justify-center items-center">
<div 
  className="h-[300px] w-[300px] border-4 border-t-transparent border-myHalfWhite rounded-full animate-spin"
></div> 
</div>
:""
}



<h1 className='text-center text-3xl md:pt-3 md:pb-3 pt-2' > Select tasking mode</h1>
<div className=" md:flex md:justify-center  gap-10 md:mt-1 min-h-[80%] h-auto w-[90%] md:w-[70%] m-auto">

<div className=" h-auto w-full md:w-[300px] md:m-0 m-auto mt-7">

<button onClick={()=>changeMode("general")} className='bg-myWhite text-myBlue w-full h-[40px] text-2xl select-none'   >General Mode</button>

<div className="min-h-[400px] h-auto w-full m-auto border mt-3 rounded-md p-3">
<h2 className='text-center text-2xl select-none ' >Your Tasks</h2>


<div className="h-[40px] w-full border flex justify-between items-center p-1 mt-3">
    <p className='text-myHalfWhite select-none' >add task..</p>
<button className='h-[35px] w-[50px] bg-myWhite select-none text-myBlue' >add</button>
</div>

{/* items  Div*/}

<div className="mt-5 p-1">


{/* Item */}


{
    todos.map((t)=>{
        return(<>
        
        <div key={t.id} className="flex justify-between items-center mt-3">

<div className="flex justify-between gap-1 items-center px-2">

    <div className=" flex  flex-col ">

<div className="flex items-center gap-1">
   <div className="h-[20px] w-[20px]  border-myWhite border rounded-full flex justify-center items-center">
    {
        t.completed ?
        <div className="h-[15px] w-[15px]  bg-myWhite rounded-full flex justify-center items-center"></div>
        :""

    }
   </div>
    <label className={`select-none leading-4 ${t.completed?"text-myHalfWhite":""}`} htmlFor="">{t.text}
    </label>
    </div>
    <p className='text-[12px] text-myHalfWhite select-none' >{t.createdAt}</p>

    </div>
    </div>  

    <i class="fa-solid fa-ellipsis-vertical text-2xl"></i>

</div>        
        </>)
    })
}



</div>





</div>

</div>




{/* Collection mode div */}
<div className=" h-auto w-full md:w-[300px] md:m-0 m-auto mt-7 pb-4">


<button onClick={()=>changeMode("collection")} className='bg-myWhite text-myBlue w-full h-[40px] text-2xl select-none'   >Collection Mode</button>

<div className="min-h-[400px] h-auto w-full m-auto border mt-3 rounded-md p-3">
<h2 className='text-center text-2xl select-none ' >Collections Mode</h2>

<div className="mt-6">

{/* Items div */}

{
    todosCollection.map((t)=>{
        return(<>

<div key={t.id} className=" flex justify-between items-center mt-3 px-3">

<div className="flex items-center gap-2">

<div className="h-[40px] w-[40px] rounded-full select-none border flex justify-center items-center "><p>{t.completed}/{t.total}</p></div>
<div className="">
<h2 className='text-xl select-none'>{t.text}</h2>
<p className='text-[10px] text-myHalfWhite select-none' >{t.createdAt}</p>
</div>
</div>

<div className=""><i class="fa-solid fa-ellipsis-vertical text-2xl "></i></div>




</div>

        
        
        </>)
    })
}





</div>





</div>


</div>


</div>

</div>
  )
}
const todos = [
    // {
    //   id: 1,
    //   text: "Buy groceries",
    //   completed: false,
    //   createdAt: "02:44 PM | 02-01-2024",
    // },
    // {
    //   id: 2,
    //   text: "Finish homework",
    //   completed: true,
    //   createdAt: "02:44 PM | 02-01-2024",
    // },
    {
      id: 3,
      text: "Call mom",
      completed: false,
      createdAt: "02:44 PM | 02-01-2024",
    },
    {
      id: 4,
      text: "Clean the house",
      completed: false,
      createdAt: "02:44 PM | 02-01-2024",
    },
    {
      id: 5,
      text: "Work on project",
      completed: true,
      createdAt: "02:44 PM | 02-01-2024",
    },
    {
      id: 6,
      text: "Plan vacation",
      completed: false,
      createdAt: "02:44 PM | 02-01-2024",
    },
    {
      id: 7,
      text: "Exercise for 30 mins",
      completed: true,
      createdAt: "02:44 PM | 02-01-2024",
    },
  ]; 
  const todosCollection = [
    // {
    //   id: 1,
    //   text: "Read a book",
    //   createdAt: "01:05 PM | 01-11-2022",
    //   total: 5,
    //   completed: 2,
    // },
    {
      id: 2,
      text: "Write a blog post",
      createdAt: "01:05 PM | 01-11-2022",
      total: 3,
      completed: 3,
    },
    {
      id: 3,
      text: "Prepare presentation",
      createdAt: "01:05 PM | 01-11-2022",
      total: 7,
      completed: 4,
    },
    {
      id: 4,
      text: "Organize workspace",
      createdAt: "01:05 PM | 01-11-2022",
      total: 6,
      completed: 1,
    },
    {
      id: 5,
      text: "Go for a walk",
      createdAt: "01:05 PM | 01-11-2022",
      total: 1,
      completed: 1,
    },
    {
      id: 6,
      text: "Watch a tutorial",
      createdAt: "01:05 PM | 01-11-2022",
      total: 4,
      completed: 2,
    },
    {
      id: 7,
      text: "Cook dinner",
      createdAt: "01:05 PM | 01-11-2022",
      total: 3,
      completed: 2,
    },
  ];
  
    