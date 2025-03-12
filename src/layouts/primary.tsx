import Footer from "@/components/footer";
import Header from "@/components/header";
import { Outlet } from "react-router";

export default function PrimaryLayout(){
  return(
    <>
      <div
        className="flex flex-col grow"
      >
        <Header/>
        <Outlet/>
        <Footer/>
      </div>
    </>
  )
}