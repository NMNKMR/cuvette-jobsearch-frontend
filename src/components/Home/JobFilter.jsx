import Button from '../Form-Components/Button'
import styles from '../../styles/JobFilter.module.scss'
import Input from '../Form-Components/Input'
import {FaAngleDown, FaPlus, FaX} from 'react-icons/fa6'
import {FiSearch} from 'react-icons/fi'
import { JOB_SKILLS } from '../../data/jobSkills'
import { useNavigate } from 'react-router-dom'

export default function JobFilter({
    title,
    skills=[],
    removeSkill,
    addSkill,
    clearSkills,
    user,
    applyRef,
    updateTitle,
    fetchJobs
}) {

  const navigate = useNavigate();

  const handleKeyFown = (e)=> {
      if(e.key === "Enter") {
        e.target.blur();
      }
  }

  const handleApply = ()=> {
      applyRef.current.disabled = true;
      fetchJobs();
  }

  return (
    <div className={`${styles.filter}`}>
      <div className={`${styles.title_search}`} onKeyDown={handleKeyFown} onBlur={fetchJobs}>
        <FiSearch />
        <Input
          type="search"
          name="titleSearch"
          placeholder="Type any job title"
          value={title}
          handleInputChange={(e) => updateTitle(e.target.value)}
        />
        <span>Enter</span>
      </div>
      <div>
        <div className={`${styles.skills_filter}`}>
          <div className={`${styles.skills_select}`}>
            <select
              name="skills"
              onChange={(e) => addSkill(e.target.value)}
              value={"Skills"}
            >
              <option value="Skills" hidden>
                Skills
              </option>
              {JOB_SKILLS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <FaAngleDown />
          </div>
          <div>
            <div className={`${styles.selected_skills}`}>
              {skills.map((skill) => (
                <div key={skill} className={`${styles.skill}`}>
                  <span>{skill}</span>
                  <span onClick={() => removeSkill(skill)}><FaX/></span>
                </div>
              ))}
            </div>
            {skills.length ? (
              <div>
                <span onClick={clearSkills}>Clear</span>
                <span>
                  <button ref={applyRef} onClick={handleApply}>
                    Apply
                  </button>
                </span>
              </div>
            ) : null}
          </div>
        </div>
        {user.isAuth && (
          <div className={`${styles.addjob_button}`}>
            <Button onClick={()=> navigate("/job/add")}><FaPlus/> Add Job</Button>
          </div>
        )}
      </div>
    </div>
  );
}
