import styles from "../styles/FormWrap.module.scss"
import {Toaster, toast} from 'react-hot-toast'

function FormWrap({children, posterHeading="", poster, posterCustomStyle={}}) {

  return (
    <div className={`${styles.form_wrap}`}>
      <section className={`${styles.form_container}`}>{children}</section>
      <section
        className={`${styles.form_poster}`}
        style={{
          backgroundImage: `url(/images/${poster})`,
          ...posterCustomStyle,
        }}
      >
        <h3>{posterHeading}</h3>
      </section>
      <Toaster />
    </div>
  );
}

export default FormWrap

export const notifyError = (msg) => {
  toast.error(`${msg}`, {
      position: 'bottom-left',
      style: {
          padding: "16px",
          borderRadius: "0.3125rem",
          backgroundColor: "#192A32",
          color: "#FFF",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "800",
          fontSize: "1.25rem"
      }
  })
};

export const notifySuccess = (msg) => {
  toast.success(`${msg}`, {
      position: 'bottom-left',
      style: {
          padding: "16px",
          borderRadius: "0.3125rem",
          backgroundColor: "#192A32",
          color: "#FFF",
          fontFamily: "DM Sans, sans-serif",
          fontWeight: "800",
          fontSize: "1.25rem"
      }
  })
};