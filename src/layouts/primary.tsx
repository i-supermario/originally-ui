import Footer from "@/components/footer";
import Header from "@/components/header";
import { Outlet } from "react-router";

export default function PrimaryLayout(){
  return(
    <>
      <div
        className="flex flex-col h-full"
      >
        <Header/>
        <main className="overflow-y-auto">
          <div className="py-36 px-44">
            <Outlet/>
          </div>
        </main>
        <Footer/>
      </div>
    </>
  )
}