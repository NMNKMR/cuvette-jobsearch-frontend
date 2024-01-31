import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import { validateUserFromToken } from "./apis/auth"
import UserProvider from "./context/userContext"

function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    id: "",
    name: "",
    isAuth: false,
  })

  useEffect(()=> {
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
      (async()=> {
        const {data: userData, error} = await validateUserFromToken(accessToken);
        if(error) {
          localStorage.removeItem("accessToken");
          setLoading(false);
          return;
        }
        login({...userData})
        setLoading(false);
      })();
    } 
    else setLoading(false);
  }, [])

  const login = ({id, name})=> {
    setUser({id, name, isAuth: true})
  }

  const logout = ()=> {
    setUser({id: "", name: "", isAuth: false})
  }

  return (
    !loading ? 
    <UserProvider value={{user, login, logout}}>
      <Outlet/>
    </UserProvider> : <h1 className="center">Loading...</h1>
  )
}

export default App