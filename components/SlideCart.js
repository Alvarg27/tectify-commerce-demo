import React from "react";
import styles from "../styles/SlideCart.module.css";
import { FaTimes } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";
import CartCard from "./CartCard";
import Link from "next/link";
import { useRouter } from "next/router";

export default function SlideCart({
  slideCart,
  setSlideCart,
  fetchCart,
  cart,
}) {
  const router = useRouter();

  const HandleProccedToCheckout = () => {
    if (cart && cart.item_quantity > 0) {
      router.push("/checkout");
    } else {
      alert("¡Añade un articulo al carrito para continuar!");
    }
  };
  return (
    <div
      className={styles.slideCart}
      style={{
        transform: `translateX(${slideCart ? 0 : 100}%)`,
        transition: "0.3s",
      }}
    >
      <div className={styles.container}>
        <div className={styles.row}>
          <h3 className={styles.title}>Carrito</h3>
          <FaTimes
            className={styles.timesIcon}
            onClick={() => setSlideCart(false)}
          />
        </div>
        <div className="line" style={{ margin: "30px 0 0 0" }}></div>
        <div className={styles.cardContainer}>
          {cart
            ? cart.items.map((item) => (
                <CartCard key={item.id} item={item} fetchCart={fetchCart} />
              ))
            : ""}
          {!cart || cart.item_quantity === 0 ? (
            <p>Tu carrito esta vacio.</p>
          ) : (
            ""
          )}
        </div>
        <div className="line" style={{ margin: "0 0 0 0" }}></div>
        <div className={styles.row} style={{ margin: "15px 0" }}>
          <p>Total:</p>
          <p>
            <b>${cart ? cart.sub_total : 0}</b>
          </p>
        </div>

        {cart ? (
          <button
            onClick={() => HandleProccedToCheckout()}
            style={{ width: " 100%" }}
            className="primaryButton"
          >
            Continuar al pago
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
