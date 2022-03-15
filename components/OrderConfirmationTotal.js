import styles from "../styles/OrderConfirmationTotal.module.css";

import React from "react";

export default function OrderConfirmationTotal({ order, template }) {
  return (
    <div className={styles.orderConfirmationTotal}>
      <div className={styles.rowSub}>
        <p>Subtotal</p>
        {order ? <p>${order.sub_total}</p> : "--"}
      </div>
      <div className={styles.rowSub}>
        <p>Envío</p>
        {order ? <p>${order.shipment_total}</p> : "--"}
      </div>
      <div className="line"></div>
      <div className={styles.row} style={{ color: template.textColor }}>
        <p>Total</p>
        <p>{order ? <b>${order.grand_total}</b> : ""}</p>
      </div>
    </div>
  );
}
