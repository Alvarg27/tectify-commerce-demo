import styles from "../styles/MobileOrderTotal.module.css";

import React from "react";

export default function MobileOrderTotal({
  cart,
  setMobileOrderSummary,
  template,
}) {
  return (
    <div
      className={styles.mobileOrderTotal}
      onClick={() => setMobileOrderSummary(true)}
    >
      <div
        className={styles.container}
        style={{ background: template.primaryColor }}
      >
        <div className={styles.row}>
          <div className={styles.imageContainer}>
            {cart ? <img src={cart.items[0].product.images[0].file.url} /> : ""}
          </div>
          <div className={styles.column}>
            <h3>{cart ? cart.item_quantity : "--"} artículos</h3>
            <p onClick={() => setMobileOrderSummary(true)}>Ver resumen</p>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <p style={{ margin: "auto 10px" }}>Total</p>
          <h2 className={styles.price}>${cart ? cart.grand_total : "--"}</h2>
        </div>
      </div>
    </div>
  );
}
