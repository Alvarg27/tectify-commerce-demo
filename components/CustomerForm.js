import styles from "../styles/CustomerForm.module.css";

import React, { useState, useEffect } from "react";
import CheckoutInput from "./CheckoutInput";
import { FaCheck } from "react-icons/fa";

export default function CustomerForm({ cart, fetchCart, step, setStep }) {
  const [valid, setValid] = useState({
    account: {
      email: undefined,
    },
  });
  const stepNumber = 1;
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

  console.log(valid);

  return (
    <div className={styles.CustomerForm}>
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
            <p>1</p>
          )}
        </div>
        <h3>Información del cliente</h3>
      </div>
      {step === 1 ? (
        <div>
          <div className="formContainer">
            <CheckoutInput
              valid={valid}
              setValid={setValid}
              fetchCart={fetchCart}
              cart={cart}
              label="Correo electónico"
              category="account"
              type="email"
              width={100}
            />
          </div>
          <button onClick={() => setStep(2)} className="primaryButton">
            Continuar
          </button>
        </div>
      ) : (
        ""
      )}
      {stepStatus === "completed" ? (
        <div className="dataReviewCard">
          <div className="row">
            <div style={{ display: "flex" }}>
              <p style={{ color: "grey", margin: "auto 10px auto auto" }}>
                Contacto
              </p>
              <p>{cart ? cart.account.email : ""}</p>
            </div>
            <button onClick={() => setStep(1)} className="linkButton">
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
