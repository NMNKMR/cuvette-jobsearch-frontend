import React, {useState, useEffect} from 'react'
import {useAuth} from '../context/userContext'
import { useNavigate } from 'react-router-dom';

function AuthCheck({children, authentication=true}) {
    const [loader, setLoader] = useState(true)
    const navigate = useNavigate();
    const {user: {isAuth: userStatus}} = useAuth();

    useEffect(()=> {
        if(authentication && !userStatus) navigate('/signin')
        else if(!authentication && userStatus) navigate('/')
        setLoader(false);
    }, [])

  return (
    loader ? <h1>Loading...</h1> : <>{children}</>
  )
}

export default AuthCheck