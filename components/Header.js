import Link from "next/link";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import styles from "../styles/Header.module.css";
import SlideCart from "./SlideCart";

export default function Header({
  setSlideCart,
  slideCart,
  cart,
  isCheckout,
  template,
  setTemplate,
}) {
  const templateBlue = () => {
    setTemplate({
      primaryColor: "#0077ff",
      primaryColorHover: "#0067dd",
    });
  };
  const templatePink = () => {
    setTemplate({
      primaryColor: "pink",
      primaryColorHover: "darkpink",
    });
  };
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <h1
              style={{ color: template.primaryColor }}
              className={styles.logo}
            >
              tectify
            </h1>
            <p className={styles.subLogo}>demoshop</p>
          </div>
        </Link>
        <div
          className={styles.colorsContainer}
          style={{ margin: "auto", display: "flex" }}
        >
          <div
            onClick={() => templateBlue()}
            style={{
              margin: "auto 10px",
              width: "30px",
              height: "30px",
              background: "#0077ff",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          ></div>
          <div
            onClick={() => templatePink()}
            style={{
              margin: "auto 10px",
              width: "30px",
              height: "30px",
              background: "pink",
              borderRadius: "50%",
              cursor: "pointer",
            }}
          ></div>
        </div>
        <div className={styles.iconsContainer}>
          {isCheckout ? (
            " "
          ) : (
            <div
              onClick={() => setSlideCart(!slideCart)}
              className={styles.bagContainer}
            >
              <FaShoppingBag className={styles.bagIcon} />
              {cart && cart.item_quantity > 0 ? (
                <div
                  className={styles.quantity}
                  style={{ background: template.primaryColor }}
                >
                  <p>{cart.item_quantity}</p>
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
