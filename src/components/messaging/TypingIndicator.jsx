import React from "react";
import styles from "./TypingIndicator.module.css";

const TypingIndicator = ({ typingUsers = [] }) => {
  if (typingUsers.length === 0) return null;

  const getTypingText = () => {
    if (typingUsers.length === 1) {
      return `${typingUsers[0].user_name} tape...`;
    } else if (typingUsers.length === 2) {
      return `${typingUsers[0].user_name} et ${typingUsers[1].user_name} tapent...`;
    } else {
      return `${typingUsers.length} personnes tapent...`;
    }
  };

  return (
    <div className={styles.typingIndicator}>
      <div className={styles.typingContent}>
        <div className={styles.typingDots}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        <span className={styles.typingText}>{getTypingText()}</span>
      </div>
    </div>
  );
};

export default TypingIndicator;