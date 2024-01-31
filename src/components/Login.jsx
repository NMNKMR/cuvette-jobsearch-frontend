import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Input from './Form-Components/Input'
import Button from './Form-Components/Button'
import styles from '../styles/AuthForm.module.scss'
import { loginUser } from '../apis/auth'
import { notifyError } from './FormWrap'
import toast from 'react-hot-toast'
import { useAuth } from '../context/userContext'

function Login() {
    
    const [input, setInput] = useState({
        email: "",
        password: "",
    })
    const {login} = useAuth();
    
    const navigate = useNavigate();

    const handleInputChange = (e)=> {
        const {name, value} = e.target;
        setInput((prev)=> ({...prev, [name]: value}))
    }

    const handleLogin = async(e)=> {
        toast.remove();
        e.preventDefault();

        for (let key in input) {
            if(!input[key]) {
                notifyError("All fields are required!");
                return;
            }
        }

        const {data: user, error} = await loginUser({...input});
        if(error) {
            notifyError(error);
            return;
        }
        
        login({...user})
        localStorage.setItem("accessToken", user.accessToken);
        navigate('/');
    }

  return (
    <div className={`${styles.auth_form}`}>
        <h1>Already have an account?</h1>
        <p>Your personal job finder is here</p>
        <form onSubmit={handleLogin}>
            <Input placeholder="Email" name="email" type="email" value={input.email} handleInputChange={handleInputChange} />
            <Input placeholder="Password" name="password" type="password" value={input.password} handleInputChange={handleInputChange} />
            <Button type="submit">Sign In</Button>
        </form>
        <span>
            Don't have an account?
            <Link to={'/signup'}>Sign Up</Link>
        </span>
    </div>
  )
}

export default Login