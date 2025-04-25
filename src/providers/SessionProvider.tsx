import { API } from "@/api";
import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type ISessionContext = {
  email: string
  sessionId: string
}

const defaultValues: ISessionContext = {
  email: "",
  sessionId: "",
}

const SessionContext = createContext<ISessionContext>(defaultValues);

function SessionProvider({children}: PropsWithChildren){

  const [email, setEmail] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("")

  useEffect(() => {
    API.METHODS.GET(`API.ENDPOINTS.session.userSessionInfo/`, {
      onSuccess: (data: ISessionContext ) => 
        { 
          setEmail(data.email); 
          setSessionId(data.sessionId) 
        },
      onError: () => {  }
    })
  },[])

  return (
    <>
      <SessionContext.Provider value={{email, sessionId}} >
        {children}
      </SessionContext.Provider>
    </>
  )

}

function useSession(): ISessionContext {
  return useContext(SessionContext);
}

export { SessionProvider, useSession };
