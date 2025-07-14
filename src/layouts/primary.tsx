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
        <div className="py-72 px-44">
          <Outlet/>
        </div>
        <Footer/>
      </div>
    </>
  )
}