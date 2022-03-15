import styles from "../styles/MobileOrderSummary.module.css";
import { FaTimes } from "react-icons/fa";
import CartCard from "./CartCard";
import React from "react";
import Link from "next/link";
import CheckoutOrderTotal from "./CheckoutOrderTotal";
import CheckoutProductCard from "./CheckoutProductCard";
import CouponCode from "./CouponCode";
import LoadingButton from "./LoadingButton";

export default function MobileOrderSummary({
  mobileOrderSummary,
  cart,
  fetchCart,
  setMobileOrderSummary,
  template,
}) {
  const handleReturn = () => {
    setMobileOrderSummary(false);
  };
  return (
    <div
      className={styles.mobileOrderSummary}
      style={{
        transform: `translateY(${mobileOrderSummary ? 0 : 100}%)`,
        transition: "0.3s",
        visibility: mobileOrderSummary ? "visible" : "hidden",
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
                  template={template}
                />
              ))
            : ""}
          {!cart || cart.item_quantity === 0 ? (
            <p>Tu carrito esta vacio.</p>
          ) : (
            ""
          )}
        </div>
        <CouponCode template={template} />
        <CheckoutOrderTotal cart={cart} template={template} />
        <div style={{ margin: "60px 0" }}>
          <LoadingButton
            template={template}
            name="Regresar"
            width="100%"
            margin="0"
            action={handleReturn}
          />
        </div>
      </div>
    </div>
  );
}
