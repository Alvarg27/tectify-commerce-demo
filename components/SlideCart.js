import React from "react";
import styles from "../styles/SlideCart.module.css";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import CartCard from "./CartCard";
import Link from "next/link";
import { useRouter } from "next/router";
import LoadingButton from "./LoadingButton";

export default function SlideCart({
  slideCart,
  setSlideCart,
  fetchCart,
  cart,
  template,
}) {
  const [loading, setLoading] = useState();
  const router = useRouter();

  const HandleProccedToCheckout = () => {
    setLoading(true);
    if (cart && cart.item_quantity > 0) {
      router.push("/checkout");
    } else {
      alert("¡Añade un articulo al carrito para continuar!");
    }
    setLoading(false);
  };
  return (
    <div
      className={styles.slideCart}
      style={{
        transform: `translateX(${slideCart ? 0 : 100}%)`,
        transition: "0.3s",
        visibility: slideCart ? "visible" : "hidden",
        backgroundColor: template.backgroundColor,
      }}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <h3 className={styles.title} style={{ color: template.textColor }}>
            Carrito
          </h3>
          <FaTimes
            className={styles.timesIcon}
            onClick={() => setSlideCart(false)}
            style={{ color: template.textColor }}
          />
        </div>
        <div
          className="line"
          style={{
            margin: "30px 0 0 0",
            background: template.secondaryBackground,
          }}
        ></div>
        <div className={styles.cardContainer}>
          {cart
            ? cart.items.map((item) => (
                <CartCard
                  key={item.id}
                  item={item}
                  fetchCart={fetchCart}
                  template={template}
                />
              ))
            : ""}
          {!cart || cart.item_quantity === 0 ? (
            <p style={{ color: template.textColor }}>Tu carrito esta vacio.</p>
          ) : (
            ""
          )}
        </div>
        <div className="line" style={{ margin: "0 0 0 0" }}></div>
        {cart && cart.item_quantity > 0 ? (
          <div
            className={styles.row}
            style={{ margin: "15px 0", color: template.textColor }}
          >
            <p>Total:</p>
            <p>
              <b>${cart ? cart.sub_total : 0}</b>
            </p>
          </div>
        ) : (
          ""
        )}

        {cart && cart.item_quantity > 0 ? (
          <LoadingButton
            loading={loading}
            name="Continuar al pago"
            width="100%"
            action={HandleProccedToCheckout}
            template={template}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
