import styles from "./Button.module.css";

export default function Button({ children, className, textButton, onClick, ...props }) {
  
  let cssStyles = textButton ? styles["text-button"] : styles["button"];
  cssStyles += " " + className;
  
  return (
    <button className={cssStyles} onClick={onClick} {...props}>
      {children}
    </button>
  );
}
