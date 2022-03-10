import styles from "../styles/CheckoutOrderTotal.module.css";

import React from "react";

export default function CheckoutOrderTotal({ cart }) {
  return (
    <div className={styles.checkoutOrderTotal}>
      <div className={styles.rowSub}>
        <p>Subtotal</p>
        {cart ? <p>${cart.sub_total}</p> : "--"}
      </div>
      <div className={styles.rowSub}>
        <p>Envío</p>
        {cart ? <p>${cart.shipment_total}</p> : "--"}
      </div>
      <div className="line"></div>
      <div className={styles.row}>
        <p>Total</p>
        <p>{cart ? <b>${cart.grand_total}</b> : ""}</p>
      </div>
    </div>
  );
}
