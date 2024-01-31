import styles from "./Input.module.scss";

export default function Input({
    placeholder="",
    type,
    value,
    name,
    handleInputChange=()=> {},
    ...addProps
}) {
  return (
    <input
      className={`${styles.custom_input}`}
      placeholder={placeholder}
      name={name}
      type={type}
      value={value}
      onChange={handleInputChange}
      {...addProps}
    />
  );
}
