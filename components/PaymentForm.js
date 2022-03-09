import styles from "../styles/PaymentForm.module.css";
import swell from "swell-js";

import React from "react";
import { useEffect } from "react";

export default function PaymentForm() {
  const payPalElement = swell.payment.createElements({
    paypal: {
      elementId: "#paypal", // default: #paypal-button
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

  const stripeElement = swell.payment.createElements({
    card: {
      elementId: "#card-element-id", // default: #card-element
      options: {
        // options are passed as a direct argument to stripe.js
        style: {
          base: {
            fontWeight: 500,
            fontSize: "16px",
          },
        },
      },
      onChange: (event) => {
        // optional, called when the Element value changes
      },
      onReady: (event) => {
        // optional, called when the Element is fully rendered
      },
      onFocus: (event) => {
        // optional, called when the Element gains focus
      },
      onBlur: (event) => {
        // optional, called when the Element loses focus
      },
      onEscape: (event) => {
        // optional, called when the escape key is pressed within an Element
      },
      onClick: (event) => {
        // optional, called when the Element is clicked
      },
      onSuccess: (result) => {
        // optional, called on card payment success
      },
      onError: (error) => {
        // optional, called on card payment error
      },
    },
  });

  return (
    <div className={styles.paymentForm}>
      <div className={styles.addressForm}>
        <div className="stepTitle">
          <div className="stepNumber">
            <p>4</p>
          </div>
          <h3>Información de pago</h3>
        </div>
        <div className={styles.stripeContainer}>
          <div style={{ margin: "auto 0" }} id="card-element-id"></div>
        </div>
      </div>
    </div>
  );
}
