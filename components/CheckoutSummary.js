import React from "react";
import styles from "../styles/CheckoutSummary.module.css";
import CheckoutOrderTotal from "./CheckoutOrderTotal";
import CheckoutProductCard from "./CheckoutProductCard";
import CouponCode from "./CouponCode";

export default function CheckoutSummary({ cart, fetchCart }) {
  return (
    <div className={styles.checkoutSummary}>
      <div className={styles.container}>
        <h3>Resumen de orden</h3>
        {cart
          ? cart.items.map((item) => (
              <CheckoutProductCard
                key={item.id}
                item={item}
                fetchCart={fetchCart}
                cart={cart}
              />
            ))
          : ""}
        <CouponCode />
        {!cart || cart.item_quantity === 0 ? <p>Tu carrito esta vacio.</p> : ""}
        <CheckoutOrderTotal cart={cart} />
      </div>
    </div>
  );
}
