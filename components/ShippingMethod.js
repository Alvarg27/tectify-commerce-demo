import React from "react";
import styles from "../styles/ShippingMethod.module.css";
import ShippingMethodCard from "./ShippingMethodCard";

export default function ShippingMethod() {
  return (
    <div className={styles.shippingMethod}>
      <div className="stepTitle">
        <div className="stepNumber">
          <p>3</p>
        </div>
        <h3>Método de envío</h3>
      </div>
      <div className={styles.cardContainer}>
        <ShippingMethodCard />
      </div>
    </div>
  );
}
