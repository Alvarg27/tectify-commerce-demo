import React, { useState, useEffect } from "react";
import styles from "../styles/ShippingMethod.module.css";
import ShippingMethodCard from "./ShippingMethodCard";

export default function ShippingMethod({ step }) {
  const stepNumber = 3;
  const [stepStatus, setStepStatus] = useState();
  useEffect(() => {
    if (step === stepNumber) {
      setStepStatus("current");
    } else if (step < stepNumber) {
      setStepStatus("pending");
    } else if (step > stepNumber) {
      setStepStatus("completed");
    }
  }, [step]);
  return (
    <div className={styles.shippingMethod}>
      <div className="stepTitle">
        <div
          className="stepNumber"
          style={{
            background: stepStatus === "pending" ? "lightgray" : "#0077ff",
          }}
        >
          <p>3</p>
        </div>

        <h3>Método de envío</h3>
      </div>
      {step === 3 ? (
        <div>
          <div className={styles.cardContainer}>
            <ShippingMethodCard />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
