import { createContext, useContext } from "react";



const AppContext = createContext(
{
    profile : [], 
    setProfile :()=>{},
    fetchProfile : ()=>{},
    changeMode : (mode)=>{},
    modeLoading :false,
    // setModeLoading : ()=>{}
    
});


export const AppContextProvider = AppContext.Provider;

export const useAppContext = ()=>{
    return useContext(AppContext)
}








