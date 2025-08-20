import { Outlet } from "react-router";

export function CenteredLayout(){

  return(
    <>
      
      <div className="bg-gradient-to-b from-white via-rose-200 to-orange-200 w-screen h-screen flex items-center justify-center">
        <Outlet/>
      </div>
    </>
  )

}