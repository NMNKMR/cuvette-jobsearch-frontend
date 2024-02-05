import React, { useState } from "react";
import { jobInputs } from "../data/jobInputs";
import Input from "./Form-Components/Input";
import {useNavigate} from "react-router-dom"
import { FaAngleDown, FaX, FaPencil, FaPlus } from "react-icons/fa6";
import styles from "../styles/JobForm.module.scss";
import { JOB_SKILLS } from "../data/jobSkills";
import {notifyError, notifySuccess} from "../components/FormWrap"
import { createJobPost, updateJobPost } from "../apis/job";
import Button from "./Form-Components/Button";

function JobForm({ job }) {
  const [inputs, setInputs] = useState({
    company: job?.company || "",
    logoUrl: job?.jobUrl || "",
    title: job?.title || "",
    monthlySalary: job?.monthlySalary || "",
    duration: job?.duration || "",
    jobType: job?.jobType || "",
    remoteOffice: job?.remoteOffice || "",
    location: job?.location || "",
    description: job?.description || "",
    aboutCompany: job?.aboutCompany || "",
    skillsRequired: job?.skillsRequired || [],
    information: job?.information || "",
  });

  const [skillRequired, setSkillRequired] = useState("");
  const [jobSubmitted, setJobSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if(e.target.type === "number" && value.trim()!=="") value = Number(value);
    
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const addSkillsRequired = (value) => {
    setInputs((prev) => ({
      ...prev,
      skillsRequired: [...prev.skillsRequired, value],
    }));
  };

  const handleSkillKeyDown = (e)=> {
    if(e.key==="Enter" && skillRequired.trim()!=="") {
        e.preventDefault();
        if(inputs.skillsRequired.map((skill)=> skill.toLowerCase()).includes(skillRequired.toLowerCase())) {
          notifyError("Skill already added!");
          return;
        } 
        const skill = JOB_SKILLS.find((skill)=> skill.toLowerCase() === skillRequired.toLowerCase())
        skill ? addSkillsRequired(skill) : addSkillsRequired(skillRequired);
        setSkillRequired("");
    }
  }

  const handleSkillChange = (e)=> {
    const {value} = e.target;
    if(JOB_SKILLS.includes(value) && !inputs.skillsRequired.includes(value)){
        addSkillsRequired(value);
        setSkillRequired("");
        return;
    }
    
    setSkillRequired(value);
  }

  const removeSkillsRequired = (value) => {
    setInputs((prev) => ({
      ...prev,
      skillsRequired: prev.skillsRequired.filter((skill) => skill !== value),
    }));
  };

  const handleJobSubmit = async(e) => {
    e.preventDefault();
    setJobSubmitted(true);
    
    const missingField = [
      "company",
      "title",
      "jobType",
      "remoteOffice",
      "description",
      "location",
    ].find((input) => !inputs[input] || inputs[input].trim() === "");
    
    if(missingField) {
        notifyError(`${missingField==="title"? "Job Position" : missingField} is required!`);
        setJobSubmitted(false);
        return;
    }
    
    if(!inputs.skillsRequired.length) {
        notifyError(`Skills are required!`);
        setJobSubmitted(false);
        return;
    }

    if(!inputs.monthlySalary) inputs.monthlySalary = 0;
    if(!inputs.duration) inputs.duration = 0;

    const {data: jobData, error} = !job?._id ? await createJobPost(inputs) : await updateJobPost(inputs, job._id);

    if(error) {
        notifyError(error)
        setJobSubmitted(false);
    } else {
        !job?._id ? notifySuccess("New Job Created Successfully!") : notifySuccess("Job Post Updated Successfully!");
        setTimeout(()=> {
            navigate(`/job/view/${jobData._id}`, {
              state: jobData
            })
        }, 3000)
    }
  };
  return (
    <div className={`${styles.job_form}`}>
      <h1>Add job description</h1>
      <div>
        <form onSubmit={handleJobSubmit}>
          {jobInputs.map((input) => (
            <div key={input.id} className={`${styles.job_input}`}>
              <label>{input.label}</label>
              {input.type !== "select" ? (
                <Input
                  name={input.name}
                  value={inputs[input.name]}
                  type={input.type}
                  placeholder={input.placeholder}
                  handleInputChange={handleInputChange}
                />
              ) : (
                <div className={`${styles.job_select}`}>
                  <select
                    name={input.name}
                    value={inputs[input.name]}
                    onChange={handleInputChange}
                  >
                    <option value={"Select"} hidden>
                      Select
                    </option>
                    {input.options?.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <FaAngleDown />
                </div>
              )}
            </div>
          ))}
          <div className={`${styles.job_input}`}>
            <label htmlFor="description">Job Description</label>
            <textarea
              name="description"
              id="description"
              value={inputs.description}
              onChange={handleInputChange}
              placeholder="Type the job description"
            />
          </div>
          <div className={`${styles.job_input}`}>
            <label htmlFor="aboutCompany">About Company</label>
            <textarea
              name="aboutCompany"
              id="aboutCompany"
              value={inputs.aboutCompany}
              onChange={handleInputChange}
              placeholder="Type about your company"
            />
          </div>
          <div className={`${styles.job_input}`}>
            <label htmlFor="skills">Skills Required</label>
            <div className={`${styles.skills_select}`}>
              <Input
                list="datalistOptions"
                handleInputChange={handleSkillChange}
                onKeyDown={handleSkillKeyDown}
                value={skillRequired}
                id="skills"
                name="skillsRequired"
                placeholder="Enter here"
              />
              <datalist id="datalistOptions">
                {JOB_SKILLS.map((listOption) => (
                  <option key={listOption} value={listOption} />
                ))}
              </datalist>
              <div className={`${styles.chips}`}>
                {inputs.skillsRequired?.length
                  ? inputs.skillsRequired.map((skill) => (
                      <span key={skill} className={`${styles.skill_chip}`}>
                        {skill}
                        <span onClick={() => removeSkillsRequired(skill)}>
                          <FaX />
                        </span>
                      </span>
                    ))
                  : "Must Have Skills..."}
              </div>
            </div>
          </div>
          <div className={`${styles.job_input}`}>
            <label htmlFor="information">Information</label>
            <textarea
              name="information"
              id="information"
              value={inputs.information}
              onChange={handleInputChange}
              placeholder="Enter the additional information"
            />
          </div>
          <div className={`${styles.form_buttons}`}>
            <Button onClick={()=> navigate(-1)} disabled={jobSubmitted}>Cancel</Button>
            {!job?._id ? (
              <Button type="submit" disabled={jobSubmitted}>
                <FaPlus /> Add Job
              </Button>
            ) : (
              <Button type="submit" disabled={jobSubmitted}>
                <FaPencil /> Edit Job
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default JobForm;
