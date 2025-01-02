import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {

  return (<>

<div className="h-screen w-full bg-myBlue">
<h1>Home PAge</h1>
<Link to={"/login"} >Go to login </Link>

</div>

</>  )
}
