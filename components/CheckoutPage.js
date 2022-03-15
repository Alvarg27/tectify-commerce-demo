import styles from "../styles/CheckoutPage.module.css";

import React from "react";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutForm from "./CheckoutForm";
import MobileOrderTotal from "./MobileOrderTotal";

export default function CheckoutPage({
  cart,
  fetchCart,
  setMobileOrderSummary,
  setOrder,
  order,
}) {
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <CheckoutSummary cart={cart} fetchCart={fetchCart} />
        <CheckoutForm
          cart={cart}
          fetchCart={fetchCart}
          order={order}
          setOrder={setOrder}
        />
      </div>
      <MobileOrderTotal
        cart={cart}
        setMobileOrderSummary={setMobileOrderSummary}
      />
    </div>
  );
}
