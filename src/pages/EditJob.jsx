import React, { useEffect, useState } from 'react'
import FormWrap from '../components/FormWrap'
import JobForm from '../components/JobForm'
import { getJobPost } from '../apis/job'
import {useParams} from 'react-router-dom'

function EditJob() {
  const [error, setError] = useState("");
  const [job, setJob] = useState(null);
  const {jobId} = useParams();

  useEffect(()=> {
    if(!jobId) setError("No Job Post Found");

    ;(async ()=> {
      const {data: job, error} = await getJobPost(jobId);
      if(error) setError("No Job Post Found")
      else setJob(job);
    })();

  }, [])

  if(error) {
    return <h1 className='center'>{error}</h1>
  }

  return (
    job ? 
    <div>
        <FormWrap posterHeading='Recruiter add job details here' poster={"jobformposter.png"}>
            <JobForm job={job} />
        </FormWrap>
    </div> : <></>
  )
}

export default EditJob