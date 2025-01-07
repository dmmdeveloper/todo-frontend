import React from 'react'
import { useAppContext } from '../context/AppContex'
import Nav from '../components/Nav'

export default function General() {

 const { profile }  =  useAppContext()
  return (<>

<div className="h-screen w-full bg-myBlue">
  <Nav/>
 Name :  {profile.name}
 General Mode

</div>




</>  )
}
