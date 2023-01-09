import PropTypes from "prop-types";
import styles from "./Btn.module.css";

function Button({ text }) {
  return <button className={styles.btn}>{text}</button>;
}

Button.prototype = {
  text: PropTypes.string.isRequired,
};

export default Button;
