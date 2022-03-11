import styles from "../styles/CustomerForm.module.css";

import React from "react";
import CheckoutInput from "./CheckoutInput";

export default function CustomerForm({ cart, fetchCart }) {
  return (
    <div className={styles.CustomerForm}>
      <div className="stepTitle">
        <div className="stepNumber">
          <p>1</p>
        </div>
        <h3>Información del cliente</h3>
      </div>
      <div className="formContainer">
        <CheckoutInput
          fetchCart={fetchCart}
          cart={cart}
          label="Correo electónico"
          category="account"
          type="email"
          width={100}
        />
      </div>
    </div>
  );
}
