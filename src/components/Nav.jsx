import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContex';
import todoLogo from "../../public/todo-logo.png";

export default function Nav() {
  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);
  const btnRef = useRef(null);
const {logOut  ,logOutLoading , profile ,changeMode , modeLoading } = useAppContext()
// console.log("Profile" , profile);

  // Function to handle the click outside logic
  const clzNavClickOutside = (event) => {
    // Close the nav if clicked outside the button or nav
    if (
      navRef.current && btnRef.current &&
      !(btnRef.current.contains(event.target) || navRef.current.contains(event.target))
    ) {
      setShowNav(false); // Close the nav if clicked outside
    }
  };

  useEffect(() => {
    window.addEventListener('mousedown', clzNavClickOutside);
    window.addEventListener('touchstart', clzNavClickOutside);

    return () => {
      window.removeEventListener('mousedown', clzNavClickOutside);
      window.removeEventListener('touchstart', clzNavClickOutside);
    };
  }, []);

  const toggleNav = () => {
    setShowNav((prev) => !prev);
  };

  return (
    <>
{
  logOutLoading || modeLoading ?
<div className="h-screen w-full backdrop-blur-sm fixed top-0 flex z-30 justify-center items-center">
<div 
  className="h-[300px] w-[300px] border-4 border-t-transparent border-myHalfWhite rounded-full animate-spin"
></div> 
</div>
:""
}
      <nav className=' h-[55px] md:h-[70px] w-full border-b-2 flex justify-between px-1 md:px-3 items-center'>

        <h1 className='md:text-3xl text-2xl text-wrap flex justify-center items-center '>

         { profile?.name ? profile.name :(<>
          <div class="lds-facebook"><div></div><div></div><div></div></div>
         </>)}<span className='text-blue-900 italic'>'s</span> Todos
        </h1>
        <button
          ref={btnRef}
          onClick={toggleNav}
          className=" h-[45px] md:h-[50px] active:scale-95 w-[45px] md:w-[50px] cursor-pointer bg-blue-400 border rounded-full relative"
        >
          <div className="h-full w-full absolute top-0 rounded-full flex items-end justify-end">
            <div
              className={`h-[15px] z-20 w-[15px] bg-myWhite flex justify-center items-center rounded-full text-[13px] ${showNav ? 'rotate-180 duration-200 transition-all' : 'rotate-0 duration-200 transition-all'}`}
            >
              <i className="fa-solid fa-caret-down text-myBlue"></i>
            </div>
          </div>

          {
            profile?.avatar ?
            <img className="h-full w-full rounded-full" src={ profile.avatar}alt="" />:
          <img className="h-full w-full rounded-full default-image-nav" src={todoLogo} alt="" />
          }
        </button>
      </nav>
      {/* nav Items */}
      <div ref={navRef} className={`h-auto w-[150px] text-myBlue bg-white z-50 fixed top-50px md:top-[70px] right-1 ${showNav ? 'show_Nav' : 'clz_Nav'} p-2`}>
        <ul className='w-full items-center gap-1 flex flex-col'>
          <Link to={"/profile"} className="text-myBlue text-center  text-[20px] p-2 flex gap-3 items-center w-[100%] hover:bg-blue-200">
            <i className="fa-solid fa-user text-myBlue"></i>
            Profile
          </Link>
          <Link className="text-myBlue flex gap-3 items-center text-center text-[20px] p-2 w-[100%] hover:bg-blue-200">
            <i className="fa-solid fa-clock-rotate-left text-myBlue"></i> History
          </Link>
          {
            profile?.mode ==="general"?
            <Link onClick={()=>changeMode("collection")} className="text-myBlue text-[20px] flex gap-2 items-center text-center p-2 w-[100%] hover:bg-blue-200">
            <i className="fa-solid fa-layer-group text-myBlue"></i> Collections
          </Link>:
     <Link onClick={()=>changeMode("general")} className="text-myBlue text-[20px] flex gap-2 items-center text-center p-2 w-[100%] hover:bg-blue-200">

<i class="fa-regular fa-square-check text-myBlue"></i>Todos
   </Link>
          }
     
          <button  onClick={logOut} className="text-myBlue text-center flex gap-3 items-center text-[20px] p-2 w-[100%] hover:bg-blue-200">
            <i className="fa-solid fa-arrow-right-from-bracket text-myBlue"></i> Logout
          </button>
        </ul>
      </div>
    </>
  );
}
