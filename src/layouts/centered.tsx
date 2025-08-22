import { Outlet } from "react-router";

export function CenteredLayout(){

  return(
    <>
      
      <div className="bg-gradient-to-b from-orange-200 from-10% via-rose-200 via-70% to-white to-100% w-screen h-screen flex items-center justify-center">
        <Outlet/>
      </div>
    </>
  )

}