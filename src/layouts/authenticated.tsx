import { useSession } from "@/providers/SessionProvider";
import { Navigate, Outlet, useLocation } from "react-router";
import { Spinner } from "@/components/ui/spinner";

export default function AuthenticatedLayout(){

  const { userId, isLoading } = useSession();
  console.log(userId)
  const location = useLocation();
  
  if(isLoading){
    return <Spinner size="sm" className="bg-black dark:bg-white" />
  }

  if(!userId) {
    return <Navigate to={'/login'} replace state={{ from: location }} />
  }

  return(
    <>
      <Outlet/>
    </>
  )
}