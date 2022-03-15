import styles from "../styles/CheckoutOrderTotal.module.css";

import React from "react";
import { useState } from "react";

export default function CheckoutOrderTotal({ cart, template }) {
  const [shippingTotal, setShippingTotal] = useState();

  console.log(cart);
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
      <div className={styles.row} style={{ color: template.textColor }}>
        <p>Total</p>
        <p>{cart ? <b>${cart.grand_total}</b> : ""}</p>
      </div>
    </div>
  );
}
