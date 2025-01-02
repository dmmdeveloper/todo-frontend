import { Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"

function App() {

return (<>
<Routes>

<Route path="/" element= {<Home/>} /> 
<Route path="/login" element ={<Login/>} /> 
<Route path="/register" element = {<Register/>} />

<Route path="*" element={<NotFound/>} />

</Routes>



</>)
}
export default App
