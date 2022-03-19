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
  template,
  mobileOrderSummary,
  isBreakpoint,
}) {
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <CheckoutSummary
          template={template}
          cart={cart}
          fetchCart={fetchCart}
          isBreakpoint={isBreakpoint}
        />
        <CheckoutForm
          template={template}
          cart={cart}
          fetchCart={fetchCart}
          order={order}
          setOrder={setOrder}
          mobileOrderSummary={mobileOrderSummary}
          isBreakpoint={isBreakpoint}
        />
      </div>
      <MobileOrderTotal
        template={template}
        cart={cart}
        setMobileOrderSummary={setMobileOrderSummary}
        isBreakpoint={isBreakpoint}
      />
    </div>
  );
}
