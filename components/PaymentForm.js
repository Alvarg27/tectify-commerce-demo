import styles from "../styles/PaymentForm.module.css";
import swell from "swell-js";
import { FaCreditCard, FaLock, FaPaypal } from "react-icons/fa";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import LoadingButton from "./LoadingButton";
import PaymentCreditCard from "./PaymentCreditCard";
import PaymentPaypal from "./PaymentPaypal";

export default function PaymentForm({
  fetchCart,
  step,
  order,
  setOrder,
  template,
  mobileOrderSummary,
}) {
  const router = useRouter();
  const stepNumber = 4;
  const [stepStatus, setStepStatus] = useState();
  const [paypal, setPaypal] = useState(false);

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
    <div className={styles.paymentForm}>
      <div className="stepTitle">
        <div
          className="stepNumber"
          style={{
            background:
              stepStatus === "pending"
                ? template.borderColor
                : template.primaryColor,
          }}
        >
          <p>4</p>
        </div>
        <h3 style={{ color: template.textColor }}>Información de pago</h3>
      </div>
      {step === 4 ? (
        <div style={{ margin: "30px 0 0 0", width: "100%" }}>
          <div className={styles.paymentMethodContainer}>
            <div className={styles.paymentMethod}>
              <div
                style={{
                  borderColor: !paypal
                    ? template.primaryColor
                    : template.borderColor,
                }}
                className={styles.cardContainer}
                onClick={() => setPaypal(false)}
              >
                <div className={styles.subContainer}>
                  <FaCreditCard
                    className={styles.paymentIcon}
                    style={{
                      color: !paypal
                        ? template.primaryColor
                        : template.secondaryTextColor,
                    }}
                  />
                  <p style={{ color: template.secondaryTextColor }}>
                    Tarjeta de crédito ó debito
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.paymentMethod}>
              <div
                style={{
                  borderColor: paypal
                    ? template.primaryColor
                    : template.borderColor,
                }}
                className={styles.cardContainer}
                onClick={() => setPaypal(true)}
              >
                <div className={styles.subContainer}>
                  <FaPaypal
                    className={styles.paymentIcon}
                    style={{
                      color: paypal
                        ? template.primaryColor
                        : template.secondaryTextColor,
                    }}
                  />
                  <p style={{ color: template.secondaryTextColor }}>Paypal</p>
                </div>
              </div>
            </div>
          </div>
          <div className="line" style={{ margin: "30px 0" }} />
          {!paypal ? (
            <PaymentCreditCard
              step={step}
              fetchCart={fetchCart}
              mobileOrderSummary={mobileOrderSummary}
              template={template}
              order={order}
              setOrder={setOrder}
            />
          ) : (
            <PaymentPaypal template={template} fetchCart={fetchCart} />
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
