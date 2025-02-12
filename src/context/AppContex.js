import { createContext, useContext } from "react";



const AppContext = createContext(
{
    profile : [], 
    setProfile :()=>{},
    fetchProfile : ()=>{},
    changeMode : (mode)=>{},
    modeLoading :false,
    logOut : ()=>{},
    logOutLoading : false,
    todos: [],
    setTodos : ()=>{},
    passwordForVerification : "",
    setPasswordForVerification : ()=>{},
    // Collection
    collections : [],
    setCollections : ()=>{},
    fetchCollections : ()=>{},
    // Single Collection 
    fetchCollectionTodos : (id)=>{},
    setSingleCollection : ()=>{}
,    singleCollection  : null,
    SingleTodoLoading : false,
    singleTodoError : false,
fetchCollectionTodo :  (collectionId) => {},

// create a collection In Todo Loading
createCollectionTodoLoading : false,
setCreateCollectionTodoLoading  : ()=>{}


    

    // setModeLoading : ()=>{}
    
});

// const [passwordForVerification,setPasswordForVerification] =useState("");



export const AppContextProvider = AppContext.Provider;

export const useAppContext = ()=>{
    return useContext(AppContext)
}








