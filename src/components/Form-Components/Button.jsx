import styles from "./Button.module.scss";

export default function Button({children, customStyle={}, onClick=()=> {}, type="button", ...otherProps}) {
  return (
    <button className={`${styles.pink_button}`} style={customStyle} onClick={onClick} type={type} {...otherProps}>
        {children}
    </button>
  )
}