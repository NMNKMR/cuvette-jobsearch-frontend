import styles from "./Button.module.scss";

export default function Button({children, customStyle={}, onClick=()=> {}, type="button"}) {
  return (
    <button className={`${styles.pink_button}`} style={customStyle} onClick={onClick} type={type}>
        {children}
    </button>
  )
}