import { API } from "@/api";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type ISessionContext = {
  email: string
  sessionId: string
  isLoading: boolean
  clearSession: () => void
}

const defaultValues: ISessionContext = {
  email: "",
  sessionId: "",
  isLoading: true,
  clearSession: () => {}
}

const SessionContext = createContext<ISessionContext>(defaultValues);

function SessionProvider({children}: PropsWithChildren){

  const [email, setEmail] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const clearSession = () => { 
    setSessionId("")
    
  }

  useEffect(() => {
        async function loadSessionInfo(){
          await API.METHODS.GET(`${API.ENDPOINTS.session.userSessionInfo}`, { withCredentials: true } ,{
            onSuccess: (data: ISessionContext ) => 
              { 
                console.log(data);
                setEmail(data.email); 
                setSessionId(data.sessionId) 
                setIsLoading(false);
              },
            onError: () => {  }
          })
        }

        loadSessionInfo();

  },[])

  return (
    <>
      <SessionContext.Provider value={{email, sessionId, isLoading, clearSession}} >
        {children}
      </SessionContext.Provider>
    </>
  )

}

function useSession(): ISessionContext {
  return useContext(SessionContext);
}

export { SessionProvider, useSession };
