import styles from "./separator.module.scss";
import React from "react";

export default function Separator(props) {
  return <div style={props.styles && props.styles} className={styles.separator}></div>;
}
