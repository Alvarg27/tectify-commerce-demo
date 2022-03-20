import styles from "../styles/PaymentForm.module.css";
import swell from "swell-js";
import { FaCreditCard, FaGift, FaLock, FaPaypal } from "react-icons/fa";
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
  isBreakpoint,
}) {
  const router = useRouter();
  const stepNumber = 4;
  const [stepStatus, setStepStatus] = useState();
  const [paymentMethod, setPaymentMethod] = useState("card");

  const paypalElement = async () => {
    const response = await swell.payment.createElements({
      paypal: {
        elementId: "#paypal-button", // default: #paypal-button
        style: {
          layout: "horizontal", // optional
          color: "gold",
          shape: "rect",
          label: "paypal",
          tagline: false,
        },
        onSuccess: (data, actions) => {
          submitOrder();
          setProcessingOrder(true);
        },
        onCancel: () => {
          setProcessingOrder(false);
          // optional, called on payment cancel
        },
        onError: (error) => {
          console.error(error.message);
          setPaypalError(error.message);
          setProcessingOrder(false);
        },
      },
    });
  };

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
                  borderColor:
                    paymentMethod === "card"
                      ? template.primaryColor
                      : template.borderColor,
                }}
                className={styles.cardContainer}
                onClick={() => setPaymentMethod("card")}
              >
                <div className={styles.subContainer}>
                  <FaCreditCard
                    className={styles.paymentIcon}
                    style={{
                      color:
                        paymentMethod === "card"
                          ? template.primaryColor
                          : template.secondaryTextColor,
                    }}
                  />
                  <p
                    style={{
                      color:
                        paymentMethod === "card"
                          ? template.textColor
                          : template.secondaryTextColor,
                    }}
                  >
                    Tarjeta de crédito ó debito
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.paymentMethod}>
              <div
                style={{
                  borderColor:
                    paymentMethod === "paypal"
                      ? template.primaryColor
                      : template.borderColor,
                }}
                className={styles.cardContainer}
                onClick={() => setPaymentMethod("paypal")}
              >
                <div className={styles.subContainer}>
                  <FaPaypal
                    className={styles.paymentIcon}
                    style={{
                      color:
                        paymentMethod === "paypal"
                          ? template.primaryColor
                          : template.secondaryTextColor,
                    }}
                  />
                  <p
                    style={{
                      color:
                        paymentMethod === "paypal"
                          ? template.textColor
                          : template.secondaryTextColor,
                    }}
                  >
                    Paypal
                  </p>
                </div>
              </div>
            </div>
            <div className={styles.paymentMethod}>
              <div
                style={{
                  borderColor:
                    paymentMethod === "gift_card"
                      ? template.primaryColor
                      : template.borderColor,
                }}
                className={styles.cardContainer}
                onClick={() => setPaymentMethod("gift_card")}
              >
                <div className={styles.subContainer}>
                  <FaGift
                    className={styles.paymentIcon}
                    style={{
                      color:
                        paymentMethod === "gift_card"
                          ? template.primaryColor
                          : template.secondaryTextColor,
                    }}
                  />
                  <p
                    style={{
                      color:
                        paymentMethod === "gift_card"
                          ? template.textColor
                          : template.secondaryTextColor,
                    }}
                  >
                    Tarjeta de regalo
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="line" style={{ margin: "30px 0" }} />
          {paymentMethod === "card" ? (
            <PaymentCreditCard
              step={step}
              fetchCart={fetchCart}
              mobileOrderSummary={mobileOrderSummary}
              template={template}
              order={order}
              setOrder={setOrder}
              paymentMethod={paymentMethod}
            />
          ) : (
            ""
          )}
          {paymentMethod === "paypal" ? (
            <PaymentPaypal
              template={template}
              fetchCart={fetchCart}
              step={step}
              paymentMethod={paymentMethod}
              isBreakpoint={isBreakpoint}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
