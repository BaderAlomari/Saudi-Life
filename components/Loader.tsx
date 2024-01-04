"use client"
import {RotateLoader} from "react-spinners"



const Loader = () => {
  return (
    <div className="h-[70vh]
    flex
    flex-col
    justify-center
    items-center
    ">
        <RotateLoader
        
        color="red"
        />

    </div>
  )
}

export default Loader