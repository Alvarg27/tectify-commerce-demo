import styles from "../styles/PaymentForm.module.css";
import swell from "swell-js";

import React from "react";
import { useEffect } from "react";

export default function PaymentForm() {
  const paypalElement = async () => {
    await swell.payment.createElements({
      paypal: {
        elementId: "#paypal-button", // default: #paypal-button
        style: {
          layout: "horizontal", // optional
          color: "blue",
          shape: "rect",
          label: "buynow",
          tagline: false,
        },
        onSuccess: (data, actions) => {
          // optional, called on payment success
        },
        onCancel: () => {
          // optional, called on payment cancel
        },
        onError: (error) => {
          // optional, called on payment error
        },
      },
    });
  };

  useEffect(() => {
    paypalElement();
  }, []);

  return (
    <div className={styles.paymentForm}>
      <div className={styles.addressForm}>
        <div className="stepTitle">
          <div className="stepNumber">
            <p>4</p>
          </div>
          <h3>Información de pago</h3>
        </div>
        <div id="paypal-button"></div>
        <div className={styles.stripeContainer}>
          <div style={{ margin: "auto 0" }} id=""></div>
        </div>
      </div>
    </div>
  );
}
