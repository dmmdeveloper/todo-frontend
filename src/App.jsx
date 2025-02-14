import { Routes, Route, Navigate, useNavigate, useLocation, Router } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Register from "./pages/Register";
import SelectMode from "./pages/SelectMode";
import toast, { Toaster } from "react-hot-toast";
import { AppContextProvider } from "./context/AppContex";
import { useEffect, useState } from "react";
import Collection from "./pages/Collection";
import General from "./pages/General";
import axios from "axios";
import Profile from "./pages/Profile";
import CollectionTodos from "./pages/CollectionTodos";
import origin from "./config";

function App() {
  const [profile, setProfile] = useState([]);
  const [modeLoading, setModeLoading] = useState(false);
  const [logOutLoading, setLogOuLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [passwordForVerification, setPasswordForVerification] = useState("");
  // collections
  const [collections , setCollections ] =useState([]);
  // Single Colection
  const [singleCollection , setSingleCollection] = useState(null)
  const [singleTodoError , setSingleTodoError]  =useState(false)
  const [SingleTodoLoading , setSingleTodoLoading] =useState(false)
  const [createCollectionTodoLoading , setCreateCollectionTodoLoading] = useState(false)

  const navigate = useNavigate(null);
  const location  = useLocation()

  const fetchProfile = async () => {

    try {
      const response = await axios.get(
        `${origin}/user/profile`,
        // `http://localhost:2000/user/profile`,

        { withCredentials: true }
      );
      const data = await response.data;
      console.log(data);
      setProfile(data.data);
    } catch (error) {
      console.log("User NotFetched :))", error);
    }
  };
  const changeMode = async (mode = "general") => {

    try {
      setModeLoading(true);
      const response = await axios.post(
        `${origin}/user/mode`,
        { mode },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      console.log(data);
      navigate("/");
      if (data) {
        localStorage.setItem("mode", mode);
      }
    } catch (error) {
      console.log("Mode not Changed", error);
    } finally {
      setModeLoading(false);
    }
  };
  const logOut = async () => {
    try {
      setLogOuLoading(true);
      const response = await axios.get(
        `${origin}/user/logout`,
        // `http://localhost:2000/user/logout`

        { withCredentials: true }
      );
      const data = await response.data;
      console.log(data);

      if (data) {
        localStorage.removeItem("token");
        // window.location.reload()
        navigate("/login");
      }
    } catch (error) {
      console.log("User Not Logout ::", error);
      toast.error("User Not Logout \n Something Went Wrong !");
    } finally {
      setLogOuLoading(false);
    }
  };
  // https://todo-server-six-ashen.vercel.app
  const fetchTodos = async () => {
    try {
      const response = await axios.get(
        `${origin}/todo/todos`,
        { withCredentials: true }
      );
      const data = await response.data;
      setTodos(data.data);
    } catch (error) {
      console.log("todo Not Fetched :))", error);
      // toast.error("OOPS Todos Not Fetched !! \n Somthing Went Wrong")
    }
  };

  const fetchCollections = async ()=>{
    try {
      const response = await axios.get(`${origin}/collection/collections`, {withCredentials:true})
      const data = await response.data;
      setCollections(data.data)
      // console.log(data.data);
      
    } catch (error) {
      console.log("Collections Are Not Fetcehd :)" ,error);
      
      
    }
  }

    const fetchCollectionTodos = async (id) => {
      try {
        setSingleTodoLoading(true);
        const response = await axios.get(
          ` ${origin}/collection/collection/${id}`,
          { withCredentials: true }
        );
        const data = await response.data;
        console.log(data);
        setSingleCollection(data.data);
      } catch (error) {
        console.log("Collection Todo Not Find :)", error);
        setSingleTodoError(true);
      } finally {
        setSingleTodoLoading(false);
      }
    };
    const fetchCollectionTodo = async(collectionId)=>{

      try {
        const response = await axios.get(
          `${origin}/collection/collection/${collectionId}`,
          { withCredentials: true }
        );
        const data = await response.data;
        setSingleCollection(data.data);
        console.log(data);
      } catch (error) {
        console.log("Collection Todo Not Find :)", error);
      } 
    }

  useEffect(() => {
    fetchProfile();
    fetchTodos();
    fetchCollections()
  }, []);

  useEffect(() => {
    fetchProfile();
  }, [modeLoading]);

  useEffect(() => {
    fetchTodos();
  }, [todos]);

  useEffect(()=>{
fetchCollections()
  } , [collections , collections?.todos])

  const token = localStorage.getItem("token");


useEffect(()=>{
const titles = {
  "/"  : profile?.mode ==="collection" ? "Collections | My Todos App":"My Todos App" || "My Todos App",
  "/login" : "Lgoin | My Todos App",
  "/register":"Register | My Todos App",
  "/select-mode" :"Select Mode | My Todos App",
  "/profile" :`${profile?.name}'s Profile | My Todos App`
}

document.title = titles[location.pathname] || "My Todos App"
} , [location.pathname])

  return (
    <>
      <AppContextProvider
        value={{
          profile,
          setProfile,
          fetchProfile,
          changeMode,
          modeLoading,
          logOut,
          logOutLoading,
          todos,
          setTodos,
          passwordForVerification,
          setPasswordForVerification,
          // Collections
          setCollections , 
          collections ,
          fetchCollections,
          fetchCollectionTodos,
          singleCollection,
          setSingleCollection,
          singleTodoError ,
          SingleTodoLoading,
          fetchCollectionTodo,
          createCollectionTodoLoading,
          setCreateCollectionTodoLoading

        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              token ? (
                profile?.mode === "collection" ? (
                  <Collection />
                ) : (
                  <General />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/select-mode" element={<SelectMode />} />
          <Route path="/profile" element={<Profile />} />
          <Route path ="/collection/todos/:id"  element={<CollectionTodos/>}/>
          <Route path="*" element={<NotFound />} />

        </Routes>
      </AppContextProvider>
      <Toaster />
    </>
  );
}
export default App;
