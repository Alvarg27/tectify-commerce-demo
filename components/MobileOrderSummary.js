import styles from "../styles/MobileOrderSummary.module.css";
import { FaTimes } from "react-icons/fa";
import CartCard from "./CartCard";
import React from "react";
import Link from "next/link";
import CheckoutOrderTotal from "./CheckoutOrderTotal";
import CheckoutProductCard from "./CheckoutProductCard";
import CouponCode from "./CouponCode";
import LoadingButton from "./LoadingButton";
import { useEffect } from "react";

export default function MobileOrderSummary({
  mobileOrderSummary,
  cart,
  fetchCart,
  setMobileOrderSummary,
  template,
  isBreakpoint,
}) {
  const handleReturn = () => {
    setMobileOrderSummary(false);
  };

  useEffect(() => {
    if (!isBreakpoint) {
      setMobileOrderSummary(false);
    }
  }, [isBreakpoint]);
  return (
    <div
      className={styles.mobileOrderSummary}
      style={{
        transform: `translateY(${mobileOrderSummary ? 0 : 100}%)`,
        transition: "0.3s",
        visibility: mobileOrderSummary ? "visible" : "hidden",
        background: template.secondaryBackgroundColor,
      }}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <h3 className={styles.title} style={{ color: template.textColor }}>
            Resumen de orden
          </h3>
          <FaTimes
            style={{ color: template.textColor }}
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
        <CouponCode template={template} fetchCart={fetchCart} />
        <CheckoutOrderTotal
          cart={cart}
          template={template}
          fetchCart={fetchCart}
        />
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
