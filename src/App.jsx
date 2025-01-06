import { Routes , Route, Navigate, useNavigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import SelectMode from "./pages/SelectMode"
import {Toaster} from "react-hot-toast"
import { AppContextProvider } from "./context/AppContex"
import { useEffect, useState } from "react"
import Collection from "./pages/Collection"
import General from "./pages/General"
import axios from "axios"


function App() {
    
const [profile , setProfile] = useState([]);
const [modeLoading , setModeLoading] = useState(false)


const navigate = useNavigate(null)
const fetchProfile = async ()=>{

try {
const response = await axios.get(`https://todo-server-six-ashen.vercel.app/user/profile`, { withCredentials : true} )
const data = await response.data;
console.log(data);
setProfile(data.data)
} catch (error) {
    console.log("User NotFetched :))" , error);
}

}

const changeMode =async (mode ="general")=>{

    try {
      setModeLoading(true)
    const response = await axios.post(`https://todo-server-six-ashen.vercel.app/user/mode`  , { mode} , {
      withCredentials :true ,
      headers :{
        "Content-Type" :"application/json"
      }
    })
    const data = await response.data;
    console.log(data);
    navigate("/")
    
    if( data ){
      localStorage.setItem("mode" , mode)
    }
    } catch (error) {
      console.log("Mode not Changed"  , error);
    }finally{
        setModeLoading(false);
    }
      }

useEffect(()=>{
    fetchProfile()
} , []);

useEffect(() =>{
fetchProfile()
} , [modeLoading]);

console.log(profile.mode);

    const token = localStorage.getItem("token");
    const mode = "c"

return (<>

<AppContextProvider
value={{
    profile ,setProfile , fetchProfile,
    changeMode ,modeLoading  ,
    // /setModeLoading
}}
>


<Routes>

<Route path="/" element= {  token ? (profile.mode ==="collection" ?<Collection/> :<General/>): <Navigate to={"/login"} /> } /> 
<Route path="/login" element ={<Login/>} /> 
<Route path="/register" element = {<Register/>} />
<Route path="/select-mode" element = {<SelectMode/>} /> 
<Route path="*" element={<NotFound/>} />
</Routes>
</AppContextProvider>
<Toaster/>
</>)
}
export default App
