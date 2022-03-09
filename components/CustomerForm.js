import styles from "../styles/CustomerForm.module.css";

import React from "react";
import CheckoutInput from "./CheckoutInput";

export default function CustomerForm() {
  return (
    <div className={styles.CustomerForm}>
      <div className="stepTitle">
        <div className="stepNumber">
          <p>1</p>
        </div>
        <h3>Información del cliente</h3>
      </div>
      <div className="formContainer">
        <CheckoutInput label="Correo electónico" type="email" width={100} />
      </div>
    </div>
  );
}
