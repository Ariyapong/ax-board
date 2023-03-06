import styles from "./unread.module.scss";
import React from "react";

export default function Unread(props) {
  return (
    <div className="flex items-center justify-between">
      <div className={`${styles.notiLabel} ${props.disabled && styles.disabled} text-xs text-center text-white`}>
        {props.unreadMsg || 1}
      </div>
    </div>
  );
}
