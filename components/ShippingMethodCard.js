import styles from "../styles/ShippingMethodCard.module.css";

import React from "react";
import { FaCheckCircle } from "react-icons/fa";

export default function ShippingMethodCard() {
  return (
    <div className={styles.shippingMethodCard}>
      <div className={styles.container}>
        <div className={styles.row}>
          <p>Envío Estándar</p>
          <FaCheckCircle className={styles.checkIcon} />
        </div>
        <p className={styles.description}>2-5 días hábiles</p>
        <p className={styles.price}>$150</p>
      </div>
    </div>
  );
}
