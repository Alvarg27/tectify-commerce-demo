import Link from "next/link";
import React from "react";
import { FaShoppingBag } from "react-icons/fa";
import styles from "../styles/Header.module.css";
import SlideCart from "./SlideCart";

export default function Header({ setSlideCart, slideCart, cart }) {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <h1 className={styles.logo}>tectify</h1>
            <p className={styles.subLogo}>demoshop</p>
          </div>
        </Link>
        <div className={styles.iconsContainer}>
          <div
            onClick={() => setSlideCart(!slideCart)}
            className={styles.bagContainer}
          >
            <FaShoppingBag className={styles.bagIcon} />
            {cart && cart.item_quantity > 0 ? (
              <div className={styles.quantity}>
                <p>{cart.item_quantity}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
