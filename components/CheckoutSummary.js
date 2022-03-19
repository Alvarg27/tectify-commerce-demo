import React from "react";
import styles from "../styles/CheckoutSummary.module.css";
import CheckoutOrderTotal from "./CheckoutOrderTotal";
import CheckoutProductCard from "./CheckoutProductCard";
import CouponCode from "./CouponCode";

export default function CheckoutSummary({ cart, fetchCart, template }) {
  return (
    <div
      className={styles.checkoutSummary}
      style={{ background: template.secondaryBackgroundColor }}
    >
      <div
        className={styles.container}
        style={{ background: template.secondaryBackgroundColor }}
      >
        <h3 style={{ color: template.textColor }}>Resumen de orden</h3>
        {cart
          ? cart.items.map((item) => (
              <CheckoutProductCard
                key={item.id}
                item={item}
                fetchCart={fetchCart}
                cart={cart}
                template={template}
              />
            ))
          : ""}
        <CouponCode template={template} fetchCart={fetchCart} />
        {!cart || cart.item_quantity === 0 ? <p>Tu carrito esta vacio.</p> : ""}
        <CheckoutOrderTotal
          cart={cart}
          template={template}
          fetchCart={fetchCart}
        />
      </div>
    </div>
  );
}
