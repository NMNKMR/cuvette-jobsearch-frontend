import React from 'react'
import FormWrap from '../components/FormWrap'
import Login from '../components/Login'

function SignIn() {
  return (
    <div>
        <FormWrap posterHeading='Your Personal Job Finder' poster={"authformposter.png"}>
            <Login/>
        </FormWrap>
    </div>
  )
}

export default SignIn