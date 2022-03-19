import Link from "next/link";
import React from "react";
import { FaMoon, FaShoppingBag, FaSun } from "react-icons/fa";
import { HiSun, HiMoon } from "react-icons/hi";
import { useState } from "react";
import styles from "../styles/Header.module.css";
import SlideCart from "./SlideCart";
import { useEffect } from "react";
import { FiSun } from "react-icons/fi";
import DarkModeToggle from "./DarkModeToggle";
import Search from "./Search";

export default function Header({
  setSlideCart,
  slideCart,
  cart,
  isCheckout,
  template,
  setTemplate,
  darkModeTemplate,
  lightModeTemplate,
}) {
  return (
    <div className={styles.header}>
      <div className={styles.container}>
        <Link href="/">
          <div className={styles.logoContainer}>
            <h1
              style={{
                color: template.primaryColor,
                background: template.backgroundColor,
              }}
              className={styles.logo}
            >
              tectify
            </h1>
            <p className={styles.subLogo}>demoshop</p>
          </div>
        </Link>
        <div style={{ margin: "auto" }}>
          <Search />
        </div>
        <div className={styles.iconsContainer}>
          {isCheckout ? (
            " "
          ) : (
            <div
              onClick={() => setSlideCart(!slideCart)}
              className={styles.bagContainer}
            >
              <FaShoppingBag
                className={styles.icon}
                style={{ color: template.textColor }}
              />
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

          <DarkModeToggle
            template={template}
            setTemplate={setTemplate}
            darkModeTemplate={darkModeTemplate}
            lightModeTemplate={lightModeTemplate}
          />
        </div>
      </div>
    </div>
  );
}
