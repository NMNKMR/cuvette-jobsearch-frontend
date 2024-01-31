import React, { useState, useEffect } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Input from './Form-Components/Input'
import Button from './Form-Components/Button'
import styles from '../styles/AuthForm.module.scss'
import { registerUser } from '../apis/auth'
import { notifyError } from './FormWrap'
import toast from 'react-hot-toast'
import { useAuth } from '../context/userContext'

function Regsiter() {

    const [input, setInput] = useState({
        name: "",
        email: "",
        mobile: "",
        password: "",
        isChecked: false,
    })
    const {login} = useAuth()
    
    const [inputError, setInputError] = useState("");
    const navigate = useNavigate();

    useEffect(()=> {
        if(inputError) {
            notifyError(inputError)
        }
    }, [inputError])

    const handleInputChange = (e)=> {
        const {name, value} = e.target;
        setInput((prev)=> ({...prev, [name]: value}))
    }

    const handleRegister = async(e)=> {
        if(inputError) toast.remove();
        setInputError("")
        e.preventDefault();

        for (let key in input) {
            if(!input[key]) {
                setInputError("All fields are required!");
                return;
            }
        }

        const {data: user, error} = await registerUser({...input});
        if(error) {
            setInputError(error);
            return;
        }
        
        login({...user});
        localStorage.setItem("accessToken", user.accessToken);
        navigate('/');
    }

  return (
    <div className={`${styles.auth_form}`} style={{paddingTop: "10%"}}>
        <h1>Create an account</h1>
        <p>Your personal job finder is here</p>
        <form onSubmit={handleRegister}>
            <Input placeholder="Name" name="name" type="text" value={input.name} handleInputChange={handleInputChange} />
            <Input placeholder="Email" name="email" type="email" value={input.email} handleInputChange={handleInputChange} />
            <Input placeholder="Mobile" name="mobile" type="number" value={input.mobile} handleInputChange={handleInputChange} />
            <Input placeholder="Password" name="password" type="password" value={input.password} handleInputChange={handleInputChange} />
            <span>
                <input type="checkbox" value={input.isChecked} id='tnc-check'
                    onChange={()=> setInput((prev)=> ({...prev, isChecked: !prev.isChecked}))} />
                <label htmlFor="tnc-check">By creating an account, I agree to our terms of use and privacy policy</label>
            </span>
            <Button type="submit">Create Account</Button>
        </form>
        <span>
            Already have an account?
            <Link to={'/signin'}>Sign In</Link>
        </span>
    </div>
  )
}

export default Regsiter