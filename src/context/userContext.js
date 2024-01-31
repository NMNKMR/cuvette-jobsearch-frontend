import { createContext, useContext } from "react";

const userContext = createContext({
    user: {
        id: "",
        name: "",
        isAuth: false,
    }, 
    login: ()=> {},
    logout: ()=> {},
});

export default userContext.Provider;

export const useAuth = ()=> {
    return useContext(userContext);
}