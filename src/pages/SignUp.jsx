import React from 'react'
import FormWrap from '../components/FormWrap'
import Regsiter from '../components/Register'

function SignUp() {
  return (
    <div>
        <FormWrap posterHeading='Your Personal Job Finder' poster={"authformposter.png"}>
            <Regsiter/>
        </FormWrap>
    </div>
  )
}

export default SignUp