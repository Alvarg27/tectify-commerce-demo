import styles from "../styles/MobileOrderSummary.module.css";
import { FaTimes } from "react-icons/fa";
import CartCard from "./CartCard";
import React from "react";
import Link from "next/link";
import CheckoutOrderTotal from "./CheckoutOrderTotal";
import CheckoutProductCard from "./CheckoutProductCard";

export default function MobileOrderSummary({
  mobileOrderSummary,
  cart,
  fetchCart,
  setMobileOrderSummary,
}) {
  return (
    <div
      className={styles.mobileOrderSummary}
      style={{
        transform: `translateY(${mobileOrderSummary ? 0 : 100}%)`,
        transition: "0.3s",
      }}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <h3 className={styles.title}>Resumen de orden</h3>
          <FaTimes
            className={styles.timesIcon}
            onClick={() => setMobileOrderSummary(false)}
          />
        </div>
        <div className="line" style={{ margin: "30px 0 0 0" }}></div>
        <div className={styles.cardContainer}>
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
          {!cart || cart.item_quantity === 0 ? (
            <p>Tu carrito esta vacio.</p>
          ) : (
            ""
          )}
        </div>
        <div className="line" style={{ margin: "0 0 0 0" }}></div>
        <CheckoutOrderTotal cart={cart} />
        <button
          onClick={() => setMobileOrderSummary(false)}
          style={{ width: "100%", margin: "30px 0 0 0" }}
          className="primaryButton"
        >
          Regresar
        </button>
      </div>
    </div>
  );
}
