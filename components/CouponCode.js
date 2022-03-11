import styles from "../styles/CouponCode.module.css";

import React from "react";
import CheckoutInput from "./CheckoutInput";

export default function CouponCode() {
  return (
    <div className={styles.couponCode}>
      <div className={styles.container}>
        <label>Código de descuento</label>
        <div className={styles.row}>
          <input />
          <button style={{ margin: "auto" }} className="primaryButton">
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}
