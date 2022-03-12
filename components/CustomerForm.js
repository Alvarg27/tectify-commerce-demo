import styles from "../styles/CustomerForm.module.css";
import swell from "swell-js";
import React, { useState, useEffect } from "react";
import CheckoutInput from "./CheckoutInput";
import { FaCheck } from "react-icons/fa";

export default function CustomerForm({ cart, fetchCart, step, setStep }) {
  const [error, setError] = useState();
  const [orderData, setOrderData] = useState({
    email: undefined,
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

  console.log(orderData);

  const handleSubmit = async () => {
    try {
      const response = await swell.cart.update({
        account: {
          email: orderData.email,
        },
      });
      setError(null);
      fetchCart();
      setStep(2);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    }
  };
  useEffect(() => {
    setOrderData({
      email: cart ? cart.account.email : "",
    });
  }, []);

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
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Correo electónico"
              category="account"
              type="email"
              width={100}
              errorMessage={error}
            />
          </div>
          <button
            style={{ margin: "15px 0 0 0" }}
            onClick={() => handleSubmit()}
            className="primaryButton"
          >
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
