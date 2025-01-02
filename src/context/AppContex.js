import { createContext, useContext } from "react";



const AppContext = createContext(
{
    hello : ()=>{}
});


const AppContextProvider = AppContext.Provider;

const useAppContext = ()=>{
    return useContext(AppContext)
}








