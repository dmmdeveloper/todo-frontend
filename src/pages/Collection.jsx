import React from 'react'
import Nav from '../components/Nav'
import { useAppContext } from '../context/AppContex'

export default function Collection() {
const { profile } = useAppContext()

  return (
<>
<div className="h-screen w-full bg-myBlue">

<Nav/>

<h1>Collection</h1>
name : 
{
profile.name
}
</div>


</>  )
}
