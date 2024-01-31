import React from 'react'
import FormWrap from '../components/FormWrap'
import JobForm from '../components/JobForm'

function AddJob() {
  return (
    <div>
        <FormWrap posterHeading='Recruiter add job details here' poster={"jobformposter.png"}>
            <JobForm />
        </FormWrap>
    </div>
  )
}

export default AddJob