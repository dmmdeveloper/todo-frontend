import { Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"
import SelectMode from "./pages/SelectMode"
import {Toaster} from "react-hot-toast"
function App() {

return (<>
<Routes>

<Route path="/" element= {<Home/>} /> 
<Route path="/login" element ={<Login/>} /> 
<Route path="/register" element = {<Register/>} />
<Route path="/select-mode" element = {<SelectMode/>} /> 
<Route path="*" element={<NotFound/>} />

</Routes>
<Toaster/>


</>)
}
export default App
