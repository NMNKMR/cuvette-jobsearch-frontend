import React from 'react'
import { useAuth } from '../../context/userContext'
import { Link } from 'react-router-dom';
import styles from '../../styles/Nav.module.scss'
import { MdAccountCircle } from "react-icons/md"

function Nav() {
  const {user: {name, isAuth}, logout} = useAuth();

  const handleLogout = ()=> {
    localStorage.removeItem("accessToken");
    logout();
  }

  return (
    <div className={`${styles.nav_bar}`}>
      <nav>
        <h1>Jobfinder</h1>
        {!isAuth ? (
          <ul className={`${styles.no_auth}`}>
            <li>
              <Link to={"/signin"} style={{color: "#FFF"}}>Login</Link>
            </li>
            <li>
              <Link to={"/signup"} style={{color: "var(--dark-pink)", backgroundColor: "#FFF"}}>Register</Link>
            </li>
          </ul>
        ) : (
          <ul className={`${styles.auth}`}>
            <li onClick={handleLogout}>Logout</li>
            <li>
              Hello! {name}
              <Link to={'/profile'} className={`${styles.profile_img}`}><MdAccountCircle/></Link>
            </li>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Nav