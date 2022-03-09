import styles from "../styles/CheckoutInput.module.css";
import React from "react";

export default function CheckoutInput({ label, width }) {
  return (
    <div className={styles.checkoutInput} style={{ width: `${width}%` }}>
      <div className={styles.container}>
        <label>{label}</label>
        <input />
      </div>
    </div>
  );
}
