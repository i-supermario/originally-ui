import Footer from "@/components/footer";
import Header from "@/components/header";
import { Outlet } from "react-router";

export default function PrimaryLayout(){
  return(
    <>
      <div
        className="bg-gradient-to-b from-white via-rose-200 to-orange-200 flex flex-col h-full"
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