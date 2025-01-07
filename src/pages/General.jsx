import React from 'react'
import { useAppContext } from '../context/AppContex'

export default function General() {

 const { profile }  =  useAppContext()
  return (<>

<div className="h-screen w-full bg-myBlue">
 Name :  {profile.name}
 General Mode

</div>




</>  )
}
