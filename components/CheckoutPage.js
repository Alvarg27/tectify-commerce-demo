import styles from "../styles/CheckoutPage.module.css";

import React from "react";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage({ cart, fetchCart }) {
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <CheckoutSummary cart={cart} fetchCart={fetchCart} />
        <CheckoutForm cart={cart} />
      </div>
    </div>
  );
}
