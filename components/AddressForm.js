import React from "react";
import CheckoutInput from "./CheckoutInput";
import styles from "../styles/AddressForm.module.css";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";

export default function AddressForm({ cart, fetchCart, step, setStep }) {
  const stepNumber = 2;
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
    <div className={styles.addressForm}>
      <div className="stepTitle">
        <div
          className="stepNumber"
          style={{
            background: stepStatus === "pending" ? "lightgray" : "#0077ff",
          }}
        >
          {stepStatus === "completed" ? (
            <FaCheck style={{ color: "white", margin: "auto" }} />
          ) : (
            <p>2</p>
          )}
        </div>
        <h3>Información del envío</h3>
      </div>
      {stepStatus === "current" ? (
        <div>
          <div className="formContainer"></div>
          <button onClick={() => handleSubmit()} className="primaryButton">
            Continuar
          </button>
        </div>
      ) : (
        ""
      )}
      {stepStatus === "completed" ? (
        <div className="dataReviewCard">
          <div className="row">
            <div style={{ display: "flex", margin: "0 30px 0 0" }}>
              <p style={{ color: "grey", margin: "auto 10px auto auto" }}>
                Envío
              </p>
              <p>
                {cart
                  ? `${cart.shipping.name}, ${cart.shipping.address1} ${cart.shipping.address2}, ${cart.shipping.city},  ${cart.shipping.zip},  ${cart.shipping.phone}`
                  : ""}
              </p>
            </div>
            <button onClick={() => setStep(2)} className="linkButton">
              Editar
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
