import { API } from "@/api";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type ISessionContext = {
  email: string
  sessionId: string
  isLoading: boolean
  clearSession: () => void
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setSession: (params: { email: string, sessionId: string }) => void
}

const defaultValues: ISessionContext = {
  email: "",
  sessionId: "",
  isLoading: true,
  clearSession: () => {},
  setEmail: () => {},
  setSession: (params: { email: string, sessionId: string }) => {}
}

const SessionContext = createContext<ISessionContext>(defaultValues);

function SessionProvider({children}: PropsWithChildren){

  const [email, setEmail] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  console.log(email)
  console.log(sessionId)
  const clearSession = () => { 
    setSessionId("");
    setEmail("");
  }

  const setSession = (params: { email: string, sessionId: string }) => {
    setEmail(email);
    setSessionId(sessionId);
  }

  useEffect(() => {
    async function loadSessionInfo(){
      await API.METHODS.GET(`${API.ENDPOINTS.session.userSessionInfo}`, { withCredentials: true } ,{
        onSuccess: (data: ISessionContext ) => 
          { 
            // console.log(data);
            setEmail(data.email); 
            setSessionId(data.sessionId) 
            setIsLoading(false);
          },
        onError: () => {  }
      })
    }

    loadSessionInfo();

  },[email])

  return (
    <>
      <SessionContext.Provider value={{email, sessionId, isLoading, clearSession, setEmail, setSession}} >
        {children}
      </SessionContext.Provider>
    </>
  )

}

function useSession(): ISessionContext {
  return useContext(SessionContext);
}

export { SessionProvider, useSession };
