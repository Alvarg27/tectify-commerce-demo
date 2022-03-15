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
}) {
  return (
    <div className={styles.checkoutPage}>
      <div className={styles.container}>
        <CheckoutSummary
          template={template}
          cart={cart}
          fetchCart={fetchCart}
        />
        <CheckoutForm
          template={template}
          cart={cart}
          fetchCart={fetchCart}
          order={order}
          setOrder={setOrder}
          mobileOrderSummary={mobileOrderSummary}
        />
      </div>
      <MobileOrderTotal
        template={template}
        cart={cart}
        setMobileOrderSummary={setMobileOrderSummary}
      />
    </div>
  );
}
