import styles from "../styles/CustomerForm.module.css";
import swell from "swell-js";
import React, { useState, useEffect } from "react";
import CheckoutInput from "./CheckoutInput";
import { FaCheck } from "react-icons/fa";
import LoadingButton from "./LoadingButton";
import LinkButton from "./LinkButton";

export default function CustomerForm({
  cart,
  fetchCart,
  step,
  setStep,
  template,
}) {
  const [loading, setLoading] = useState();
  const [submitFail, setSubmitFail] = useState(false);
  const [allFieldsValid, setAllFieldsValid] = useState(false);
  const [error, setError] = useState();
  const [orderData, setOrderData] = useState({
    email: undefined,
  });
  const [valid, setValid] = useState({
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

  const checkValid = (type) => {
    if (orderData[type] === undefined || orderData[type] === "") {
      valid[type] = false;
      setValid({ ...valid });
    } else {
      valid[type] = true;
      setValid({ ...valid });
    }
  };

  const handleSubmit = async () => {
    if (allFieldsValid) {
      setLoading(true);
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
        setError(err.message);
        console.log(err.message);
      }
      setLoading(false);
    } else {
      setSubmitFail(true);
    }
  };
  useEffect(() => {
    if (
      Object.values(valid).indexOf(undefined) > -1 ||
      Object.values(valid).indexOf(false) > -1
    ) {
      setAllFieldsValid(false);
    } else {
      setAllFieldsValid(true);
    }
  }, [valid]);

  return (
    <div className={styles.CustomerForm}>
      <div className="stepTitle">
        <div
          className="stepNumber"
          style={{
            background:
              stepStatus === "pending" ? "lightgray" : template.primaryColor,
          }}
        >
          {stepStatus === "completed" ? (
            <FaCheck style={{ color: "white", margin: "auto" }} />
          ) : (
            <p>1</p>
          )}
        </div>
        <h3 style={{ color: template.textColor }}>Información del cliente</h3>
      </div>
      {step === 1 ? (
        <div>
          <div className="formContainer">
            <CheckoutInput
              valid={valid}
              checkValid={checkValid}
              orderData={orderData}
              setOrderData={setOrderData}
              fetchCart={fetchCart}
              cart={cart}
              label="Correo electónico"
              category="account"
              type="email"
              width={100}
              errorMessage={error}
              setErrorMessage={setError}
              submitFail={submitFail}
              id="email"
              template={template}
            />
          </div>
          <LoadingButton
            loading={loading}
            name="Continuar"
            width="100%"
            action={handleSubmit}
            template={template}
          />
        </div>
      ) : (
        ""
      )}
      {stepStatus === "completed" ? (
        <div
          className="dataReviewCard"
          style={{
            background: template.inputColor,
            borderColor: template.borderColor,
          }}
        >
          <div className="row">
            <div style={{ display: "flex" }}>
              <p style={{ color: "grey", margin: "auto 10px auto auto" }}>
                Contacto
              </p>
              <p style={{ color: template.textColor }}>
                {cart && cart.account && cart.account.email
                  ? cart.account.email
                  : ""}
              </p>
            </div>
            <LinkButton
              action={setStep}
              actionParam={1}
              name="Editar"
              template={template}
            />
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
