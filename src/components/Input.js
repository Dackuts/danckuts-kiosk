import styles from "./Input.module.css";

export default function Input({ placeholder, value, onChange, icon, style }) {
  return (
    <div className={styles["input-container"]} style={style}>
      <div className={styles["icon-container"]}>{icon}</div>
      <input
        className={styles["input"]}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        type="text"
      />
    </div>
  );
}
