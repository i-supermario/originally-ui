import { API } from "@/api";
import React, { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";

type ISessionContext = {
  userId: string
  email: string
  sessionId: string
  isLoading: boolean
  clearSession: () => void
  setEmail: React.Dispatch<React.SetStateAction<string>>
  setUserId: React.Dispatch<React.SetStateAction<string>>
  setSessionId: React.Dispatch<React.SetStateAction<string>>
  
}

const defaultValues: ISessionContext = {
  userId: "",
  email: "",
  sessionId: "",
  isLoading: true,
  clearSession: () => {},
  setEmail: () => {},
  setUserId: () => {},
  setSessionId: () => {},
}

const SessionContext = createContext<ISessionContext>(defaultValues);

function SessionProvider({children}: PropsWithChildren){

  const [userId, setUserId] = useState<string>(""); 
  const [email, setEmail] = useState<string>("");
  const [sessionId, setSessionId] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  console.log(email)
  console.log(userId)
  console.log(sessionId)
  const clearSession = () => { 
    setSessionId("");
    setEmail("");
    setUserId("")
  }

  const setSession = (params: { userId: string, email: string, sessionId: string }) => {
    console.log("setting new session data")
    setUserId(userId)
    setEmail(email);
    setSessionId(sessionId);
  }

  useEffect(() => {
  async function loadSessionInfo() {
    try {
      await API.METHODS.GET(
        `${API.ENDPOINTS.session.userSessionInfo}`,
        { withCredentials: true },
        {
          onSuccess: (data: ISessionContext) => {
            setUserId(data.userId);
            setEmail(data.email);
            setSessionId(data.sessionId);
          },
          onError: () => {
            // clearSession(); // Optional: clear session on error
          }
        }
      );
    } catch (e) {
      console.error("Failed to load session:", e);
    } finally {
      setIsLoading(false); // ✅ Only after session is fetched or failed
    }
  }

  loadSessionInfo();
}, []); 

  return (
    <>
      <SessionContext.Provider value={{userId, email, sessionId, isLoading, clearSession, setEmail, setSessionId, setUserId}} >
        {children}
      </SessionContext.Provider>
    </>
  )

}

function useSession(): ISessionContext {
  return useContext(SessionContext);
}

export { SessionProvider, useSession };
